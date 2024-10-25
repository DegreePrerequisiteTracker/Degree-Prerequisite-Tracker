import type { Express } from "express";
import user from "./api/user.js";
import department from "./api/department.js";
import course from "./api/course.js";
import program from "./api/program.js";
import plan from "./api/plan.js";

export function createRoutes(app: Express) {
  // New routes need to be added to this array in order to work
  const routes = [user, department, course, program, plan];

  routes.forEach((route) => app.use(route));
}
