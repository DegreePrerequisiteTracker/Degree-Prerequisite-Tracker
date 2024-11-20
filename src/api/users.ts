import express from "express";
import { authUser } from "../auth.js";
import sql from "../database.js";

const router = express.Router();
export default router;

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

  const result = await sql.begin(async (sql) => {
    const planDetails = await sql`
      SELECT pr.total_units, pr.required_courses
      FROM plans p
      JOIN programs pr ON pr.id = p.program_id
      WHERE p.id = ${planId} AND p.user_id = ${user.id}`;

    const { totalUnits, requiredCourses } = planDetails[0];

    const completedCourses = await sql`
      SELECT COUNT(*) AS completed_count
      FROM courses_completed cc
      WHERE cc.user_id = ${user.id} AND cc.course_id = ${requiredCourses}`;

    const completedCount = completedCourses[0].completedCount;

    const totalCourses = requiredCourses.length;
    const remainingCourses = totalCourses - completedCount;

    const completedUnitsQuery = await sql`
      SELECT COALESCE(SUM(c.units), 0) AS completed_units
      FROM courses_completed cc
      JOIN courses c ON cc.course_id = c.id
      WHERE cc.user_id = ${user.id} AND cc.course_id = ${requiredCourses}`;

    const completedUnits = completedUnitsQuery[0].completedUnits || 0;
    const remainingUnits = totalUnits - completedUnits;

    return {
      totalUnits,
      completedUnits: completedUnits,
      remainingUnits: remainingUnits,
      completedCoursescount: completedCount,
      remainingCoursescount: remainingCourses,
    };
  });

  res.send(result);
});
