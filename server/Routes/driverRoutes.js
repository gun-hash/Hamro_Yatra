import express from "express";
import { driverRoleCheckMiddleware } from "../Middleware/driverRoleCheckMiddleware.js";
import { profileData, setDefaultRide, matchData, matchRide, rideHistory } from "../Controllers/driverController.js";
const router = express.Router();

router.post("/setdefaultride", driverRoleCheckMiddleware,setDefaultRide);
router.get("/profiledata", driverRoleCheckMiddleware,profileData);
router.get("/searchmatch", driverRoleCheckMiddleware,matchData);
router.get("/matchride", driverRoleCheckMiddleware,matchRide);
router.get("/history", driverRoleCheckMiddleware,rideHistory);


export default router;
