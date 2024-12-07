# Performance Writeup

## Overview

For our million rows we decided to split up our million rows between
users, plans, and completed courses. This is because this is the
only data that will change, the course catalog and program info
will remain static. We assigned (roughly) 20% of the rows to users,
50% to completed courses, and 30% to plans.

## Division of rows

Users: 203320
Plans: 305025
Completed Courses: 505127
Total: 1013472

## Endpoint performance

GET /users/history: 12.8ms
PUT /users/history: 12.0 ms
DELETE /users/history/{courseId}: 12.0 ms

GET /plans: 30.3ms
POST /plans: 14.7 ms
GET /plans/{planId}: 13.5ms
PUT /plans/{planId}: 21.5 ms
DELETE /plans/{planId}: 14.3 ms
GET /plans/{planId}/courses: 27.0 ms
GET /plans/{planId}/progress: 14.2 ms

GET /departments: 7.7ms
GET /departments/{departmentId}/programs: 8.1 ms

GET /programs/{programId}/concentrations: 7.9 ms

GET /subjects: 8.1 ms
GET /subjects/{prefix}/courses: 8.3 ms

GET /courses/: 12.3 ms

## Slowest endpoints

1. GET /plans: 30.3ms
2. GET /plans/{planId}/courses: 27.0 ms
3. PUT /plans/{planId}: 21.5 ms

## Query analysis

### GET /plans

```sql
SELECT user_plans.id, graduation_date, programs.name AS program_name, concentrations.name AS concentration_name
FROM user_plans
JOIN programs ON programs.id = program_id
LEFT JOIN concentrations ON concentrations.id = concentration_id
WHERE user_id = ${user.id}
```

| QUERY PLAN                                                              |
| ----------------------------------------------------------------------- |
| Gather (cost=1000.00..5491.95 rows=2 width=51)                          |
| Workers Planned: 1                                                      |
| -> Nested Loop Left Join (cost=0.00..4491.75 rows=1 width=51)           |
| Join Filter: (concentrations.id = user_plans.concentration_id)          |
| -> Nested Loop (cost=0.00..4488.25 rows=1 width=31)                     |
| Join Filter: (user_plans.program_id = programs.id)                      |
| -> Parallel Seq Scan on user_plans (cost=0.00..4485.76 rows=1 width=16) |
| Filter: (user_id = 'aafddc6b-1abe-4508-a7ce-f3502c7feeb1'::uuid)        |
| -> Seq Scan on programs (cost=0.00..1.66 rows=66 width=23)              |
| -> Seq Scan on concentrations (cost=0.00..2.11 rows=111 width=28)       |

Performance could be improved by adding indices on `user_plans.concentration_id` and `user_plans.program_id`

```sql
CREATE INDEX concentration_id_idx ON user_plans (concentration_id);
CREATE INDEX program_id_idx ON user_plans (program_id);
```

This did not noticably improve performance in any way, and the query plan remained the same. The seq scan occuring on `user_id` provided another potential optimization.

```sql
CREATE INDEX plans_user_id_idx ON user_plans (user_id);
```

Testing the endpoint again, the performance improved to `12.6 ms`, which is a massive improvement.

| QUERY PLAN                                                                 |
| -------------------------------------------------------------------------- |
| Hash Right Join (cost=14.34..16.88 rows=2 width=51)                        |
| Hash Cond: (concentrations.id = user_plans.concentration_id)               |
| -> Seq Scan on concentrations (cost=0.00..2.11 rows=111 width=28)          |
| -> Hash (cost=14.32..14.32 rows=2 width=31)                                |
| -> Hash Join (cost=12.31..14.32 rows=2 width=31)                           |
| Hash Cond: (programs.id = user_plans.program_id)                           |
| -> Seq Scan on programs (cost=0.00..1.66 rows=66 width=23)                 |
| -> Hash (cost=12.28..12.28 rows=2 width=16)                                |
| -> Bitmap Heap Scan on user_plans (cost=4.44..12.28 rows=2 width=16)       |
| Recheck Cond: (user_id = '4f3b05bb-4189-4c39-be63-21ffb320bc3f'::uuid)     |
| -> Bitmap Index Scan on plans_user_id_idx (cost=0.00..4.44 rows=2 width=0) |
| Index Cond: (user_id = '4f3b05bb-4189-4c39-be63-21ffb320bc3f'::uuid)       |

