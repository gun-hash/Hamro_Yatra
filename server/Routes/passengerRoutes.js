import express from "express";
import { passengerRoleCheckMiddleware } from "../Middleware/passengerRoleCheckMiddleware.js";
import { test } from "../Controllers/passengerController.js";
import User from "../Models/User.js";

const router = express.Router();

router.get("/all", passengerRoleCheckMiddleware, test);

export default router;
