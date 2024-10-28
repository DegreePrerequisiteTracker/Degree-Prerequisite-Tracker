import express from "express";

const router = express.Router();
export default router;

router.get("/plans", (req, res) => {
  res.send({
    planId: 1,
    programId: 4505,
    programType: "MS",
    concentrationId: 3,
  });
});

router.post("/plans", (req, res) => {
  res.send({
    planId: 5,
  });
});

router.get("/plans/:planId", (req, res) => {
  res.send({
    programId: 3,
    programType: "MS",
    concentrationId: 7,
  });
});

router.put("/plans/:planId", (req, res) => {
  res.send();
});

router.delete("/plans/:planId", (req, res) => {
  res.send();
});

router.get("/plans/:planId/courses", (req, res) => {
  res.send({
    courseName: "string",
    courseNumber: 4056,
    units: 4,
    crosslisted: 53,
    prerequisites: [
      {
        needed: 3,
        "courses:": [12, 52, 236],
      },
    ],
    offered: ["F", "W", "SP", "SU"],
    description: "course description",
  });
});
