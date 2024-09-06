import { createContext, useState, Dispatch, SetStateAction } from "react";

interface CommentInterface {
    id: string;
    body: string;
    author: string;
    postId: string;
    isReply: boolean;
    hasReply: boolean;
    commentId: string;

}

interface CommentStoreInterface {
    comments: CommentInterface[];
    setComments: Dispatch<SetStateAction<CommentInterface[]>>;

}

const defaultValues = {
    comments: [],
    setComments: () => { },

}

export const CommentStore = createContext<CommentStoreInterface>(defaultValues);

interface CommentProviderInterface {
    children: JSX.Element;
}

export const CommentProvider = ({ children }: CommentProviderInterface) => {
    const [comments, setComments] = useState<CommentInterface[]>(defaultValues.comments);


    return (
        <CommentStore.Provider
            value={{
                comments,
                setComments,
            }}
        >
            {children}
        </CommentStore.Provider>

    )
}   