### GET /plans/{planId}/courses

```sql
WITH RECURSIVE plan_course_sets AS (
  -- Get all courses directly required by the program
  SELECT DISTINCT program_requirement_courses.course_set_number FROM user_plans
  JOIN program_requirements ON user_plans.program_id = program_requirements.program_id
  JOIN program_requirement_sets ON program_requirements.requirement_group = program_requirement_sets.requirement_group
  JOIN program_requirement_courses ON program_requirement_sets.set_number = program_requirement_courses.set_number
  WHERE user_plans.id = ${req.params.planId} AND user_plans.user_id = ${user.id}
  UNION
  -- Recursively get all of their prerequisites
  SELECT DISTINCT course_requisite_sets.course_set_number FROM course_requisites
  JOIN plan_course_sets ON course_requisites.course_set_number = plan_course_sets.course_set_number
  JOIN course_requisite_sets ON course_requisites.set_number = course_requisite_sets.set_number
),
primary_courses AS (
  -- Remove crosslisted courses
  SELECT DISTINCT ON (set_number) id, prefix, number, name, set_number FROM courses
),
prereq_groups AS (
  -- Create prerequisite groups for all plan courses
  SELECT primary_courses.id, primary_courses.prefix, primary_courses.number, primary_courses.name, course_requisite_sets.set_number, STRING_AGG(prereqs.id::text, ',') AS prereq_group FROM plan_course_sets
  JOIN primary_courses ON plan_course_sets.course_set_number = primary_courses.set_number
  JOIN course_requisites ON plan_course_sets.course_set_number = course_requisites.course_set_number
  JOIN course_requisite_sets ON course_requisites.set_number = course_requisite_sets.set_number
  JOIN primary_courses AS prereqs ON course_requisite_sets.course_set_number = prereqs.set_number
  GROUP BY primary_courses.id, primary_courses.prefix, primary_courses.number, primary_courses.name, course_requisite_sets.set_number
)
-- Aggregate prerequisite groups into arrays
SELECT id, prefix, number, name, ARRAY_AGG(prereq_group) AS prerequisites FROM prereq_groups
GROUP BY id, name, prefix, number
ORDER BY prefix, number
```

