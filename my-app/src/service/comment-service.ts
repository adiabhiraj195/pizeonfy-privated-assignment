import API from "./api";

const CommentService = {
    getComments: (accessToken: string, postId: string) => {
        // const userDetail = JSON.stringify(payload);
        return API.get(`/comment/${postId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    },

    create: (accessToken: string, payload: {
        userName: string,
        body: string,
        postId: string
    }) => {
        return API.post("/comment", payload, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    },

    createReply: (accessToken: string, parentCommentId: string, payload: {
        userName: string,
        body: string,
        postId: string,

    }) => {
        return API.post(`/comment/${parentCommentId}`, payload, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    }
}

export default CommentService;