import express from "express";

const router = express.Router();
export default router;

router.get("/programs", (req, res) => {
  res.send([
    {
      programId: 1,
      name: "Computer Science",
      programTypes: ["BS", "MS", "Minor"],
    },
    {
      programId: 2,
      name: "Software Engineering",
      programTypes: ["BS"],
    },
  ]);
});

router.get("/programs/:programId", (req, res) => {
  res.send({
    programId: 1,
    name: "Computer Science",
    programTypes: ["BS", "MS", "Minor"],
  });
});

router.get("/programs/:programId/:programType", (req, res) => {
  res.send({
    name: "Computer Science",
    requirements: [1, 2, 3, 4],
  });
});

router.get("/programs/:programId/:programType/concentrations", (req, res) => {
  res.send([
    {
      concentrationId: 1,
      name: "Data Engineering",
    },
    {
      concentrationId: 2,
      name: "Artificial Intelligence and Machine Learning",
    },
  ]);
});

router.get("/programs/:programId/:programType/concentrations/:concentrationId", (req, res) => {
  res.send({
    name: "Data Engineering",
    requiredCourses: [1, 2, 3, 4],
  });
});