| QUERY PLAN                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------- |
| Sort (cost=241382.96..241527.74 rows=57914 width=104)                                                                                 |
| Sort Key: primary_courses.prefix, primary_courses.number                                                                              |
| CTE plan_course_sets                                                                                                                  |
| -> Recursive Union (cost=126.98..3556.94 rows=5545 width=4)                                                                           |
| -> Unique (cost=126.98..127.16 rows=35 width=4)                                                                                       |
| -> Sort (cost=126.98..127.07 rows=35 width=4)                                                                                         |
| Sort Key: program_requirement_courses.course_set_number                                                                               |
| -> Hash Join (cost=80.34..126.08 rows=35 width=4)                                                                                     |
| Hash Cond: (program_requirement_courses.set_number = program_requirement_sets.set_number)                                             |
| -> Seq Scan on program_requirement_courses (cost=0.00..36.56 rows=2356 width=8)                                                       |
| -> Hash (cost=79.88..79.88 rows=37 width=4)                                                                                           |
| -> Hash Join (cost=34.46..79.88 rows=37 width=4)                                                                                      |
| Hash Cond: (program_requirement_sets.requirement_group = program_requirements.requirement_group)                                      |
| -> Seq Scan on program_requirement_sets (cost=0.00..35.76 rows=2476 width=8)                                                          |
| -> Hash (cost=34.20..34.20 rows=21 width=4)                                                                                           |
| -> Hash Join (cost=8.45..34.20 rows=21 width=4)                                                                                       |
| Hash Cond: (program_requirements.program_id = user_plans.program_id)                                                                  |
| -> Seq Scan on program_requirements (cost=0.00..21.87 rows=1387 width=8)                                                              |
| -> Hash (cost=8.44..8.44 rows=1 width=4)                                                                                              |
| -> Index Scan using user_plans_pkey on user_plans (cost=0.42..8.44 rows=1 width=4)                                                    |
| Index Cond: (id = 306860)                                                                                                             |
| Filter: (user_id = '4f3b05bb-4189-4c39-be63-21ffb320bc3f'::uuid)                                                                      |
| -> HashAggregate (cost=326.38..331.89 rows=551 width=4)                                                                               |
| Group Key: course_requisite_sets_1.course_set_number                                                                                  |
| -> Hash Join (cost=208.11..325.00 rows=551 width=4)                                                                                   |
| Hash Cond: (course_requisite_sets_1.set_number = course_requisites_1.set_number)                                                      |
| -> Seq Scan on course_requisite_sets course_requisite_sets_1 (cost=0.00..89.73 rows=5773 width=8)                                     |
| -> Hash (cost=200.86..200.86 rows=580 width=4)                                                                                        |
| -> Hash Join (cost=169.69..200.86 rows=580 width=4)                                                                                   |
| Hash Cond: (plan_course_sets_1.course_set_number = course_requisites_1.course_set_number)                                             |
| -> WorkTable Scan on plan_course_sets plan_course_sets_1 (cost=0.00..7.00 rows=350 width=4)                                           |
| -> Hash (cost=93.75..93.75 rows=6075 width=8)                                                                                         |
| -> Seq Scan on course_requisites course_requisites_1 (cost=0.00..93.75 rows=6075 width=8)                                             |
| CTE primary_courses                                                                                                                   |
| -> Unique (cost=517.19..538.60 rows=4036 width=47)                                                                                    |
| -> Sort (cost=517.19..527.90 rows=4283 width=47)                                                                                      |
| Sort Key: courses.set_number                                                                                                          |
| -> Seq Scan on courses (cost=0.00..258.83 rows=4283 width=47)                                                                         |
| -> HashAggregate (cost=210716.39..229538.44 rows=57914 width=104)                                                                     |
| Group Key: primary_courses.prefix, primary_courses.number, primary_courses.id, primary_courses.name                                   |
| Planned Partitions: 128                                                                                                               |
| -> GroupAggregate (cost=93440.54..113710.44 rows=579140 width=108)                                                                    |
| Group Key: primary_courses.id, primary_courses.prefix, primary_courses.number, primary_courses.name, course_requisite_sets.set_number |
| -> Sort (cost=93440.54..94888.39 rows=579140 width=80)                                                                                |
| Sort Key: primary_courses.id, primary_courses.prefix, primary_courses.number, primary_courses.name, course_requisite_sets.set_number  |
| -> Merge Join (cost=3197.69..12271.05 rows=579140 width=80)                                                                           |
| Merge Cond: (primary_courses.set_number = plan_course_sets.course_set_number)                                                         |
| -> Merge Join (cost=2741.97..3075.49 rows=20890 width=88)                                                                             |
| Merge Cond: (primary_courses.set_number = course_requisites.course_set_number)                                                        |
| -> Sort (cost=322.45..332.54 rows=4036 width=76)                                                                                      |
| Sort Key: primary_courses.set_number                                                                                                  |
| -> CTE Scan on primary_courses (cost=0.00..80.72 rows=4036 width=76)                                                                  |
| -> Sort (cost=2419.52..2466.96 rows=18974 width=12)                                                                                   |
| Sort Key: course_requisites.course_set_number                                                                                         |
| -> Hash Join (cost=346.75..1071.26 rows=18974 width=12)                                                                               |
| Hash Cond: (prereqs.set_number = course_requisite_sets.course_set_number)                                                             |
| -> CTE Scan on primary_courses prereqs (cost=0.00..80.72 rows=4036 width=8)                                                           |
| -> Hash (cost=274.58..274.58 rows=5773 width=12)                                                                                      |
| -> Hash Join (cost=169.69..274.58 rows=5773 width=12)                                                                                 |
| Hash Cond: (course_requisite_sets.set_number = course_requisites.set_number)                                                          |
| -> Seq Scan on course_requisite_sets (cost=0.00..89.73 rows=5773 width=8)                                                             |
| -> Hash (cost=93.75..93.75 rows=6075 width=8)                                                                                         |
| -> Seq Scan on course_requisites (cost=0.00..93.75 rows=6075 width=8)                                                                 |
| -> Sort (cost=455.72..469.58 rows=5545 width=4)                                                                                       |
| Sort Key: plan_course_sets.course_set_number                                                                                          |
| -> CTE Scan on plan_course_sets (cost=0.00..110.90 rows=5545 width=4)                                                                 |

