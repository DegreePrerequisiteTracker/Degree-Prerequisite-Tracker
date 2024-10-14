# Example Flows

### Getting course information

User wants to browse the course catalog, and get information for a specific course.

1. `GET /departments` gets a list of departments
2. `GET /department/{course_prefix}/course` select course prefix from the list of departments, gets a list of all courses in that department
3. `GET /course/{course_id}/` select a course id from the list of courses, and get information about a specific course
