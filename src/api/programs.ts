import express from "express";
import sql, { one } from "../database.js";

const router = express.Router();
export default router;

interface Program {
  name: string;
  type: string;
  department_id: number;
}

interface Concentration {
  id: number;
  name: string;
}

router.get("/programs/:programId", async (req, res) => {
  const programId = req.params.programId;
  const program = await one<Program>(sql`SELECT id, name, type, department_id FROM programs WHERE id = ${programId}`);

  res.send({
    name: program.name,
    type: program.type,
    departmentId: program.department_id,
  });
});

router.get("/programs/:programId/concentrations", async (req, res) => {
  const programId = req.params.programId;

  const concentrations = await sql<
    Concentration[]
  >`SELECT id, name FROM concentrations WHERE program_id = ${programId}`;

  res.send(concentrations.map((concentration) => ({ id: concentration.id, name: concentration.name })));
});
