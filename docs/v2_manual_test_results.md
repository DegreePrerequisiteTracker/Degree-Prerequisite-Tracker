# Authentication

This flow allows the user to sign in, and recieve a JWT to use for all requests that require auth.

## Creating an account

### Workflow

User wants to create a new account by providing their email and password.

1. `POST /auth/v1/signup` (sent to supabase) EX:

```json
{
  "email": "example@gmail.com",
  "password": "my-secret-password"
}
```

### Testing results

```bash
curl -X POST https://eciuedmxxubiurblwicm.supabase.co/auth/v1/signup \
-H 'Apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjaXVlZG14eHViaXVyYmx3aWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5Nzg4MzgsImV4cCI6MjA0NTU1NDgzOH0.4Yj5yja7Phb6880eMh46WyyNJSfaHNLaOhPvlNkzuHM' \
-H 'Content-Type: application/json' \
-d '{"email": "example@gmail.com","password": "my-secret-password"}'
```

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6IkhKSGVQbWhqMk5iS3BFOS8iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2VjaXVlZG14eHViaXVyYmx3aWNtLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIyYmNlNGI1MS0yZjdkLTQyMDgtODQ0NS1mOGJmN2RmOWEzYWEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzMwNjAwNTIwLCJpYXQiOjE3MzA1OTY5MjAsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiMmJjZTRiNTEtMmY3ZC00MjA4LTg0NDUtZjhiZjdkZjlhM2FhIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MzA1OTY5MjB9XSwic2Vzc2lvbl9pZCI6IjJlNzY4NmJiLTE0ZDgtNGJlMS05MWM5LWNhZjZkNDM1MGU0YiIsImlzX2Fub255bW91cyI6ZmFsc2V9.37bjqNPpfIikMBAjN8deVb2PIcbNScywn2TPiMB_kZM",
  "token_type": "bearer",
  "expires_in": 3600,
  "expires_at": 1730600520,
  "refresh_token": "AEbvi5H_lglrp_ej1K14mg",
  "user": {
    "id": "2bce4b51-2f7d-4208-8445-f8bf7df9a3aa",
    "aud": "authenticated",
    "role": "authenticated",
    "email": "example@gmail.com",
    "email_confirmed_at": "2024-11-03T01:22:00.904748511Z",
    "phone": "",
    "last_sign_in_at": "2024-11-03T01:22:00.906974426Z",
    "app_metadata": {
      "provider": "email",
      "providers": ["email"]
    },
    "user_metadata": {
      "email": "example@gmail.com",
      "email_verified": false,
      "phone_verified": false,
      "sub": "2bce4b51-2f7d-4208-8445-f8bf7df9a3aa"
    },
    "identities": [
      {
        "identity_id": "099c16d4-188c-4e0c-b3e7-b7d570ad0005",
        "id": "2bce4b51-2f7d-4208-8445-f8bf7df9a3aa",
        "user_id": "2bce4b51-2f7d-4208-8445-f8bf7df9a3aa",
        "identity_data": {
          "email": "example@gmail.com",
          "email_verified": false,
          "phone_verified": false,
          "sub": "2bce4b51-2f7d-4208-8445-f8bf7df9a3aa"
        },
        "provider": "email",
        "last_sign_in_at": "2024-11-03T01:22:00.902297853Z",
        "created_at": "2024-11-03T01:22:00.902351Z",
        "updated_at": "2024-11-03T01:22:00.902351Z",
        "email": "example@gmail.com"
      }
    ],
    "created_at": "2024-11-03T01:22:00.900135Z",
    "updated_at": "2024-11-03T01:22:00.908478Z",
    "is_anonymous": false
  }
}
```

## Signing into an existing account

### Workflow

User wants to sign into their account by providing their email and password.

1. `POST /auth/v1/token?grant_type=password` (sent to supabase) EX:

```json
{
  "email": "example@gmail.com",
  "password": "my-secret-password"
}
```

### Testing Results

```bash
curl -X POST https://eciuedmxxubiurblwicm.supabase.co/auth/v1/token?grant_type=password \
-H 'Apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjaXVlZG14eHViaXVyYmx3aWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5Nzg4MzgsImV4cCI6MjA0NTU1NDgzOH0.4Yj5yja7Phb6880eMh46WyyNJSfaHNLaOhPvlNkzuHM' \
-H 'Content-Type: application/json' \
-d '{"email": "example@gmail.com","password": "my-secret-password"}'
```

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6IkhKSGVQbWhqMk5iS3BFOS8iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2VjaXVlZG14eHViaXVyYmx3aWNtLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIyYmNlNGI1MS0yZjdkLTQyMDgtODQ0NS1mOGJmN2RmOWEzYWEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzMwNjAwOTI5LCJpYXQiOjE3MzA1OTczMjksImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiMmJjZTRiNTEtMmY3ZC00MjA4LTg0NDUtZjhiZjdkZjlhM2FhIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MzA1OTczMjl9XSwic2Vzc2lvbl9pZCI6IjdmNTM2OWMwLTgwNWEtNGVmOS1hMmFmLTRlNmRhZjAxMWU3ZSIsImlzX2Fub255bW91cyI6ZmFsc2V9.5F699BSbfi-kvHqI8xr7_UMjNAReR4H6AghHkNPdQ6A",
  "token_type": "bearer",
  "expires_in": 3600,
  "expires_at": 1730600929,
  "refresh_token": "kUQojSXbee2Rq2tK6OLLFQ",
  "user": {
    "id": "2bce4b51-2f7d-4208-8445-f8bf7df9a3aa",
    "aud": "authenticated",
    "role": "authenticated",
    "email": "example@gmail.com",
    "email_confirmed_at": "2024-11-03T01:22:00.904748Z",
    "phone": "",
    "confirmed_at": "2024-11-03T01:22:00.904748Z",
    "last_sign_in_at": "2024-11-03T01:28:49.335318652Z",
    "app_metadata": {
      "provider": "email",
      "providers": ["email"]
    },
    "user_metadata": {
      "email": "example@gmail.com",
      "email_verified": false,
      "phone_verified": false,
      "sub": "2bce4b51-2f7d-4208-8445-f8bf7df9a3aa"
    },
    "identities": [
      {
        "identity_id": "099c16d4-188c-4e0c-b3e7-b7d570ad0005",
        "id": "2bce4b51-2f7d-4208-8445-f8bf7df9a3aa",
        "user_id": "2bce4b51-2f7d-4208-8445-f8bf7df9a3aa",
        "identity_data": {
          "email": "example@gmail.com",
          "email_verified": false,
          "phone_verified": false,
          "sub": "2bce4b51-2f7d-4208-8445-f8bf7df9a3aa"
        },
        "provider": "email",
        "last_sign_in_at": "2024-11-03T01:22:00.902297Z",
        "created_at": "2024-11-03T01:22:00.902351Z",
        "updated_at": "2024-11-03T01:22:00.902351Z",
        "email": "example@gmail.com"
      }
    ],
    "created_at": "2024-11-03T01:22:00.900135Z",
    "updated_at": "2024-11-03T01:28:49.337011Z",
    "is_anonymous": false
  }
}
```

