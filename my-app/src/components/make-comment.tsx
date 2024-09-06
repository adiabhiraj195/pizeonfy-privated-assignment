import React, { useState } from 'react'
import Button from './button';
import usePost from '../hooks/usePost';

export default function MakeComment({ postId }: { postId: string }) {
    const [comment, setComment] = useState("");
    const { createComment } = usePost();
    return (
        <div className='flex items-center justify-between mb-5'>
            <input
                id="password"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-3 block w-full px-5 py-3 bg-transparent text-white border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="what do you think"
                required
            />
            <Button
                label={'Post'}
                onClick={async function () {
                    if (comment === "") return

                    await createComment(comment, postId);
                    setComment('')
                }} />
        </div>
    )
}
