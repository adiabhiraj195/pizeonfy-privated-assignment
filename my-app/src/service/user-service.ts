import API from "./api";

const UserService = {
    register : (payload:{
        userName:string,
        password: string,
    }) =>{
        // const userDetail = JSON.stringify(payload);
        return API.post("/auth/create ", payload);
    },

    login :(payload:{
        userName: string,
        password: string
    }) =>{
        return API.post("/auth", payload);
    }
}

export default UserService;