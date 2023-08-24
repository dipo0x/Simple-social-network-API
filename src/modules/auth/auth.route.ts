import { Router } from "express";
import authController from "./auth.controller";

const router: Router = Router();

router.post("/auth/add-user", authController.registerUserHandler);
router.post("/auth/login/", authController.loginUserHandler);

export default router;