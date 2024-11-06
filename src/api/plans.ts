import express from "express";
import { z } from "zod";
import sql, { one } from "../database.js";
import { authUser } from "../auth.js";

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
  const planId = req.params.planId;

  const userPlan = await one<Plan>(
    sql`SELECT graduation_date, concentration_id, program_id FROM plans WHERE user_id = ${user.id} AND id = ${planId}`,
  );

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

router.get("/plans/:planId/courses", (req, res) => {
  res.send({
    courseName: "string",
    courseNumber: 4056,
    units: 4,
    crosslisted: 53,
    prerequisites: [
      {
        needed: 3,
        "courses:": [12, 52, 236],
      },
    ],
    offered: ["F", "W", "SP", "SU"],
    description: "course description",
  });
});
