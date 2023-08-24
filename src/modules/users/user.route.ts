import { Router } from "express";
import userController from "./user.controller";

const router: Router = Router();

router.get("/users/get-users", userController.getUsersHandler);

export default router;