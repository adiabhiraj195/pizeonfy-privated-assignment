import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import commentController from "../controller/comment-controller";

const commentRouter = Router();

commentRouter.post("/", authenticate, commentController.create);
// commentRouter.get("/:postId", ()=>console.log("yes reached there"));
commentRouter.get("/:postId", authenticate, commentController.getCommentsOfPost);
commentRouter.post("/:parentCommentId", authenticate, commentController.createReplyComment);

// "/" `post` create commnet on post

export default commentRouter