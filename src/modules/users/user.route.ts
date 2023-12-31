import { Router } from "express";
import userController from "./user.controller";
import postController from "../post/post.controller";
import authMiddleware from "../../middlewares/auth.middlware";

const router: Router = Router();

router.get("/users/", userController.getUsersHandler);
router.get("/users/:id/posts/", 
    authMiddleware.authenticateRequest, 
    postController.getUserPosts
);
router.get("/users/top/3/posts/", 
    authMiddleware.authenticateRequest, 
    userController.getTopUser
);

export default router;