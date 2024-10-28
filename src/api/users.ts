import express from "express";

const router = express.Router();
export default router;

router.post("/users", (req, res) => {
  res.send({
    userId: 5,
  });
});

router.get("/users/history", (req, res) => {
  res.send({
    completedCourses: [12, 52, 236],
  });
});

router.put("/users/history/:courseId", (req, res) => {
  res.send();
});

router.delete("/users/history/:courseId", (req, res) => {
  res.send();
});
