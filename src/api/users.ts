import express from "express";
import { authUser } from "../auth.js";
import sql, { oneOrNull } from "../database.js";

const router = express.Router();
export default router;

interface PlanDetails {
  total_units: number;
  required_courses: number[];
}

interface CompletedCourses {
  completed_count: number;
}

interface CompletedUnitsQuery {
  completed_units: number;
}

router.post("/users", (req, res) => {
  res.send({
    userId: 5,
  });
});

router.get("/users/history", (req, res) => {
  res.send({
    completedCourses: [12, 52, 236],
  });
});

router.put("/users/history/:courseId", async (req, res) => {
  const user = await authUser(req);
  const courseId = req.params.courseId;

  await sql`INSERT INTO courses_completed (user_id, course_id) VALUES (${user.id}, ${courseId}) ON CONFLICT DO NOTHING`;
  res.send();
});

router.delete("/users/history/:courseId", async (req, res) => {
  const user = await authUser(req);
  const courseId = req.params.courseId;

  await sql`DELETE FROM courses_completed WHERE user_id = ${user.id} AND course_id = ${courseId}`;
  res.send();
});

router.get("/users/progress/:planId", async (req, res) => {
  const user = await authUser(req);
  const planId = req.params.planId;

  await sql.begin(async (sql) => {
    const planDetails = await oneOrNull<PlanDetails>(
      sql`SELECT pr.total_units, pr.required_courses
        FROM plans p
        JOIN programs pr ON pr.id = p.program_id
        WHERE p.id = ${planId} AND p.user_id = ${user.id}`);

    if (!planDetails) {
          throw new Error("Plan not found");
        }
    const { total_units, required_courses } = planDetails;

    const completedCourses = await oneOrNull<CompletedCourses>(
      sql`
        SELECT COUNT(*) AS completed_count
        FROM courses_completed cc
        WHERE cc.user_id = ${user.id} AND cc.course_id = ANY(${required_courses}::int[])
      `
    );

    const completedCount = completedCourses ? completedCourses.completed_count : 0;

    const totalCourses = required_courses.length;
    const remainingCourses = totalCourses - completedCount;

    const completedUnitsQuery = await oneOrNull<CompletedUnitsQuery>(
      sql`
        SELECT COALESCE(SUM(c.units), 0) AS completed_units
        FROM courses_completed cc
        JOIN courses c ON cc.course_id = c.id
        WHERE cc.user_id = ${user.id} AND cc.course_id = ANY(${required_courses}::int[])
      `
    );

    const completedUnits = completedUnitsQuery ? completedUnitsQuery.completed_units : 0;
    const remainingUnits = total_units - completedUnits;

    res.send({
        totalUnits: total_units,
        completedUnits,
        remainingUnits,
        completedCoursesCount: completedCount,
        remainingCoursesCount: remainingCourses,
      });
    });
  });
