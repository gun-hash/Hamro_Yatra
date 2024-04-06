import express from "express";
import adminRoleCheck from "../Middleware/adminRoleCheckMiddleware.js";
import {
  profileData,
  viewRides,
  viewUsers,
  deleteUser,
  suspendUser,
} from "../Controllers/adminController.js";
const router = express.Router();

router.get("/profiledata", adminRoleCheck, profileData);
router.get("/view-rides", adminRoleCheck, viewRides);
router.get("/view-users", adminRoleCheck, viewUsers);
router.post("/delete-user", adminRoleCheck, deleteUser);
router.post("/suspend-user", adminRoleCheck, suspendUser);

export default router;