# Using plans

**NOTE: In order to do the following flow, the user needs to be signed in. Follow the auth flow above to recieve a JWT.**

### Workflow

User wants to create a plan, and mark courses as complete as they progress in their plan.

1. `POST /plans/` create a new plan, EX:

```json
{
  "graduationDate": "2026-06-30",
  "programId": 23,
  "concentrationId": 26
}
```

2. `PUT /users/history/{courseId}` mark a course as complete (happens at the user level, so it applies to all plans)
3. `DELETE /users/history/{courseId}` optionally, mark a course as incomplete if it was mistakenly set as completed
4. `DELETE /plans/{planId}/` delete the plan when it is no longer needed

### Testing results

```bash
curl -X POST 'https://degree-prerequisite-tracker.onrender.com/plans' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {authorization-token}' \
-d '{"graduationDate": "2026-06-30", "programId": 23, "concentrationId": 26}'
```

```json
{ "planId": 1 }
```

```bash
curl -X PUT 'https://degree-prerequisite-tracker.onrender.com/users/history/1314' \
-H 'Authorization: Bearer {authorization-token}'
```

`200 OK`

```bash
curl -X DELETE 'https://degree-prerequisite-tracker.onrender.com/users/history/1314' \
-H 'Authorization: Bearer {authorization-token}'
```

