import express from "express";
import sql from "../database.js";
import createHttpError from "http-errors";

const router = express.Router();
export default router;

interface Concentration {
  id: number;
  program_id: number;
  name: string;
}

router.get("/programs/:programId/concentrations", async (req, res) => {
  const programId = Number(req.params.programId);

  if (isNaN(programId)) {
    throw createHttpError.BadRequest("Program ID should be a number");
  }

  const concentrations = await sql<Concentration[]>`
    SELECT id, name FROM concentrations
    WHERE program_id = ${programId}
  `;

  res.send(concentrations.map((concentration) => ({ id: concentration.id, name: concentration.name })));
});
