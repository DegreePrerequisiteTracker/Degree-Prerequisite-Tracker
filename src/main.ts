import express from "express";
import { createRoutes } from "./routes.js";

export const app = express();

app.use(express.json());

createRoutes(app);

// Start server
const port = process.argv[2];
app.listen(port, () => {
  console.log(`Degree Prerequisite Tracker is now running on port ${port}!`);
});
