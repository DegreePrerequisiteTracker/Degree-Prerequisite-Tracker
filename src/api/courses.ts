import express from "express";
import sql, { oneOrNull } from "../database.js";
import createHttpError from "http-errors";

const router = express.Router();
export default router;

interface Course {
  prefix: string;
  name: string;
  number: number;
  description: string;
}

router.get("/courses/:courseId", async (req, res) => {
  const courseId = Number(req.params.courseId);

  if (Number.isNaN(courseId)) {
    throw createHttpError.BadRequest("Course ID should be a number");
  }

  const course = await oneOrNull(
    sql<Course[]>`SELECT prefix, number, name, description FROM courses WHERE id = ${courseId}`,
  );

  if (!course) {
    throw createHttpError.NotFound(`No course with ID ${courseId}`);
  }

  res.send({
    prefix: course.prefix,
    number: course.number,
    name: course.name,
    description: course.description,
  });
});