Looking at this, there are a number of seq scans that could be improved. Starting with program rqeuirements

```sql
CREATE INDEX set_number_idx ON program_requirement_courses (set_number);
CREATE INDEX requirement_group_idx ON program_requirement_sets (requirement_group);
CREATE INDEX requirements_program_id_idx ON program_requirements (program_id);
```

After testing this, the performance of the endpoint improved to `23.8 ms`. This could be further improved by adding indices on course requisites.

```sql
CREATE INDEX courses_set_number_idx ON course_requisite_sets (set_number);
CREATE INDEX course_requisite_set_number_idx ON course_requisite_sets (course_set_number);
CREATE INDEX course_set_number_idx ON course_requisites (course_set_number);
```

Testing once more, the performance seemed to improve to `22.0 ms`, but it's hard to say for certain if this is due to the indices, or because of measuring error. Regardless, it is much better than the original performance.

| QUERY PLAN                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------- |
| Sort (cost=241297.78..241442.56 rows=57914 width=104)                                                                                 |
| Sort Key: primary_courses.prefix, primary_courses.number                                                                              |
| CTE plan_course_sets                                                                                                                  |
| -> Recursive Union (cost=41.63..3471.77 rows=5545 width=4)                                                                            |
| -> HashAggregate (cost=41.63..41.98 rows=35 width=4)                                                                                  |
| Group Key: program_requirement_courses.course_set_number                                                                              |
| -> Nested Loop (cost=1.26..41.54 rows=35 width=4)                                                                                     |
| -> Nested Loop (cost=0.98..28.85 rows=37 width=4)                                                                                     |
| -> Nested Loop (cost=0.70..20.66 rows=21 width=4)                                                                                     |
| -> Index Scan using user_plans_pkey on user_plans (cost=0.42..8.44 rows=1 width=4)                                                    |
| Index Cond: (id = 306860)                                                                                                             |
| Filter: (user_id = '4f3b05bb-4189-4c39-be63-21ffb320bc3f'::uuid)                                                                      |
| -> Index Scan using requirements_program_id_idx on program_requirements (cost=0.28..11.94 rows=28 width=8)                            |
| Index Cond: (program_id = user_plans.program_id)                                                                                      |
| -> Index Scan using requirement_group_idx on program_requirement_sets (cost=0.28..0.37 rows=2 width=8)                                |
| Index Cond: (requirement_group = program_requirements.requirement_group)                                                              |
| -> Index Scan using set_number_idx on program_requirement_courses (cost=0.28..0.33 rows=1 width=8)                                    |
| Index Cond: (set_number = program_requirement_sets.set_number)                                                                        |
| -> HashAggregate (cost=326.38..331.89 rows=551 width=4)                                                                               |
| Group Key: course_requisite_sets_1.course_set_number                                                                                  |
| -> Hash Join (cost=208.11..325.00 rows=551 width=4)                                                                                   |
| Hash Cond: (course_requisite_sets_1.set_number = course_requisites_1.set_number)                                                      |
| -> Seq Scan on course_requisite_sets course_requisite_sets_1 (cost=0.00..89.73 rows=5773 width=8)                                     |
| -> Hash (cost=200.86..200.86 rows=580 width=4)                                                                                        |
| -> Hash Join (cost=169.69..200.86 rows=580 width=4)                                                                                   |
| Hash Cond: (plan_course_sets_1.course_set_number = course_requisites_1.course_set_number)                                             |
| -> WorkTable Scan on plan_course_sets plan_course_sets_1 (cost=0.00..7.00 rows=350 width=4)                                           |
| -> Hash (cost=93.75..93.75 rows=6075 width=8)                                                                                         |
| -> Seq Scan on course_requisites course_requisites_1 (cost=0.00..93.75 rows=6075 width=8)                                             |
| CTE primary_courses                                                                                                                   |
| -> Unique (cost=517.19..538.60 rows=4036 width=47)                                                                                    |
| -> Sort (cost=517.19..527.90 rows=4283 width=47)                                                                                      |
| Sort Key: courses.set_number                                                                                                          |
| -> Seq Scan on courses (cost=0.00..258.83 rows=4283 width=47)                                                                         |
| -> HashAggregate (cost=210716.39..229538.44 rows=57914 width=104)                                                                     |
| Group Key: primary_courses.prefix, primary_courses.number, primary_courses.id, primary_courses.name                                   |
| Planned Partitions: 128                                                                                                               |
| -> GroupAggregate (cost=93440.54..113710.44 rows=579140 width=108)                                                                    |
| Group Key: primary_courses.id, primary_courses.prefix, primary_courses.number, primary_courses.name, course_requisite_sets.set_number |
| -> Sort (cost=93440.54..94888.39 rows=579140 width=80)                                                                                |
| Sort Key: primary_courses.id, primary_courses.prefix, primary_courses.number, primary_courses.name, course_requisite_sets.set_number  |
| -> Merge Join (cost=3197.69..12271.05 rows=579140 width=80)                                                                           |
| Merge Cond: (primary_courses.set_number = plan_course_sets.course_set_number)                                                         |
| -> Merge Join (cost=2741.97..3075.49 rows=20890 width=88)                                                                             |
| Merge Cond: (primary_courses.set_number = course_requisites.course_set_number)                                                        |
| -> Sort (cost=322.45..332.54 rows=4036 width=76)                                                                                      |
| Sort Key: primary_courses.set_number                                                                                                  |
| -> CTE Scan on primary_courses (cost=0.00..80.72 rows=4036 width=76)                                                                  |
| -> Sort (cost=2419.52..2466.96 rows=18974 width=12)                                                                                   |
| Sort Key: course_requisites.course_set_number                                                                                         |
| -> Hash Join (cost=346.75..1071.26 rows=18974 width=12)                                                                               |
| Hash Cond: (prereqs.set_number = course_requisite_sets.course_set_number)                                                             |
| -> CTE Scan on primary_courses prereqs (cost=0.00..80.72 rows=4036 width=8)                                                           |
| -> Hash (cost=274.58..274.58 rows=5773 width=12)                                                                                      |
| -> Hash Join (cost=169.69..274.58 rows=5773 width=12)                                                                                 |
| Hash Cond: (course_requisite_sets.set_number = course_requisites.set_number)                                                          |
| -> Seq Scan on course_requisite_sets (cost=0.00..89.73 rows=5773 width=8)                                                             |
| -> Hash (cost=93.75..93.75 rows=6075 width=8)                                                                                         |
| -> Seq Scan on course_requisites (cost=0.00..93.75 rows=6075 width=8)                                                                 |
| -> Sort (cost=455.72..469.58 rows=5545 width=4)                                                                                       |
| Sort Key: plan_course_sets.course_set_number                                                                                          |
| -> CTE Scan on plan_course_sets (cost=0.00..110.90 rows=5545 width=4)                                                                 |

### PUT /plans/{planId}

```sql
    UPDATE user_plans SET
    graduation_date = COALESCE(${planBody.graduationDate ?? null}, graduation_date),
    concentration_id = COALESCE(${planBody.concentrationId ?? null}, concentration_id),
    program_id = COALESCE(${planBody.programId ?? null}, program_id)
    WHERE user_id = ${user.id} AND id = ${planId}
    RETURNING id
```

| QUERY PLAN                                                                          |
| ----------------------------------------------------------------------------------- |
| Update on user_plans (cost=0.42..8.44 rows=1 width=18)                              |
| -> Index Scan using user_plans_pkey on user_plans (cost=0.42..8.44 rows=1 width=18) |
| Index Cond: (id = 306818)                                                           |
| Filter: (user_id = '4f3b05bb-4189-4c39-be63-21ffb320bc3f'::uuid)                    |

Running this query again, it now takes `13.5 ms` because of the indices added for the previous endpoint. No improvements needed.
