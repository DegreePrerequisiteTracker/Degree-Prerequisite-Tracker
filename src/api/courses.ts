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

  await sql.begin(async (sql) => {
    const course = await oneOrNull(sql<Courses[]>`
      SELECT id, set_number, prefix, number, name, description, min_units, max_units, fall, winter, spring, summer, uscp, gwr
      FROM courses
      WHERE id = ${courseId}
    `);

    if (!course) {
      throw createHttpError.NotFound(`No course with ID ${courseId}`);
    }

    const prerequisites = await sql<{ prerequisites: string[] }[]>`
      WITH primary_courses AS (
        -- Remove crosslisted courses
        SELECT DISTINCT ON (set_number) id, set_number FROM courses
      ),
      prereq_groups AS (
        SELECT course_requisite_sets.set_number AS prereq_set, STRING_AGG(primary_courses.id::text, ',') AS prereq_group FROM courses
        JOIN course_requisites ON courses.set_number = course_requisites.course_set_number
        JOIN course_requisite_sets ON course_requisites.set_number = course_requisite_sets.set_number
        JOIN primary_courses ON course_requisite_sets.course_set_number = primary_courses.set_number
        WHERE courses.id = ${courseId}
        GROUP BY course_requisite_sets.set_number
      )
      SELECT ARRAY_AGG(prereq_group) AS prerequisites FROM prereq_groups
    `;

    const crosslisted = await sql<Pick<Courses, "id" | "prefix" | "number">[]>`
      SELECT id, prefix, number FROM courses
      WHERE set_number = (SELECT set_number FROM courses WHERE id = ${courseId}) AND id != ${courseId}
    `;

    const units = formatUnits(course.min_units, course.max_units);
    const terms = formatTerms(course.fall, course.winter, course.spring, course.summer);

    if (prerequisites[0].prerequisites === null) {
      return res.send({
        prefix: course.prefix,
        number: course.number,
        name: course.name,
        description: course.description,
        units: units,
        terms: terms,
        crosslisted: crosslisted,
        uscp: course.uscp,
        gwr: course.gwr,
        prereqs: [],
      });
    }

    const prereqs = prerequisites.map((group) => group.prerequisites.map((req) => req.split(",").map(Number)));

    return res.send({
      prefix: course.prefix,
      number: course.number,
      name: course.name,
      description: course.description,
      units: units,
      terms: terms,
      crosslisted: crosslisted,
      uscp: course.uscp,
      gwr: course.gwr,
      prereqs: prereqs,
    });
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
