import {Router} from "express";
import authController from "../controller/auth-controller";

const authRouter = Router();

authRouter.post("/create", authController.createUser);
authRouter.post("/", authController.login);

export default authRouter;