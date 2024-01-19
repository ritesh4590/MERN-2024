import express, { Router } from "express";
const router = express.Router();
// Controller
import { register, login, user } from "../controllers/AuthController.js";

import registerSchema from "../validators/AuthValidator.js";
import { authValidator, authMiddleware } from "../middleware/AuthMiddleware.js";

router.route("/register").post(authValidator(registerSchema), register);
router.route("/login").post(login);
router.route("/user").get(authMiddleware, user);

export default router;
