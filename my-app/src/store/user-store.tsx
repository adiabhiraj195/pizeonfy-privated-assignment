import { createContext, useState, Dispatch, SetStateAction } from "react";

interface UserStoreInterface {
    userId: number | null;
    setUserId: Dispatch<SetStateAction<number | null>>;
    userName: string | null;
    setuserName: Dispatch<SetStateAction<string | null>>;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    errors: Array<string>;
    setErrors: Dispatch<SetStateAction<Array<string>>>;
}

const defaultValues = {
    userName: null,
    setuserName: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    loading: false,
    setLoading: () => { },
    errors: [],
    setErrors: () => { },
    userId: null,
    setUserId: () => { },
   
}

export const UserStore = createContext<UserStoreInterface>(defaultValues);

interface UserProviderInterface {
    children: JSX.Element;
}

export const UserProvider = ({ children }: UserProviderInterface) => {
    const [userName, setuserName] = useState<string | null>(defaultValues.userName);
   
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        defaultValues.isAuthenticated
    );
    const [loading, setLoading] = useState<boolean>(defaultValues.loading);
  
    const [errors, setErrors] = useState<Array<string>>(defaultValues.errors);
    const [userId, setUserId] = useState<number | null>(defaultValues.userId);

    return (
        <UserStore.Provider
            value={{
                userName,
                setuserName,
                isAuthenticated,
                setIsAuthenticated,
                loading,
                setLoading,
                errors,
                setErrors,
                userId,
                setUserId,
            }}
        >
            {children}
        </UserStore.Provider>

    )
}   