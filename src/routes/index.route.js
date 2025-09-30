import Router from "express";
import AuthRoutes from "./auth.route.js";
import UserRoutes from "./user.route.js";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.resolve(process.cwd(), 'docs', 'swagger.yaml'));

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use("/auth", AuthRoutes);
router.use("/profile", UserRoutes);

export default router;
