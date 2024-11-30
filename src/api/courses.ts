import express from "express";
import sql, { oneOrNull } from "../database.js";
import createHttpError from "http-errors";
import { Courses } from "../schema.js";

const router = express.Router();
export default router;

router.get("/courses/:courseId", async (req, res) => {
  const courseId = Number(req.params.courseId);

  if (isNaN(courseId)) {
    throw createHttpError.BadRequest("Course ID should be a number");
  }

  const course = await oneOrNull(sql<Courses[]>`
    SELECT id, set_number, prefix, number, name, description, min_units, max_units, fall, winter, spring, summer, uscp, gwr
    FROM courses
    WHERE id = ${courseId}
  `);

  if (!course) {
    throw createHttpError.NotFound(`No course with ID ${courseId}`);
  }

  const crosslisted = await sql<Pick<Courses, "id" | "prefix" | "number">[]>`
    SELECT id, prefix, number FROM courses
    WHERE set_number = (SELECT set_number FROM courses WHERE id = ${courseId}) AND id != ${courseId}
  `;

  const units = formatUnits(course.min_units, course.max_units);
  const terms = formatTerms(course.fall, course.winter, course.spring, course.summer);

  res.send({
    prefix: course.prefix,
    number: course.number,
    name: course.name,
    description: course.description,
    units: units,
    terms: terms,
    crosslisted: crosslisted,
    uscp: course.uscp,
    gwr: course.gwr,
  });
});

function formatUnits(minUnits: number | null, maxUnits: number) {
  if (minUnits) {
    return minUnits / 10 + "-" + maxUnits / 10;
  }
  return (maxUnits / 10).toString();
}

function formatTerms(fall: boolean, winter: boolean, spring: boolean, summer: boolean) {
  const terms: string[] = [];

  if (!fall && !winter && !spring && !summer) return ["TBD"];

  if (fall) terms.push("F");
  if (winter) terms.push("W");
  if (spring) terms.push("SP");
  if (summer) terms.push("SU");

  return terms;
}
