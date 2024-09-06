import Comment from "../db/comment.model";
import Post from "../db/post.model";
import User from "../db/user.model";

class CommentService {
    create = async (postId: String, author: string, body: string, parentCommentId?: String) => {
        const commentId = this.generateCommentId();
        return await Comment.create({
            id: commentId,
            body,
            author,
            postId,
            parentComment: parentCommentId,
            isReply: parentCommentId && true
        });

        // const user = await User.findOne({author});

        // user?.posts.push({postId});

        // await user?.save();

    }

    generateCommentId = (): String => {
        return "comment" + Math.random().toString(16).slice(2);
    }

    commentsOfPost = async (postId: String) => {
        return await Comment.find({ postId });
    }
    getCommentById = async(commentId: String)=>{
        return await Comment.findOne({id: commentId})
    }

}


const commentService = new CommentService();
export default commentService;
