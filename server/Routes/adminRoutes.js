import express from "express";
import adminRoleCheck  from "../Middleware/adminRoleCheckMiddleware.js";
import { test} from "../Controllers/adminController.js";
const router = express.Router();

router.get("/all", adminRoleCheck,test);

export default router;
