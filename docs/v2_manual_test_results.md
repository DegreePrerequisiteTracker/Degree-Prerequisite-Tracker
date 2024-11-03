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

### Testing results

TODO

# Selecting program

**NOTE: In order to do the following flow, the user needs to be signed in. Follow the auth flow above to recieve a JWT.**

### Workflow

User wants to explore programs then select a different program for their previously created plan.

1. `GET /department/` : gets a list of departments
1. `GET /department/{department_id}/programs` : gets a list of programs available in a department
1. `GET /program/{program_id}` : gets the details for a specific program
1. `PUT /plan/{plan_id}` : updates previous plan with new program information
1. `GET /plan/{plan_id}/courses` : gets a list of all courses required for this plan

### Testing results

TODO
