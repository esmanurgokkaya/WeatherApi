import express from "express";
import AlertController from "../controllers/alert.controller.js";
const router = express.Router();

router.get("/", AlertController.getUserAlerts);
router.post("/custom", AlertController.createCustomAlert);
router.get("/severe", AlertController.getSevereAlerts);

export default router;