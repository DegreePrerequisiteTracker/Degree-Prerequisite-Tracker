import express from "express";

const router = express.Router();
export default router;

router.get("/plan", (req, res) => {
  res.send({
    plan_id: 1,
    program_id: 4505,
    program_type: "MS",
    concentration_id: 3,
  });
});

router.post("/plan", (req, res) => {
  res.send({
    plan_id: 5,
  });
});

router.get("/plan/:plan_id", (req, res) => {
  res.send({
    program_id: 3,
    program_type: "MS",
    concentration_id: 7,
  });
});

router.put("/plan/:plan_id", (req, res) => {
  res.send();
});

router.delete("/plan/:plan_id", (req, res) => {
  res.send();
});

router.get("/plan/:plan_id", (req, res) => {
  res.send({
    name: "string",
    course_number: 4056,
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
