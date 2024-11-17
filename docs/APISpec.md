# API Spec for Degree Prerequisite Tracker

## Subjects

#### `GET /subjects/`

Returns a list of all subjects.

#### Response:

```ts
[
  {
    "name": string, /* Subject name e.g. "Computer Science" */
    "prefix": string /* Subject abbreviation (course prefix) e.g. "CSC" */
  }
  // ...
]
```

#### `GET /subjects/{prefix}/`

Returns data about a specific subject.

#### Response:

```ts
{
  "name": string, /* Subject name e.g. "Computer Science" */
  "prefix": string, /* Subject abbreviation (course prefix) e.g. "CSC" */
}
```

#### `GET /subjects/{prefix}/course`

Returns a list of all courses in a given subject.

#### Response:

```ts
[
  {
    "course_id": number,
    "course_name": string, /* Course name from catalog e.g. "Fundamentals of Computer Science" */
    "course_number": number /* Course number e.g. 101 */
  }
  // ...
]
```

## Courses

#### `GET /course/{course_id}/`

Returns data for a specific course.

#### Response:

```ts
{
  "name": string, /* Course name from catalog e.g. "Fundamentals of Computer Science" */
  "course_number": number, /* Course number e.g. 101 */
  "units": number, /* Amount of units for course */
  "crosslisted": number, /* Id of course that is crosslisted, optional field */
  "prerequisites": [
    {
      "needed": number, /* How many of the following courses are needed */
      "courses:": number[] /* Instances where you are able to take one course OR another course */
    }
  ],
  "offered": ["F", "W", "SP", "SU"], /* Terms when course is offered, can be multiple. If null, TBD */
  "description": string /* Description taken from catalog */
}
```

Prerequisites are formatted as follows:

- ```ts
  "prerequisites": [
    {
      "needed": 1,
      "courses:": [3252]
    },
    {
      "needed": 1,
      "courses": [2363]
    },
    {
      "needed": 1,
      "courses": [847]
    }
  ]
  ```

  Means in order to take the course, you must have completed the courses with ids `3252`, `2363`, AND `847`.

- ```ts
  "prerequisites": [
    {
      "needed": 1,
      "courses:": [734, 1673]
    },
    {
      "needed": 1,
      "courses": [2983]
    }
  ]
  ```

  Means in order to take the course, you must have completed course id `2983` AND have completed `734` OR `1673`.

## Programs

#### `GET /program/`

Returns a list of all programs.

#### Response:

```ts
[
  {
    "program_id": number,
    "name": string, /* Program name e.g. "Computer Science" */
    "program_types": string[] /* Program types offered e.g. ["BS", "MS", "Minor"] */
  }
  // ...
]
```

#### `GET /program/{program_id}`

Returns data about a specific program.

#### Response:

```ts
{
  "program_id": number,
  "name": string, /* Program name e.g. "Computer Science" */
  "program_types": string[] /* Program types offered e.g. ["BS", "MS", "Minor"] */
}
```

#### `GET /program/{program_id}/{program_type}/requirements`

Returns data about the requirements of a specific program type.

#### Response:

```ts
{
  "name": string, /* Program name e.g. "Computer Science" */
  "required_courses": number[] /* List of required course ids */
}
```

#### `GET /program/{program_id}/BS/concentration/`

Returns a list of all concentrations in program.

#### Response:

```ts
[
  {
    "concentration_id": number,
    "name": string /* Concentration name e.g. "Artificial Intelligence and Machine Learning" */
  }
  // ...
] /* If no concentrations exist, will be an empty array */
```

#### `GET /program/{program_id}/BS/concentration/{concentration_id}/`

Returns data about a specific concentration in a program.

#### Response:

```ts
{
  "name": string, /* Title of concentration from catalog e.g. "Artificial Intelligence and Machine Learning" */
  "required_courses": number[] /* List of required course ids */
}
```

## Users

#### `POST /user/`

Creates a new account.

#### Request:

```ts
{
  "username": string,
  "email": string,
}
```

#### Response:

```ts
{
  "user_id": number
}
```

#### `GET /user/history/`

Retures completed courses on users profile.

#### Response:

```ts
{
  "completed_courses": number[] /* Course IDs */
}
```

#### `PUT /user/history/{course_id}`

Marks a course as completed.

#### `DELETE /user/history/{course_id}`

Marks a course as uncompleted.

## Plan

#### `GET /plan/`

Returns a list of plans for the current user.

#### Response:

```ts
[
  {
    "plan_id": number,
    "program_id": number,
    "program_type": string,
    "concentration_id": number
  }
  // ...
]
```

#### `POST /plan/`

Creates a new plan for a specified program.

#### Request:

```ts
{
  "program_id": number,
  "program_type": string,
  "concentration_id": number /* May be null if the program has no concentrations */
}
```

#### Response:

```ts
{
  "plan_id": number
}
```

#### `GET /plan/{plan_id}`

Gets a plan for the current user by the plan id.

#### Response:

```ts
{
  "program_id": number,
  "program_type": string,
  "concentration_id": number
}
```

#### `PUT /plan/{plan_id}/`

Returns an updated plan for a specified degree, major and concentration combo, previous plan will be overwritten.

#### Request:

```ts
{
  "program_id": number,
  "program_type": string,
  "concentration_id": number
}
```

#### `DELETE /plan/{plan_id}/`

Deleted a plan for the current user.

#### `GET /plan/{plan_id}/courses`

Gets a list of all courses in a plan.

#### Response:

```ts
[
  {
    "name": string, /* Course name from catalog e.g. "Fundamentals of Computer Science" */
    "course_number": number, /* Course number e.g. 101 */
    "units": number, /* Amount of units for course */
    "crosslisted": number, /* Id of course that is crosslisted, optional field */
    "prerequisites": [
      {
        "needed": number, /* How many of the following courses are needed */
        "courses:": number[] /* Instances where you are able to take one course OR another course */
      }
    ],
    "offered": ["F", "W", "SP", "SU"], /* Terms when course is offered, can be multiple. If null, TBD */
    "description": string /* Description taken from catalog */
  }
  // ...
]
```

#### `GET /plan/{plan_id}/recommendations`

Get a list courses for the user to take next based on completed courses, prerequisites, and term availability.

#### Response:

```ts
[
  {
    "name": string, /* Course name from catalog e.g. "Fundamentals of Computer Science" */
    "course_number": number, /* Course number e.g. 101 */
    "units": number, /* Amount of units for course */
    "prerequisites": [
      {
        "needed": number,
        "courses:": number[] /* Instances where you are able to take one course OR another course */
      }
    ],
    "offered": ["F", "W", "SP", "SU"], /* Terms when course is offered */
    "description": string /* Description taken from catalog */
  }
  // ...
]
```

#### `GET /user/progress/{plan_id}`

Get an overview of the user's progress in a program, including remaining requirements, completed requirements, and units completed.

```ts
{
  "total_units": number, /* Total number of units required for the program */
  "completed_units": number, /* Number of units completed by the user */
  "remaining_units": number, /* Number of units remaining */
  "completed_courses": [
    {
      "name": string,
      "course_number": number,
      "units": number
    }
    // ...
  ],
  "remaining_courses": [
    {
      "name": string,
      "course_number": number,
      "units": number,
      "prerequisites": [
        {
          "needed": number,
          "courses:": number[]
        }
      ]
    }
    // ...
  ]
}

```
