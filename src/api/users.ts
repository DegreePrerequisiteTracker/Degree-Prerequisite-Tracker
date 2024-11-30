import express from "express";
import { authUser } from "../auth.js";
import sql from "../database.js";
import createHttpError from "http-errors";
import { z } from "zod";
import { Courses } from "../schema.js";

const router = express.Router();
export default router;

router.get("/users/history", async (req, res) => {
  const user = await authUser(req);

  const userCourses = await sql<Pick<Courses, "id" | "prefix" | "number">[]>`
    SELECT course_id AS id, prefix, number FROM user_course_history
    JOIN courses ON courses.id = course_id 
    WHERE user_id = ${user.id}
  `;

  res.send(userCourses.map((course) => ({ courseId: course.id, prefix: course.prefix, number: course.number })));
});

const userHistoryReqBody = z.array(z.number());
router.put("/users/history", async (req, res) => {
  const user = await authUser(req);
  const courseIds = userHistoryReqBody.parse(req.body);

  await sql`
    INSERT INTO user_course_history (user_id, course_id)
    SELECT ${user.id}, course_id FROM UNNEST(${courseIds}::int[]) AS course_id
    ON CONFLICT DO NOTHING
  `;

  res.send();
});

router.delete("/users/history/:courseId", async (req, res) => {
  const user = await authUser(req);
  const courseId = Number(req.params.courseId);

  if (isNaN(courseId)) {
    throw createHttpError.BadRequest("Course ID should be a number");
  }

  await sql`
    DELETE FROM user_course_history
    WHERE user_id = ${user.id} AND course_id = ${courseId}
  `;

  res.send();
});
