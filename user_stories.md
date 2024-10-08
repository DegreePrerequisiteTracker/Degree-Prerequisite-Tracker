User Stories and Exceptions
===========================

## User Stories

- As a student, I want to create a thorough degree plan so that I can complete my bachelor's in 4 years.
- As a student, I want to see which classes have the most prerequisites, so I don’t run into conflicts when enrolling.
- As a student, I want to see how flexible the order in which I take courses, is so I can minimize my potential workload each term.
- As a student, I want to have the ability to interact with my degree plan, so that I can see how much progress I have made/how much I have left.
- As a student, I want to be able to view prerequisites for a specific course, and for which other courses the specified course is a prerequisite for. This is so that I can assess how a specific course fits into my plan (for example, if I should take this course next quarter).
- As a student, I want to be able to see corequisites for courses so that I know which courses I will need to take at the same time.
- As a student, I want to be able to see what category a course belongs to (major specific, GE area, etc.) so that I can balance my schedule with a variety of courses.
- As a student, I want to be able to see how many credits a course is worth so that I can effectively plan my course load.
- As a student, I have taken multiple different classes that complete the same prerequisite to a course and wish to see what prerequisites I have completed.
- As a student, I want to be able to adjust my plan for different years of graduating and masters programs.
- As a student, I am looking to transfer from a college with no pre-defined articulation agreements with Cal Poly.
- As a student I want to take a course that exists across different categories (eg, Music and Dance)

## Potential Errors

- If a student only enters their email and no password, the password box will be highlighted red with the text “Please enter a password” below.
- If a student enters an incorrect email or password, both boxes will be highlighted and text saying “wrong email or password, try again or sign up”
- If a student attempts to check off a course before taking a necessary prerequisite, they will not be able to do so, and a popup stating “Cannot Mark (course) complete until (prerequisite(s)) are complete”.
- If a student attempts to place a course only offered in summer in a spring slot, they will not be able to move it and a popup stating “This course is only offered (terms offered)”
- If a student attempts to search for a course that does not exist, it will return a message telling them that no courses could be found with that name
- If a student tries to request course/degree information, and fails to connect to the backend server, it should show an error popup saying “an unexpected error occurred, please try again later”
- If a student checks the information on a course, and notices incorrect information, they have the option to report the information as incorrect.
- If the user’s session expires, they will be prompted to sign in again.
- If a student has multiple classes covering the same requisite, it should display both classes as if they were separate prerequisites, instead of trying to treat them as the same.
- If a student tries to adjust their year of graduation, the chart will extend or shrink to adjust. If trying to adjust below a minimum threshold then they will be given a popup explaining said threshold.
- If a student’s college does not exist in the database, or their specific classes do not, the website will show a “no results found” page, as well as prompt them to enter their own data for their classes should they know what they will articulate to.
- If a student can take different identical sections of the same course, it will still treat them as if they were different, and allow them to pick between them. Should one of them align with their chosen major or minor, it will be highlighted.
