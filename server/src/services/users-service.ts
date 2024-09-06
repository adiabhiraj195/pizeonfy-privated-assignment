// import sqlDb from "../db/sql";
import jwt from "jsonwebtoken";
import { genSalt, hash, compare } from "bcrypt";
import User from "../db/user.model";

class UserService {
    createUser = async (userName: string, password: string) => {
        const salt = await genSalt();
        const hashPassword = await hash(password, salt);

        const generatedID = this.generateUserId();

        await User.create({
            id: generatedID,
            userName,
            password: hashPassword,
            salt,
        });
    }

    generateUserId = (): String => {
        return "id" + Math.random().toString(16).slice(2);
    }

    findUser = async (userName: string) => {
        return await User.findOne({ userName });
    }

    checkPassword = async (inputPassword: string, password: string) => {
        return await compare(inputPassword, password);
    };

    loginResponse = async (user: any) => {
        // console.log(process.env.ACCESS_TOKEN_SECRET);
        return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET as string);
    }
}


const userService = new UserService();
export default userService;

// class UsersService {
//     createUser = async (fullName: string, email: string, password: string) => {
//         const salt = await genSalt();
//         const hashPassword = await hash(password, salt);
//         // const verificatioToken = jwt

//         await sqlDb.Users.create({
//             fullName,
//             email,
//             password: hashPassword
//         });

//         return;
//     }

//     findUserByEmail = async (email: string) => {
//         return await sqlDb.Users.findOne({ where: { email } });
//     };

//     checkPassword = async (inputPassword: string, password: string) => {
//         return await compare(inputPassword, password);
//     };

//     loginResponse = (email: string) => {
//         // console.log(process.env.ACCESS_TOKEN_SECRET);
//         return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET as string)
//     }
// }