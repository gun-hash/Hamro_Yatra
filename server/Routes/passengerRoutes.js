import express from "express";
import { passengerRoleCheckMiddleware } from "../Middleware/passengerRoleCheckMiddleware.js";
import { profileData, search, history } from "../Controllers/passengerController.js";

const router = express.Router();


router.get("/", (re,res)=> console.log("hello"))

router.get("/profiledata", passengerRoleCheckMiddleware, profileData);
router.post("/search", passengerRoleCheckMiddleware, search);
router.post("/history", passengerRoleCheckMiddleware, history);


export default router;
