import express from "express";
import sql, { one } from "../database.js";

const router = express.Router();
export default router;

interface Subject {
  name: string;
  prefix: string;
}

interface Course {
  id: number;
  name: string;
  number: number;
}

router.get("/subjects", async (req, res) => {
  const subjects = await sql<Subject[]>`SELECT name, prefix FROM subjects`;

  res.send(
    subjects.map((subject) => ({
      name: subject.name,
      prefix: subject.prefix,
    })),
  );
});

router.get("/subjects/:prefix", async (req, res) => {
  const prefix = req.params.prefix;

  const subject = await one(sql<Subject[]>`SELECT name, prefix FROM subjects WHERE prefix = ${prefix}`);

  res.send({
    name: subject.name,
    prefix: subject.prefix,
  });
});

router.get("/subjects/:prefix/courses", async (req, res) => {
  const prefix = req.params.prefix;

  const courses = await sql<Course[]>`SELECT id, name, number FROM courses WHERE prefix = ${prefix}`;

  res.send(
    courses.map((course) => ({
      courseId: course.id,
      courseName: course.name,
      courseNumber: course.number,
    })),
  );
});
