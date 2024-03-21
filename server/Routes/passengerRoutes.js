import express from "express";
import { passengerRoleCheckMiddleware } from "../Middleware/passengerRoleCheckMiddleware.js";
import { profileData, search, history, deleteRide } from "../Controllers/passengerController.js";

const router = express.Router();

router.get("/profiledata", passengerRoleCheckMiddleware, profileData);
router.post("/search", passengerRoleCheckMiddleware, search);
router.get("/history", passengerRoleCheckMiddleware, history);
router.get("/deleteride", passengerRoleCheckMiddleware, deleteRide);


export default router;
