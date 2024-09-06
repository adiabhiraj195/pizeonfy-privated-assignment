import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    id: {
        type: String, unique: true, require: true
    },
    userName: {
        type: String,
    },
    salt: {
        type: String
    },
    password: {
        type: String, require: true,
    },
    // posts: [{
    //     postId: {
    //         type: String
    //     }
    // }],
    // comments: [{
    //     commentsId: {
    //         type: String
    //     }
    // }]
});

const User = model("User", UserSchema);

export default User;