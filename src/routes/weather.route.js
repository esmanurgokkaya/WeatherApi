import weatherController from "../controllers/weather.controller.js";
import exporess from "express";
const router = exporess.Router();

router.get("/current", weatherController.current);
router.get("/daily", weatherController.daily);
router.get("/hourly", weatherController.hourly);


export default router;