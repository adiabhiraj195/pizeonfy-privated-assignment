import express from "express";
import authRouter from "./auth.router";
import postRouter from "./post.router";
import commentRouter from "./comment.route";

const Router = express.Router();

Router.use("/auth", authRouter);
Router.use("/post", postRouter);
Router.use("/comment", commentRouter)
export default Router;