### auth.ts

- Validate values if they do not exist
  - If a successful response comes back, userId will always exist
  - Made email nullable in [#110](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/110)
- Check the response to see if call was successful (I believe it’s .ok)
  - This is already being handled. In auth.ts we check to see if "code" is sent back from supabase (an error occured), and send thast error back.

### courses.ts

- Handle the await one case if no rows return
  - We fixed this error in [#71](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/71)
- Validate courseId
  - We fixed this error in [#71](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/71)
- Uses in string concatenation, so sanitize the values
  - [Postgres JS uses tagged template literals for parameter binding, this is not string interpolation](https://github.com/porsager/postgres?tab=readme-ov-file#queries)

### departments.ts

- Check for more error cases (ex. Department doesnt exist)
  - We implemented catching more errors in [#100](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/100)
- Uses in string concatenation, so sanitize the values
  - [Postgres JS uses tagged template literals for parameter binding, this is not string interpolation](https://github.com/porsager/postgres?tab=readme-ov-file#queries)
- Report back HTTPS status codes
  - 400 added in [#100](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/100)
  - 404 added in [#100](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/100)

### plans.ts

- Check for more error cases (ex. Plan doesnt exist)
  - 404 added to `/plans/:planId` in [#104](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/104)
- Uses in string concatenation, so sanitize the values
  - [Postgres JS uses tagged template literals for parameter binding, this is not string interpolation](https://github.com/porsager/postgres?tab=readme-ov-file#queries)
- /plans/:planId/courses
  - Implemented in [#104](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/104)

### programs.ts

- Validate program id and create error cases accordingly
  - Done in [#92](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/92/commits/6eb1aad8e53a3cae8ef22733264b396a90952c64)
- Uses in string concatenation, so sanitize the values
  - [Postgres JS uses tagged template literals for parameter binding, this is not string interpolation](https://github.com/porsager/postgres?tab=readme-ov-file#queries)
- Everything just return 200 OK, if not report other HTTPS codes
  - 400 added in [#92](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/92/commits/6eb1aad8e53a3cae8ef22733264b396a90952c64)
  - 404 added in [#108](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/issues/108)

### subjects.ts

- What if database connection fails? Error out accordingly
  - If database connections fail, an error will be thrown, which will get caught by express's error handling middleware, and (correctly) return as 500
- Uses in string concatenation, so sanitize the values
  - [Postgres JS uses tagged template literals for parameter binding, this is not string interpolation](https://github.com/porsager/postgres?tab=readme-ov-file#queries)
- Validate inputs and report HTTPS codes
  - 404 added to `/subject/:prefix/courses` in [#98](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/98)

### users.ts

- Validate and report HTTPS codes
  - On success, we return a 200 OK
  - 404 response was added to `/users/history` in [#107](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/107)
- /users
  - Endpoint removed in [#80](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/80)
- /users/history
  - Added in [#99](https://github.com/DegreePrerequisiteTracker/Degree-Prerequisite-Tracker/pull/99)
