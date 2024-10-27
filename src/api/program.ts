import express from "express";

const router = express.Router();
export default router;

router.get("/program", (req, res) => {
  res.send([
    {
      program_id: 1,
      name: "Computer Science",
      program_types: ["BS", "MS", "Minor"],
    },
    {
      program_id: 2,
      name: "Software Engineering",
      program_types: ["BS"],
    },
  ]);
});

router.get("/program/:program_id", (req, res) => {
  res.send({
    program_id: 1,
    name: "Computer Science",
    program_types: ["BS", "MS", "Minor"],
  });
});

router.get("/program/:program_id/:program_type", (req, res) => {
  res.send({
    name: "Computer Science",
    requirements: [1, 2, 3, 4],
  });
});

router.get("/program/:program_id/:program_type/concentration", (req, res) => {
  res.send([
    {
      concentration_id: 1,
      name: "Data Engineering",
    },
    {
      concentration_id: 2,
      name: "Artificial Intelligence and Machine Learning",
    },
  ]);
});

router.get("/program/:program_id/:program_type/concentration/:concentration_id", (req, res) => {
  res.send({
    name: "Data Engineering",
    required_courses: [1, 2, 3, 4],
  });
});
