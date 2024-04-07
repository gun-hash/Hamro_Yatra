import express from "express";
import { driverRoleCheckMiddleware } from "../Middleware/driverRoleCheckMiddleware.js";
import { profileData, setDefaultRide, matchData, matchRide, rideHistory, deleteDefaultRide, deleteMatch, completeRide, registerVehicle } from "../Controllers/driverController.js";
const router = express.Router();

router.post("/setdefaultride", driverRoleCheckMiddleware, setDefaultRide);
router.get("/profiledata", driverRoleCheckMiddleware, profileData);
router.get("/searchmatch", driverRoleCheckMiddleware, matchData);
router.get("/deletematch", driverRoleCheckMiddleware, deleteMatch);
router.get("/completeride", driverRoleCheckMiddleware, completeRide);
router.get("/matchride", driverRoleCheckMiddleware, matchRide);
router.get("/history", driverRoleCheckMiddleware, rideHistory);
router.get("/deletedefaultride", driverRoleCheckMiddleware, deleteDefaultRide);
router.post("/registervehicle", driverRoleCheckMiddleware, registerVehicle);

export default router;
