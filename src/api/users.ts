import express from "express";
import { authUser } from "../auth.js";
import sql from "../database.js";

const router = express.Router();
export default router;

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
