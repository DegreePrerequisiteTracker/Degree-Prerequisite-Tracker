import type { Express } from "express";
import user from "./api/users.js";
import department from "./api/departments.js";
import course from "./api/courses.js";
import program from "./api/programs.js";
import plan from "./api/plans.js";
import apiDocs from "./api/apiDocs.js";

export function createRoutes(app: Express) {
  // New routes need to be added to this array in order to work
  const routes = [user, department, course, program, plan, apiDocs];

  routes.forEach((route) => app.use(route));
}
