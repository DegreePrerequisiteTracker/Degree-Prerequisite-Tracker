import express from "express";
import sql, { one } from "../database.js";

const router = express.Router();
export default router;

interface Department {
  id: number;
  name: string;
  college_prefix: string;
}

interface Program {
  id: number;
  name: string;
  type: string;
}

router.get("/departments", async (req, res) => {
  const departments = await sql<Department[]>`SELECT id, name, college_prefix FROM departments`;

  res.send(
    departments.map((department) => ({
      id: department.id,
      name: department.name,
      prefix: department.college_prefix,
    })),
  );
});

router.get("/departments/:departmentId", async (req, res) => {
  const departmentId = req.params.departmentId;

  const department = await one<Omit<Department, "id">>(
    sql`SELECT name, college_prefix FROM departments WHERE id = ${departmentId}`,
  );

  res.send({
    name: department.name,
    prefix: department.college_prefix,
  });
});

router.get("/departments/:departmentId/programs", async (req, res) => {
  const departmentId = req.params.departmentId;

  const programs = await sql<Program[]>`
    SELECT id, name, type FROM programs
    WHERE department_id = ${departmentId}
  `;

  res.send(
    programs.map((program) => ({
      id: program.id,
      name: program.name,
      type: program.type,
    })),
  );
});
