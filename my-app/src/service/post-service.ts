import API from "./api";

const PostService = {
    getAllPosts : (accessToken:string) =>{
        // const userDetail = JSON.stringify(payload);
        return API.get("/post",{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    },

    create :(accessToken: string,payload:{
        userName: string,
        body: string
    }) =>{
        return API.post("/post", payload,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    }
}

export default PostService;