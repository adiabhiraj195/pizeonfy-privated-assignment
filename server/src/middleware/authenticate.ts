import { NextFunction,Response,Request } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log(req+ "request");
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({msg: "token does not found"});
    // console.log(token)
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET?? "",
      (err: any, decoded: any ) => {
        // console.log(err)
        if (err) return res.status(403).json({msg: "error while decoding token"});
        try {
          const { userName } = decoded.user;
          // console.log(decoded.user);
        //   const { id, email, roles } = decoded;
          req.user = { userName };
        //   req.user = { id, email, roles };
          next();
        } catch (error) {
          console.log(error);
          return res.status(403).json({msg: "something went wrong"});
        }
      }
    );
  };

  export {authenticate}