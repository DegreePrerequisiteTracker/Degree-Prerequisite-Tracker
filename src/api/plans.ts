import express from "express";
import { z } from "zod";
import sql, { one, oneOrNull } from "../database.js";
import { authUser } from "../auth.js";
import createHttpError from "http-errors";

const router = express.Router();
export default router;

interface Plan {
  graduation_date: Date;
  program_id: number;
  concentration_id: number;
}

interface PlanSummary {
  id: number;
  graduation_date: Date;
  program_name: string;
  concentration_name: string;
}

interface CourseInfo {
  id: number;
  prefix: string;
  number: number;
  name: string;
  prerequisites: string[];
}

router.get("/plans", async (req, res) => {
  const user = await authUser(req);

  const plans = await sql<
    PlanSummary[]
  >`SELECT user_plans.id, graduation_date, programs.name AS program_name, concentrations.name AS concentration_name
    FROM user_plans
    JOIN programs ON programs.id = program_id
    JOIN concentrations ON concentrations.id = concentration_id
    WHERE user_id = ${user.id}`;

  res.send(
    plans.map((userPlan) => ({
      planId: userPlan.id,
      graduationDate: userPlan.graduation_date,
      programName: userPlan.program_name,
      concentrationName: userPlan.concentration_name,
    })),
  );
});

const planReqBody = z.object({
  graduationDate: z.string().date(),
  programId: z.number(),
  concentrationId: z.number(),
});
router.post("/plans", async (req, res) => {
  const user = await authUser(req);
  const planBody = planReqBody.parse(req.body);

  const planId = await one<{ id: number }>(
    sql`INSERT INTO user_plans (user_id, graduation_date, concentration_id, program_id) VALUES (${user.id}, ${planBody.graduationDate}, ${planBody.concentrationId}, ${planBody.programId}) RETURNING id`,
  );
  res.send({
    planId: planId.id,
  });
});

router.get("/plans/:planId", async (req, res) => {
  const user = await authUser(req);
  const planId = Number(req.params.planId);

  if (isNaN(planId)) {
    throw createHttpError.BadRequest("Plan ID should be a number");
  }

  const userPlan = await oneOrNull<Plan>(sql`
    SELECT graduation_date, concentration_id, program_id FROM user_plans
    WHERE user_id = ${user.id} AND id = ${planId}
  `);

  if (!userPlan) {
    throw createHttpError.NotFound(`No plan with ID ${req.params.planId}`);
  }

  res.send({
    graduationDate: userPlan.graduation_date,
    concentrationId: userPlan.concentration_id,
    programId: userPlan.program_id,
  });
});

router.put("/plans/:planId", async (req, res) => {
  const user = await authUser(req);
  const planId = req.params.planId;
  const planBody = planReqBody.partial().parse(req.body);

  const result = await oneOrNull(sql`
    UPDATE user_plans SET
    graduation_date = COALESCE(${planBody.graduationDate ?? null}, graduation_date),
    concentration_id = COALESCE(${planBody.concentrationId ?? null}, concentration_id),
    program_id = COALESCE(${planBody.programId ?? null}, program_id)
    WHERE user_id = ${user.id} AND id = ${planId}
    RETURNING id
  `);

  if (!result) {
    throw createHttpError.NotFound(`No plan with ID ${req.params.planId}`);
  }

  res.send();
});

router.delete("/plans/:planId", async (req, res) => {
  const user = await authUser(req);
  const planId = req.params.planId;

  const result = await oneOrNull(sql`
    DELETE FROM user_plans WHERE user_id = ${user.id} AND id = ${planId}
    RETURNING id
  `);

  if (!result) {
    throw createHttpError.NotFound(`No plan with ID ${req.params.planId}`);
  }

  res.send();
});

router.get("/plans/:planId/courses", async (req, res) => {
  const user = await authUser(req);

  const planCourses = await sql<CourseInfo[]>`
    WITH RECURSIVE plan_course_sets AS (
      -- Get all courses directly required by the program
      SELECT DISTINCT program_requirement_courses.course_set_number FROM user_plans
      JOIN program_requirements ON user_plans.program_id = program_requirements.program_id
      JOIN program_requirement_sets ON program_requirements.requirement_group = program_requirement_sets.requirement_group
      JOIN program_requirement_courses ON program_requirement_sets.set_number = program_requirement_courses.set_number
      WHERE user_plans.id = ${req.params.planId} AND user_plans.user_id = ${user.id}
      UNION
      -- Recursively get all of their prerequisites
      SELECT DISTINCT course_requisite_sets.course_set_number FROM course_requisites
      JOIN plan_course_sets ON course_requisites.course_set_number = plan_course_sets.course_set_number
      JOIN course_requisite_sets ON course_requisites.set_number = course_requisite_sets.set_number
    ),
    primary_courses AS (
      -- Remove crosslisted courses
      SELECT DISTINCT ON (set_number) id, prefix, number, name, set_number FROM courses
    ),
    prereq_groups AS (
      -- Create prerequisite groups for all plan courses
      SELECT primary_courses.id, primary_courses.prefix, primary_courses.number, primary_courses.name, course_requisite_sets.set_number, STRING_AGG(prereqs.id::text, ',') AS prereq_group FROM plan_course_sets
      JOIN primary_courses ON plan_course_sets.course_set_number = primary_courses.set_number
      JOIN course_requisites ON plan_course_sets.course_set_number = course_requisites.course_set_number
      JOIN course_requisite_sets ON course_requisites.set_number = course_requisite_sets.set_number
      JOIN primary_courses AS prereqs ON course_requisite_sets.course_set_number = prereqs.set_number
      GROUP BY primary_courses.id, primary_courses.prefix, primary_courses.number, primary_courses.name, course_requisite_sets.set_number
    )
    -- Aggregate prerequisite groups into arrays
    SELECT id, prefix, number, name, ARRAY_AGG(prereq_group) AS prerequisites FROM prereq_groups
    GROUP BY id, name, prefix, number
    ORDER BY prefix, number
  `;

  const planCoursesTwo = planCourses.map((course) => ({
    ...course,
    prerequisites: course.prerequisites.map((group) => group.split(",").map((courseId) => Number(courseId))),
  }));

  res.send(
    planCoursesTwo.map((course) => ({
      courseId: course.id,
      prefix: course.prefix,
      number: course.number,
      name: course.name,
      prerequisites: course.prerequisites,
    })),
  );
});
