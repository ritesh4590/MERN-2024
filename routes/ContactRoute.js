import express from "express";
const router = express.Router();
import { contactForm } from "../controllers/ContactController.js";

router.route("/contact").post(contactForm);

export default router;
