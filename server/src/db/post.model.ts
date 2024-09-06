import { model, Schema } from "mongoose";

const PostSchema = new Schema({
    id: {
        type: String, unique: true, require: true
    },
    body: {
        type: String,
        require:true
    },
    author:{
        type: String,
        require: true
    },
    // commantId: [{
    //         id: {
    //         type: String
    //     }
    // }]
});

const Post = model("Post", PostSchema);

export default Post;