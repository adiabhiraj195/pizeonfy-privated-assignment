import { Response, Request } from "express";
import { validationResult } from "express-validator";
import userService from "../services/users-service";


class AuthController {

    createUser = async (req: Request, res: Response) => {
        const err = validationResult(req);
        if (!(err.isEmpty())) {
            console.log(err);
            return res.status(400).json(err);
        }

        const { userName, password } = req.body;
        // check if user is already present in database 
        const user = await userService.findUser(userName );
        if(user){
            return res.status(400).json({
                msg: "User allready present"
            });
        }

        await userService.createUser(userName, password);
        console.log("Created");

        return res.status(200).json({
            msg:"created"
        });
    }
    
    login = async (req: Request, res: Response) => {
        const err = validationResult(req);
        if (!(err.isEmpty())) {
            return res.status(400).json(err);
        }

        const { userName, password } = req.body;

        const user = await userService.findUser(userName );

        if (!user) {
            return res.status(400).json({
                error: "User not found"
            });
        };
        // console.log(user);
        const checkPassword = await userService.checkPassword(password, user.password as string);

        if (!checkPassword) {
            return res.status(400).json({
                error: "Password is not correct"
            });
        };
        const authResponce = await userService.loginResponse(user);
        // console.log(authResponce + "This is auth response");
        return res.status(200).json({
            data: authResponce,
        });
    }
}

const authController = new AuthController();
export default authController;