import express from "express";
import { createRoutes } from "./routes.js";
import { afterMiddleware, beforeMiddleware } from "./middleware.js";

export const app = express();

beforeMiddleware(app);
createRoutes(app);
afterMiddleware(app);

// Start server
const port = process.argv[2];
app.listen(port, () => {
  console.log(`Degree Prerequisite Tracker is now running on port ${port}!`);
});
