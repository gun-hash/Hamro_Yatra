import express from "express";
import { registerUser, loginUser, verifyEmail } from "../Controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", verifyEmail);

export default router;
