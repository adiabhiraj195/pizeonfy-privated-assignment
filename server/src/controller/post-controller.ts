import { Response, Request } from "express";
import { validationResult } from "express-validator";
import postService from "../services/post-service";

class PostController {

    createPost = async (req: Request, res: Response) => {
        try {
            const err = validationResult(req);
            if (!(err.isEmpty())) {
                console.log(err);
                return res.status(400).json(err);
            }

            const { userName, body } = req.body;
            // check if user is already present in database 
            const postId = postService.generatePostId();
            await postService.createPost(postId, userName, body)
            console.log("Post Created");

            return res.status(200).json({
                msg: "created"
            });
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                msg: "somthing goes wrong"
            });
        }
    }

    getAllPost = async (req: Request, res: Response) => {
    
        try {
            const err = validationResult(req);
            if (!(err.isEmpty())) {
                console.log(err);
                return res.status(400).json(err);
            }
            const posts = await postService.getAllPost();

            return res.status(200).json({
                data: posts
            });

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                msg: "somthing goes wrong"
            });
        }
    }


}

const postController = new PostController();
export default postController;