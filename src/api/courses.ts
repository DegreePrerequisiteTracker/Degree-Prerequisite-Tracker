import express from "express";

const router = express.Router();
export default router;

router.get("/courses/:courseId", (req, res) => {
  res.send({
    coursePrefix: "CSC",
    courseNumber: 365,
    name: "Introduction to Database Systems",
    units: 4,
    crosslisted: null,
    prerequisites: [
      {
        needed: 1,
        courses: [20891, 21892, [11223, 12381, 12389], [231123, 88312, 192834]], // the course id(s) in DB
      },
    ],
    offered: ["F", "W", "SP"],
    description:
      "Basic principles of database management systems (DBMS) and of DBMS application development. DBMS objectives, systems architecture, database models with emphasis on Entity-Relationship and Relational models, data definition and manipulation languages, the Structured Query Language (SQL), database design, application development tools. Course may be offered in classroom-based or online format. 3 lectures, 1 laboratory.",
  });
});
