import React, { useState } from 'react';
import usePost from '../hooks/usePost';
import { useParams } from 'react-router-dom';

interface PopupFormProps {
    commentId: string;
    isOpen: boolean;
    onClose: () => void;
}

const ReplyPopupForm: React.FC<PopupFormProps> = ({commentId, isOpen, onClose }) => {
    const [comment, setComment] = useState<string>('');
    const { createReplyComment } = usePost();
    const {id} = useParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createReplyComment(comment, id as string, commentId);
        setComment("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md mx-auto shadow-lg">
                {/* <h2 className="text-2xl font-bold text-white mb-6">Reply</h2> */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <textarea
                            id="replyarea"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-2 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="reply it!"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Reply
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ReplyPopupForm;