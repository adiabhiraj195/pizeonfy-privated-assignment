import React, { useState } from 'react'
import ReplyPopupForm from './reply-popup-form';

export default function Comment({
  id,
  author,
  body,
  hasReply,
  replyPopup
}: {
  id: string;
  author: string;
  body: string;
  hasReply?: boolean;
  replyPopup: () => void;
}) {
  const [isPopup, setIsPopup] = useState(false);
  return (
    <div className='px-5 py-3 border rounded-3xl bg-gray-900 flex justify-between items-center'>
      <div>
        <h3 className='mb-1'>@{author}</h3>
        <p>{body}</p>
        {/* //add popup for sub comment  */}
      </div>
      <button className='min-h-full bg-green-600 px-4 py-3 rounded-xl' onClick={() => setIsPopup((true))}>
        reply
      </button>
      <ReplyPopupForm
        commentId={id}
        isOpen={isPopup}
        onClose={() => setIsPopup(false)}
      />

    </div>
  )
}
