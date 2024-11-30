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

interface PlanInfo {
  course: number;
  set: number | null;
  prereq: number | null;
}

interface CourseInfo {
  course: number;
  prerequisites: number[][];
}

router.get("/plans", async (req, res) => {
  const user = await authUser(req);

  const plans = await sql<
    PlanSummary[]
  >`SELECT plans.id, graduation_date, programs.name AS program_name, concentrations.name AS concentration_name
    FROM plans 
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
    sql`INSERT INTO plans (user_id, graduation_date, concentration_id, program_id) VALUES (${user.id}, ${planBody.graduationDate}, ${planBody.concentrationId}, ${planBody.programId}) RETURNING id`,
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

  await sql`
    UPDATE plans SET
    graduation_date = COALESCE(${planBody.graduationDate ?? null}, graduation_date),
    concentration_id = COALESCE(${planBody.concentrationId ?? null}, concentration_id),
    program_id = COALESCE(${planBody.programId ?? null}, program_id)
    WHERE user_id = ${user.id} AND id = ${planId}
  `;

  res.send();
});

router.delete("/plans/:planId", async (req, res) => {
  const user = await authUser(req);
  const planId = req.params.planId;

  await sql`DELETE FROM plans WHERE user_id = ${user.id} AND id = ${planId}`;
  res.send();
});

router.get("/plans/:planId/courses", async (req, res) => {
  const user = await authUser(req);

  const planCourses = await sql<PlanInfo[]>`
    WITH recursive R AS(
    SELECT program_courses.course_id as course FROM plans
    JOIN program_courses ON plans.program_id = program_courses.program_id
    WHERE plans.id = ${req.params.planId} AND plans.user_id = ${user.id}
    UNION ALL
    SELECT prerequisite_course_sets.course_id AS course FROM R
    JOIN course_prerequisites ON course_prerequisites.course_id = course
    JOIN prerequisite_course_sets ON course_prerequisites.set_number = prerequisite_course_sets.set_number 
  )
  SELECT Distinct course, course_prerequisites.set_number AS set, prerequisite_course_sets.course_id as prereq FROM R
  left JOIN course_prerequisites ON course = course_prerequisites.course_id
  left JOIN prerequisite_course_sets ON course_prerequisites.set_number = prerequisite_course_sets.set_number
  ORDER BY course, set`;

  if (planCourses.length === 0) {
    throw createHttpError.NotFound(`No plan with ID ${req.params.planId}`);
  }
  const plan: CourseInfo[] = [];
  let coursenum: number = planCourses[0].course;
  let prevset: number | null = planCourses[0].set;
  let prereqGroup: number[][] = [];
  let prereqs: number[] = [];
  planCourses.forEach((element) => {
    if (element.course !== coursenum) {
      prereqGroup.push(prereqs);
      plan.push({
        course: coursenum,
        prerequisites: prereqGroup,
      });
      coursenum = element.course;
      prereqGroup = [];
      prereqs = [];
      prevset = element.set;
    } else if (element.set !== prevset) {
      prereqGroup.push(prereqs);
      prevset = element.set;
      prereqs = [];
    }
    if (element.prereq !== null && element.set !== null) {
      prereqs.push(element.prereq);
    }
  });
  prereqGroup.push(prereqs);
  plan.push({
    course: coursenum,
    prerequisites: prereqGroup,
  });
  res.send(plan);
});
