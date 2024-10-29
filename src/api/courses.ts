import express from "express";
import sql, { one } from "../database.js";

const router = express.Router();
export default router;

interface Course {
  prefix: string;
  name: string;
  number: number;
  description: string;
}

router.get("/courses/:courseId", async (req, res) => {
  const courseId = req.params.courseId;

  const course = await one(sql<Course[]>`SELECT prefix, number, name, description FROM courses WHERE id = ${courseId}`);

  res.send({
    prefix: course.prefix,
    number: course.number,
    name: course.name,
    description: course.description,
  });
});
