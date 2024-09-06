import { UserStore } from "../store/user-store";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";

const useUser = () => {
    const navigate = useNavigate();
    const { toastSuccess } = useToast();

    const {

        setIsAuthenticated,
        setuserName,
        userName,

    } = useContext(UserStore);

    const login = async (accessToken: string, userName: string) => {
        localStorage.setItem('Token', accessToken);
        setuserName(userName);
        setIsAuthenticated(true);
        // console.log(userId, email);
        console.log(userName)
    }
    // setAccessToken(localAT);

    const logout = () => {
            localStorage.removeItem("Token");
            setuserName(null);
            setIsAuthenticated(false);
            navigate('/');
            toastSuccess('Logged out!'); 
    }

    return {
        login,
        logout
    }
}

export default useUser;
