import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import fs from "fs";
import { dirname } from "path";

const router = express.Router();
export default router;

const appDir = dirname(import.meta.filename);
const file = fs.readFileSync(`${appDir}/../../docs/apiSpec.yml`, "utf8");
const swaggerDocument = YAML.parse(file) as object;

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));
