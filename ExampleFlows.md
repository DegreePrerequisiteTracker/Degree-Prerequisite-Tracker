# Example Flows

### Getting course information

User wants to browse the course catalog, and get information for a specific course.

1. `GET /departments` gets a list of departments
2. `GET /department/{course_prefix}/course` select course prefix from the list of departments, gets a list of all courses in that department
3. `GET /course/{course_id}/` select a course id from the list of courses, and get information about a specific course

### Selecting program
User wants to explore programs then select a different program for their previously created plan.

1. `GET /department/{department_id}/program` : gets a list of programs available in a department
2. `GET /program/{program_id}` : gets the details for a specific program
3. `PUT /plan/{plan_id}` : updates previous plan with new program information
4. `GET /plan/{plan_id}/courses` : gets a list of all courses required for this plan