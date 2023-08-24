import { Router } from "express";
import userController from "./user.controller";

const router: Router = Router();

router.post("/users/add-user", userController.registerUserHandler);
router.get("/users/get-users", userController.getUsersHandler);

export default router;