### Course is marked as completed while plan progress is calculating

Users can request their completion progress for a specific plan.

This involves getting the user's completed courses, getting the requested plan info, getting the program from the requested plan, getting all the requirements from the program, then returning the requirements as complete or incomplete based on if they are in the user's completed courses or not.

A concurrency issue can occur if a user adds a course to their completed courses after their completed courses get requested, but before the requirements are marked as completed or incomplete. The returned completion progress will show the courses that the uesr marked completed as being incomplete.

This is an example of a phantom read, because the data has been modified between reads, resulting in an inconsistency.

We could solve this by acquiring a row level lock on the user's completed courses when they are first read. This would remove the possibility for an update in the middle of this calculation. This is approriate because course plan completion is a quick calculation, and it only locks the completion for the requesting user.

### Course is marked as incomplete while priority is calculating

Users can request a list of courses by priority level. A higher course priorty means it is a prerequisite for a lot of courses, so we recommend you take it sooner rather than later.

The calculation of this involves looking up the user's completed courses, looking prerequsite data for the courses they've completed, calculating the total prerequisites for each course, then ordering them by which have the most prerequisites.

If between the requesting of the user's completed courses, and the reqesuting of the course prerequisite data, the user marks one of their completed courses as incomplete, it will result in a concurrency issue. The returned priority list will not consider the courses they have marked as incomplete.

This is an example of a phantom read, because the data has been modified between reads, resulting in an inconsistency.

We could solve this by acquiring a row level lock on the user's completed courses when course priority is calculating. This would make it so that when the course priority is calculating, a user could not change their completed courses. This is appropriate because calculating priority should not take a lot of time, and it only locks the user which is calculating the priorty.

### Course is removed from database after querying all courses in subject

Users browse the course catalog by subject. Users can request all courses in a subject (say CSC) and they will receive the course name, as well as its ID in our database.

If they see a course that looks interesting, they can request the info for that course specifically, by ID.

If between these two steps, a course gets removed from the catalog (say, by a database admin), the inital subject query will return an ID for the course, but when requested individually will return a 404 error.

This is an example of a phantom read, since the course is read twice, but is modified by a different transaction in between.

One potential way we could resolve this is by adding a flag on course records in the database, which would make them not show up when listing course subjects. However, even with this flag, they could still be requested individually. That way we could enable this flag, wait for some time, then finally delete the course.
