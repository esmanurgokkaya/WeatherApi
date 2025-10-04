import weatherController from "../controllers/weather.controller.js";
import express from "express";
const router = express.Router();

router.get("/current", weatherController.current);
router.get("/daily", weatherController.daily);
router.get("/hourly", weatherController.hourly);


export default router;