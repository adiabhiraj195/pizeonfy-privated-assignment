import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import postController from "../controller/post-controller";

const postRouter = Router();

postRouter.post("/", authenticate, postController.createPost);
postRouter.get("/", postController.getAllPost)


export default postRouter;