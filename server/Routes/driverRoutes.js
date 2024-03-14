import express from "express";
import { driverRoleCheckMiddleware } from "../Middleware/driverRoleCheckMiddleware.js";
import { test } from "../Controllers/driverController.js";
const router = express.Router();

router.get("/all", driverRoleCheckMiddleware,test);

export default router;
