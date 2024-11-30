import express from "express";
import sql from "../database.js";
import createHttpError from "http-errors";

const router = express.Router();
export default router;

interface Department {
  id: number;
  name: string;
}

interface Program {
  id: number;
  department_id: number;
  name: string;
  type: string;
}

router.get("/departments", async (req, res) => {
  const departments = await sql<Department[]>`
    SELECT id, name FROM departments
  `;

  res.send(
    departments.map((department) => ({
      id: department.id,
      name: department.name,
    })),
  );
});

router.get("/departments/:departmentId/programs", async (req, res) => {
  const departmentId = Number(req.params.departmentId);

  if (isNaN(departmentId)) {
    throw createHttpError.BadRequest("Department ID should be a number");
  }

  const programs = await sql<Pick<Program, "id" | "name" | "type">[]>`
    SELECT id, name, type FROM programs
    WHERE department_id = ${departmentId}
  `;

  if (programs.length === 0) {
    throw createHttpError.NotFound(`No programs associated with department ID ${departmentId}`);
  }

  res.send(
    programs.map((program) => ({
      id: program.id,
      name: program.name,
      type: program.type,
    })),
  );
});
