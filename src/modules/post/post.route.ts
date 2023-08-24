import { Router } from "express";
import postController from "./post.controller";
import authMiddleware from "../../middlewares/auth.middlware";

const router: Router = Router();

router.post("/post/create-post/", 
    authMiddleware.authenticateRequest, 
    postController.createPostHandler
);

export default router;