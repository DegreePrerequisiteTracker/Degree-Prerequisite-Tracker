# API Spec for Degree Prerequisite Tracker

## Subject

#### `GET /subject/`

Returns a list of all subjects

#### Response:

```json
[
  {
    "prefix": "CSC",
    "name": "Computer Science"
  },
  {
    "prefix": "MATH",
    "name": "Mathematics"
  }
  // ...
]
```

#### `GET /subject/{prefix}`

Returns data about a specific subject.

#### Response:

```json
{
  "prefix": "MATH",
  "name": "Mathematics"
}
```

#### `GET /subject/{prefix}/courses`

Returns a list of all courses in a given subject.

#### Response:

```json
[
  {
    "id": 1521,
    "name": "Fundamentals of Computer Science",
    "course_number": 101
  },
  {
    "id": 1634,
    "name": "Data Structures",
    "course_number": 202
  }
  // ...
]
```

## Courses

#### `GET /course/{id}`

Returns data for a course given the course id. Course ids are internal unique indentifiers for a specific course.

#### Response:

```json
{
  "id": 1521,
  "name": "Fundamentals of Computer Science",
  "course_number": 101,
  "units": 4,
  "crosslisted": 2352,
  "prerequisites": [
    {
      "needed": 1,
      "courses:": [734, 1673]
    },
    2983
  ],
  "offered": ["fall", "winter", "spring"],
  "description": "COURSE DESCRIPTION"
}
```

Prerequisites are formatted as follows:

- `"prerequisites": [3252, 2363, 847]` Means in order to take the course, you must have completed the courses with ids `3252`, `2363`, AND `847`.

- `"prerequisites": [
  {
    "needed": 1,
    "courses:": [734, 1673]
  },
  2983
]` Means in order to take the course, you must have completed course id `2983` AND have completed `734` OR `1673`.

## Majors
