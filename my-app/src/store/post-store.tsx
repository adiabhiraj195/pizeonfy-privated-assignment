import { createContext, useState, Dispatch, SetStateAction } from "react";

interface PostInterface {
    id: string;
    body: string;
    author: string;

}

interface PostStoreInterface {
    posts: PostInterface[];
    setPosts: Dispatch<SetStateAction<PostInterface[]>>;
    
}

const defaultValues = {
    posts: [],
    setPosts: () => { },
   
}

export const PostStore = createContext<PostStoreInterface>(defaultValues);

interface PostProviderInterface {
    children: JSX.Element;
}

export const PostProvider = ({ children }: PostProviderInterface) => {
    const [posts, setPosts] = useState<PostInterface[]>(defaultValues.posts);
   

    return (
        <PostStore.Provider
            value={{
              posts,
              setPosts,
            }}
        >
            {children}
        </PostStore.Provider>

    )
}   