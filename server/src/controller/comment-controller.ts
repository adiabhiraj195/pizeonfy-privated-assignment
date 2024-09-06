import { Response, Request } from "express";
import { validationResult } from "express-validator";
import postService from "../services/post-service";
import commentService from "../services/comment-service";

class CommentController {

    create = async (req: Request, res: Response) => {
        try {
            const err = validationResult(req);
            if (!(err.isEmpty())) {
                console.log(err);
                return res.status(400).json(err);
            }

            const { userName, body, postId } = req.body;

            await commentService.create(postId, userName, body)
            console.log("Comment Created");

            return res.status(200).json({
                msg: "comment created"
            });
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                msg: "somthing goes wrong"
            });
        }
    }

    getCommentsOfPost = async (req: Request, res: Response) => {

        try {
            const err = validationResult(req);
            if (!(err.isEmpty())) {
                console.log(err);
                return res.status(400).json(err);
            }
            const { postId } = req.params;
            console.log(postId)
            const comments = await commentService.commentsOfPost(postId);

            return res.status(200).json({
                data: comments
            });

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                msg: "somthing goes wrong"
            });
        }
    }
    createReplyComment = async (req: Request, res: Response) => {

        try {
            const err = validationResult(req);
            if (!(err.isEmpty())) {
                console.log(err);
                return res.status(400).json(err);
            }
            const { parentCommentId } = req.params;
            const { userName, body, postId } = req.body;

            console.log(parentCommentId)
            await commentService.create(postId, userName, body, parentCommentId,);
            
            const comment = await commentService.getCommentById(parentCommentId)
            if(!comment){
                return res.status(404).json({
                    msg: "comment not found try again"
                });
            }

            comment.hasReply = true;
            await comment.save();
            
            return res.status(200).json({
                msg: "reply created"
            });

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                msg: "somthing goes wrong"
            });
        }
    }


}

const commentController = new CommentController();
export default commentController;