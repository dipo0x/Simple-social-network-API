import { Router } from "express";
import postController from "./post.controller";
import authMiddleware from "../../middlewares/auth.middlware";

const router: Router = Router();

router.post("/posts/create-post/", 
    authMiddleware.authenticateRequest, 
    postController.createPostHandler
);

router.post("/posts/:postId/comments/", 
    authMiddleware.authenticateRequest, 
    postController.addCommentHandler
);

export default router;