# Degree Prerequisite Tracker

## Description

### Contributors

Kai Swangler | kswangle@calpoly.edu  
Nathan Lackie | nlackie@calpoly.edu  
Cody Barriger | cbarrige@calpoly.edu  
Zoila Kanu | zkanu@calpoly.edu

### Overview

Our goal is to make the degree planning process quicker, easier, and more comprehensible. With the current Degree Planner data is scattered across multiple different pages and the overall UX is poor. This can lead to insufficient planning, where the proper prerequisites are not completed. We hope to develop a single unified design containing all of a student's degree planning needs.

The database would automatically write in information from Cal Poly’s course catalog. Users can then make requests to the API to retrieve information about specific courses (notably prerequisites) based on what courses they have completed / enrolled in.

We will also have analyis logic for suggesting a priority for courses based on a number of factors (number of prerequisites, if the course is required to graduate, etc.). This will help students choose which courses to prioritize, and allow them to build a full degree plan.

### Testing Endpoints

If you prefer to use a docs page to test endpoints rather than curl, navigate here.

https://degree-prerequisite-tracker.onrender.com/

## Development

### Setup

1. Install [Node.js](https://nodejs.org/en)
2. Run `npm install` in the project directory to install all necessary dependencies
3. Install the recommended VSCode extensions (prettier and eslint)

   - This isn't required, but will give you inline linter warnings, instead of having to rely on `npm run lint`

4. Run `npm run server` to start the local dev server, which can be accessed at http://localhost:3000/

### Adding new api files

1. Create a file in the `src/api` directory
2. Create the router for that file

   ```ts
   import express from "express";

   const router = express.Router();
   export default router;
   ```

3. Import that file into `src/routes.ts`
4. Add the imported file into the `routes` array

### Creating new routes

1. Add the route to the router
   ```ts
   router.get("/api/route/example", (req, res) => {
     // Logic here
   });
   ```
2. Use the correct HTTP method (outlined in the API spec). `router.get()` for GET requests, `router.post()` for POST requests, etc.
3. The `req` parameter contains information about the request
4. The `res` parameter contains information about the response
5. Use `res.send()` to send the response body
   ```ts
   router.get("/api/route/example", (req, res) => {
     res.send("This is a response!");
   });
   ```

See the ExpressJS documentation for more information: https://expressjs.com/en/4x/api.html

### Using authentication

In order to make a route require authentication to be accessed, you can call the `authUser()` function. This will verify the authorization header provided with the request, and retrieve the associated user data.

```ts
import { authUser } from "../auth.js";

router.get("/auth/example", async (req, res) => {
  const user = await authUser(req);

  // Logic here
});
```

NOTE: Make sure you await the call to `authUser()`, and make the call before doing anything an unauthenticated user shouldn't be able to do.

### Testing the server

1. Ensure your server is running with `npm run server`
2. Make HTTP requests against the running server
   - If you prefer to make requests from the command line, you can use [cURL](https://curl.se/docs/tutorial.html)
   - If you prefer a UI tool, you can use [Postman](https://www.postman.com/)
   - For example, to test a new route `GET /foo/bar`, make a GET request to `http://localhost:3000/foo/bar/`
3. Inspect the response to ensure it's correct

### Pushing your changes

1. Commit your changes
2. Test your commit builds sucessfully and passes the linting with `npm run release`
   - Alternatively, you can test these steps individually with `npm run build` and `npm run lint`
3. If it passes, push your commit to a branch
   - If it fails, run `npm run fix` to automatically fix violations
   - Prettier violations should all be automatically fixable, but you may need to fix some ESLint violations manually
4. Create a pull request on Github to merge your branch into the main branch
