import express from "express";

const router = express.Router();
export default router;

router.post("/user", (req, res) => {
  res.send({
    user_id: 5,
  });
});

router.get("/user/history", (req, res) => {
  res.send({
    completed_courses: [12, 52, 236],
  });
});

router.put("/user/history/:courseId", (req, res) => {
  res.send();
});

router.delete("/user/history/:courseId", (req, res) => {
  res.send();
});
