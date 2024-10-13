# API Spec for Degree Prerequisite Tracker

## Department

#### `GET /department/`

Returns a list of all departments.

#### Response:

```json
[
  {
    "name": string, /* Department name e.g. "Computer Science" */
    "course_prefix": string, /* Course prefix e.g. "CSC" */
  }
  // ...
]
``` 

#### `GET /department/{course_prefix}/`

Returns data about a specific department.

#### Response:

```json
{
  "name": string, /* Department name e.g. "Computer Science" */
  "course_prefix": string, /* Course prefix e.g. "CSC" */
}
```

#### `GET /department/{course_prefix}/course`

Returns a list of all courses in a given department.

#### Response:

```json
[
  {
    "course_id": integer,
    "course_name": string, /* Course name from catalog e.g. "Fundamentals of Computer Science" */
    "course_number": integer /* Course number e.g. 101 */
  }
  // ...
]
```

## Courses

#### `GET /course/{course_id}/`

Returns data for a specific course.

#### Response:

```json
{
  "name": string, /* Course name from catalog e.g. "Fundamentals of Computer Science" */
  "course_number": integer, /* Course number e.g. 101 */
  "units": integer, /* Amount of units for course */
  "crosslisted": integer, /* Id of course that is crosslisted, optional field */
  "prerequisites": [
    {
      "needed": integer, /* How many of the following courses are needed */
      "courses:": int[] /* Instances where you are able to take one course OR another course */ 
    }
  ],
  "offered": ["F", "W", "SP", "SU"], /* Terms when course is offered, can be multiple. If null, TBD */
  "description": string /* Description taken from catalog */
}
```

Prerequisites are formatted as follows:

- `"prerequisites": [
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
] ` Means in order to take the course, you must have completed the courses with ids `3252`, `2363`, AND `847`.

- `"prerequisites": [
  {
    "needed": 1,
    "courses:": [734, 1673]
  },
  {
    "needed": 1,
    "courses": [2983]
  }
]` Means in order to take the course, you must have completed course id `2983` AND have completed `734` OR `1673`.


## Majors

#### `GET /program/`

Returns a list of all majors.

#### Response:

```json
[
  {
    "program_id": integer,
    "name": string, /* Program name e.g. "Computer Science" */
    "program_types": string[] /* Program types offered e.g. ["BS", "MS", "Minor"] */
  }
  // ...
]
```

#### `GET /program/{program_id}`

Returns data about a specific program.

#### Response:

```json
{
  "program_id": integer,
  "name": string, /* Program name e.g. "Computer Science" */
  "program_types": string[] /* Program types offered e.g. ["BS", "MS", "Minor"] */
}
```

#### `GET /program/{program_id}/{program_type}/requirements`

Returns data about the requirements of a specific program type.

#### Response:

```json
{
  "name": string, /* Program name e.g. "Computer Science" */
  "required_courses": course_id[] /* List of required course ids */
}
```

#### `GET /program/{program_id}/BS/concentration/`

Returns a list of all concentrations in program.

#### Response:

```json
[
  {
    "concentration_id": integer,
    "name": string /* Concentration name e.g. "Artificial Intelligence and Machine Learning" */
  }
  // ...
] /* If no concentrations exist, will be an empty array */
```

#### `GET /program/{program_id}/BS/concentration/{concentration_id}/`

Returns data about a specific concentration in a program.

#### Response:

```json
{
  "name": string, /* Title of concentration from catalog e.g. "Artificial Intelligence and Machine Learning" */
  "required_courses": course_id[] /* List of required course ids */
}
```

## Users

#### `POST /user/`

Creates a new account.

#### Request:

```json
{
  "email": string,
  "first_name": string,
  "last_name": string
}
```

#### Response:

```json
{
  "user_id": integer
}
```


#### `GET /user/history/`

Retures completed courses on users profile.

#### Response:

```json
{
  "completed_courses": course_id[]
}
```


#### `PUT /user/history/{course_id}`

Marks a course as completed.


#### `DELETE /user/history/{course_id}`

Marks a course as uncompleted.

## Plan

#### `POST /plan/`

Returns a plan for a specified program.

#### Request:

```json
{ 
  "user_id": 1,
  "program_id": 34,
  "program_type": "BS",
  "concentration_id": 57
}
```

#### Response:

```json
{
  "plan_id": 1,
  "courses": [1155, 781, 901, ... ]
}
```


#### `POST /plan/update/`

Returns an updated plan for a specified degree, major and concentration combo, previous plan will be overwritten.

#### Request:

```json
{ 
  "user_id": 1,
  "plan_id": 1,
  "degree": "BS",
  "major_id": 34,
  "concentration_id": 57
}
```

#### Response:

```json
{
  "plan_id": 1,
  "courses": [1155, 781, 901, ... ]
}
```

#### `POST /plan/delete/`

Returns an updated plan for a specified degree, major and concentration combo, previous plan will be overwritten.

#### Request:

```json
{ 
  "user_id": 1,
  "plan_id": 1
}
```

#### Response:

```json
{
  "response": 200
}
```

#### `DELETE /plan/{plan_id}/`

Returns an updated plan for a specified degree, major and concentration combo, previous plan will be overwritten.

#### Request:

```json
{ 
  "user_id": 1,
  "plan_id": 1
}
```

#### Response:

```json
{
  "response": 200
}
```

#### `GET /plan/{user_id}/`

Returns all plans associated with specified user.

#### Request:

```json
{ 
  "user_id": 1
}
```

#### Response:

```json
[
  { 
    "plan_id": 1,
    "degree": "BS",
    "major_id": 34,
    "concentration_id": 57
  },
  { 
    "plan_id": 2,
    "degree": "BS",
    "major_id": 34,
    "concentration_id": 58
  }
]
```