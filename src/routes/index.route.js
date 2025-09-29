import Router from "express";
import AuthRoutes from "./auth.route.js";
import UserRoutes from "./user.route.js";

const router = Router();
// auth routes
router.use("/auth", AuthRoutes);
router.use("/profile", UserRoutes);

export default router;
