# Example Flows

### Getting course information

User wants to browse the course catalog, and get information for a specific course.

1. `GET /subjects` gets a list of subjects
2. `GET /subjects/{subjectsId}/course` select course prefix from the list of subjects, gets a list of all courses in that subject
3. `GET /course/{course_id}/` select a course id from the list of courses, and get information about a specific course

### Using a plan

User wants to create a plan, and mark courses as complete as they progress in their plan.

1. `POST /plan/` create a new plan, EX:

```json
{
  "program_id": 51,
  "program_type": "BS",
  "concentration_id": 3
}
```

2. `GET /plan/{plan_id}/courses` view the courses in the newly created plan
3. `PUT /user/history/{course_id}` mark a course as complete (happens at the user level, so it applies to all plans)
4. `DELETE /user/history/{course_id}` optionally, mark a course as incomplete if it was mistakenly set as completed
5. `DELETE /plan/{plan_id}/` delete the plan when it is no longer needed

### Selecting program

User wants to explore programs then select a different program for their previously created plan.

1. `GET /department/` : gets a list of departments
1. `GET /department/{department_id}/programs` : gets a list of programs available in a department
1. `GET /program/{program_id}` : gets the details for a specific program
1. `PUT /plan/{plan_id}` : updates previous plan with new program information
1. `GET /plan/{plan_id}/courses` : gets a list of all courses required for this plan
