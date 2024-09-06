import { model, Schema } from "mongoose";

const CommentSchema = new Schema({
    id: {
        type: String,
        unique: true,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    postId: {
        type: String,
        require: true
    },
    parentComment: {
        type: String,
    },
    isReply: {
        type: Boolean,
        default: false
    },
    hasReply: {
        type: Boolean,
        default: false
    }
});

const Comment = model("Comment", CommentSchema);

export default Comment;