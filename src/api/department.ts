import express from "express";

const router = express.Router();
export default router;

router.get("/department", (req, res) => {
  res.send([
    {
    "name": "Computer Science",
    "department_id" : "CSC",
    },
    {
      "name": "Computer Engineering",
      "department_id" : "CPE",
    },
  ]);
});

router.get("/department/:department_id", (req, res) => {
  res.send({
    "name": "Computer Science",
    "department_id": "CSC",
  });
});

router.get("/department/:department_id/programs", (req, res) => {
  res.send([
    {
      "program_id": 1,
      "name": "Computer Science",
      "program_types": ["BS", "MS", "Minor"],
    },
  ]);
});

router.get("/department/:department_id/course", (req, res) => {
  res.send([
    {
      "course_id": 1,
      "course_name": "Fundamentals of Computer Science",
      "course_number": 101,
    },
    {
      "course_id": 2,
      "course_name": "Data Structures",
      "course_number": 202,
    },
  ]);
});
