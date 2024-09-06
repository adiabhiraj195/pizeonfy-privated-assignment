import Post from "../db/post.model";
import User from "../db/user.model";

class PostService {
    createPost = async (postId: String, author: string, body: string) => {

        return await Post.create({
            id: postId,
            body,
            author,
        });

        // const user = await User.findOne({author});

        // user?.posts.push({postId});

        // await user?.save();

    }

    generatePostId = (): String => {
        return "post" + Math.random().toString(16).slice(2);
    }

    getAllPost = async () => {
        return await Post.find();
    }

}


const postService = new PostService();
export default postService;
