import { Router } from "express";
import userController from "./user.controller";

const router: Router = Router();

router.post("/addUser", userController.registerUserHandler);

export default router;