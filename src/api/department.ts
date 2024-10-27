import express from "express";
import sql, { one } from "../database.js";

const router = express.Router();
export default router;

interface Department {
  name: string;
  prefix: string;
}

interface Course {
  id: number;
  name: string;
  number: number;
}

router.get("/department", async (req, res) => {
  const departments = await sql<Department[]>`SELECT name, prefix FROM departments`;

  res.send(
    departments.map((department) => ({
      name: department.name,
      departmentId: department.prefix,
    })),
  );
});

router.get("/department/:departmentPrefix", async (req, res) => {
  const departmentPrefix = req.params.departmentPrefix;

  const department = await one(
    sql<Department[]>`SELECT name, prefix FROM departments WHERE prefix = ${departmentPrefix}`,
  );

  res.send({
    name: department.name,
    departmentId: department.prefix,
  });
});

router.get("/department/:departmentPrefix/programs", (req, res) => {
  res.send([
    {
      program_id: 1,
      name: "Computer Science",
      program_types: ["BS", "MS", "Minor"],
    },
  ]);
});

router.get("/department/:departmentPrefix/courses", async (req, res) => {
  const departmentPrefix = req.params.departmentPrefix;

  const courses = await sql<Course[]>`SELECT id, name, number FROM courses WHERE prefix = ${departmentPrefix}`;

  res.send(
    courses.map((course) => ({
      courseId: course.id,
      courseName: course.name,
      courseNumber: course.number,
    })),
  );
});