`200 OK`

```bash
curl -X DELETE 'https://degree-prerequisite-tracker.onrender.com/plans/1' \
-H 'Authorization: Bearer {authorization-token}'
```

`200 OK`

# Selecting program

**NOTE: In order to do the following flow, the user needs to be signed in. Follow the auth flow above to recieve a JWT.**

### Workflow

User wants to explore programs then select a different program for their previously created plan.

1. `GET /departments/` : gets a list of departments
2. `GET /departments/{departmentId}/programs` : gets a list of programs available in a department
3. `GET /programs/{programId}/concentrations` : gets a list of all concentrations available in a program
4. `PUT /plans/{planId}` : updates previous plan with new program and concentration information

### Testing results

`curl https://degree-prerequisite-tracker.onrender.com/departments`

```json
[
  {
    "id": 1,
    "name": "Agribusiness",
    "prefix": "CAFES"
  },
  {
    "id": 2,
    "name": "Agricultural Education and Communication",
    "prefix": "CAFES"
  },
  {
    "id": 3,
    "name": "Animal Science",
    "prefix": "CAFES"
  },
  {
    "id": 4,
    "name": "BioResource and Agricultural Engineering",
    "prefix": "CAFES"
  },
  {
    "id": 5,
    "name": "Experience Industry Management",
    "prefix": "CAFES"
  },
  {
    "id": 6,
    "name": "Food Science and Nutrition",
    "prefix": "CAFES"
  },
  {
    "id": 7,
    "name": "Military Science",
    "prefix": "CAFES"
  },
  {
    "id": 8,
    "name": "Natural Resources Management and Environmental Sciences",
    "prefix": "CAFES"
  },
  {
    "id": 9,
    "name": "Plant Sciences",
    "prefix": "CAFES"
  },
  {
    "id": 10,
    "name": "Wine and Viticulture",
    "prefix": "CAFES"
  },
  {
    "id": 11,
    "name": "Architectural Engineering",
    "prefix": "CAED"
  },
  {
    "id": 12,
    "name": "Architecture",
    "prefix": "CAED"
  },
  {
    "id": 13,
    "name": "City and Regional Planning",
    "prefix": "CAED"
  },
  {
    "id": 14,
    "name": "Construction Management",
    "prefix": "CAED"
  },
  {
    "id": 15,
    "name": "Landscape Architecture",
    "prefix": "CAED"
  },
  {
    "id": 17,
    "name": "Aerospace Engineering",
    "prefix": "CENG"
  },
  {
    "id": 18,
    "name": "Biomedical Engineering",
    "prefix": "CENG"
  },
  {
    "id": 19,
    "name": "Civil and Environmental Engineering",
    "prefix": "CENG"
  },
  {
    "id": 20,
    "name": "Computer Engineering",
    "prefix": "CENG"
  },
  {
    "id": 21,
    "name": "Computer Science and Software Engineering",
    "prefix": "CENG"
  },
  {
    "id": 22,
    "name": "Electrical Engineering",
    "prefix": "CENG"
  },
  {
    "id": 23,
    "name": "General Engineering",
    "prefix": "CENG"
  },
  {
    "id": 24,
    "name": "Industrial and Manufacturing Engineering",
    "prefix": "CENG"
  },
  {
    "id": 25,
    "name": "Materials Engineering",
    "prefix": "CENG"
  },
  {
    "id": 26,
    "name": "Mechanical Engineering",
    "prefix": "CENG"
  },
  {
    "id": 27,
    "name": "Art and Design",
    "prefix": "CLA"
  },
  {
    "id": 28,
    "name": "Communication Studies",
    "prefix": "CLA"
  },
  {
    "id": 29,
    "name": "English",
    "prefix": "CLA"
  },
  {
    "id": 30,
    "name": "Ethnic Studies",
    "prefix": "CLA"
  },
  {
    "id": 31,
    "name": "Graphic Communication",
    "prefix": "CLA"
  },
  {
    "id": 32,
    "name": "History",
    "prefix": "CLA"
  },
  {
    "id": 33,
    "name": "Interdisciplinary Studies in the Liberal Arts",
    "prefix": "CLA"
  },
  {
    "id": 34,
    "name": "Journalism",
    "prefix": "CLA"
  },
  {
    "id": 35,
    "name": "Music",
    "prefix": "CLA"
  },
  {
    "id": 36,
    "name": "Philosophy",
    "prefix": "CLA"
  },
  {
    "id": 37,
    "name": "Political Science",
    "prefix": "CLA"
  },
  {
    "id": 38,
    "name": "Psychology and Child Development",
    "prefix": "CLA"
  },
  {
    "id": 39,
    "name": "Social Sciences",
    "prefix": "CLA"
  },
  {
    "id": 40,
    "name": "Theatre and Dance",
    "prefix": "CLA"
  },
  {
    "id": 41,
    "name": "Women's, Gender and Queer Studies",
    "prefix": "CLA"
  },
  {
    "id": 42,
    "name": "World Languages and Cultures",
    "prefix": "CLA"
  },
  {
    "id": 43,
    "name": "Biological Sciences",
    "prefix": "COSAM"
  },
  {
    "id": 44,
    "name": "Chemistry and Biochemistry",
    "prefix": "COSAM"
  },
  {
    "id": 45,
    "name": "Kinesiology and Public Health",
    "prefix": "COSAM"
  },
  {
    "id": 46,
    "name": "Liberal Studies",
    "prefix": "COSAM"
  },
  {
    "id": 47,
    "name": "Mathematics",
    "prefix": "COSAM"
  },
  {
    "id": 48,
    "name": "Physics",
    "prefix": "COSAM"
  },
  {
    "id": 49,
    "name": "Statistics",
    "prefix": "COSAM"
  },
  {
    "id": 50,
    "name": "School of Education",
    "prefix": "COSAM"
  },
  {
    "id": 16,
    "name": "Orfalea College of Business",
    "prefix": "COB"
  }
]
```

`curl https://degree-prerequisite-tracker.onrender.com/departments/21/programs`

```json
[
  {
    "id": 23,
    "name": "Computer Science",
    "type": "BS"
  },
  {
    "id": 62,
    "name": "Software Engineering",
    "type": "BS"
  }
]
```

`curl https://degree-prerequisite-tracker.onrender.com/programs/23/concentrations`

```json
[
  {
    "id": "25",
    "name": "General Curriculum in Computer Science"
  },
  {
    "id": "26",
    "name": "Artificial Intelligence and Machine Learning"
  },
  {
    "id": "27",
    "name": "Data Engineering"
  },
  {
    "id": "28",
    "name": "Game Development"
  },
  {
    "id": "29",
    "name": "Graphics"
  },
  {
    "id": "30",
    "name": "Privacy and Security"
  }
]
```

```bash
curl -X PUT 'https://degree-prerequisite-tracker.onrender.com/plans/5' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {authorization-token}' \
-d '{"programId": 23, "concentrationId": 26}'
```

```
200 OK
```
