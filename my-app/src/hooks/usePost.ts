import { UserStore } from "../store/user-store";
import { useContext } from "react";
import useToast from "./useToast";
import PostService from "../service/post-service";
import { PostStore } from "../store/post-store";
import CommentService from "../service/comment-service";
import { CommentStore } from "../store/comment-store";

const usePost = () => {
    const { toastSuccess } = useToast();
    const accessToken = localStorage.getItem("Token");

    const { userName } = useContext(UserStore);
    const { posts, setPosts } = useContext(PostStore);
    const { comments, setComments } = useContext(CommentStore);

    const getAllPosts = async () => {
        const responce = await PostService.getAllPosts(accessToken as string);

        setPosts(responce.data.data);

        // console.log(responce.data.data);
    }
    // console.log(posts)

    const createPost = async (body: string) => {
        if (userName == null) return

        try {
            await PostService.create(accessToken as string, { userName, body });
            await getAllPosts()
        } catch (error) {
            console.log(error)
        }
    }

    const createComment = async (body: string, postId: string) => {
        if (userName == null) return
        try {
            await CommentService.create(accessToken as string, { userName, body, postId })
            await getCommentsOfPost(postId);

        } catch (error) {
            console.log(error)
        }
    }
    
    const getCommentsOfPost = async (postId: string) => {
        try {
            const responce = await CommentService.getComments(accessToken as string, postId)
            setComments(responce.data.data)
            // console.log(comments);
        } catch (error) {
            console.log(error)
        }
    }
    
    const createReplyComment = async (body: string, postId: string, parentCommentId: string) => {
        if (userName == null) return
        try {
            await CommentService.createReply(accessToken as string, parentCommentId, { userName, body, postId });
            await getCommentsOfPost(postId);
        } catch (error) {
            console.log(error)
        }
    }
    return {
        getAllPosts,
        createPost,
        createComment,
        getCommentsOfPost,
        comments,
        posts,
        createReplyComment
    }
}

export default usePost;
