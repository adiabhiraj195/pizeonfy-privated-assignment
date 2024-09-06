import React from 'react'
import { FaRegComment, FaRegHeart } from "react-icons/fa";

export default function Post({
    author,
    body
}: {
    author: string
    body: string
}) {
    return (
        <div className='border-y border-gray-600 rounded-xl px-5 py-3 mb-10 w-full'>
            <h3 className='text-xl '>@{author}</h3>
            <p className='text-sm dark:text-gray-400 mt-2'>{body}</p>
            <div className='flex w-full px-10 py-2 items-center justify-around'>
 
                    <FaRegComment href='#' className='cursor-pointer hover:text-blue-700'/>

                
                    <FaRegHeart className='cursor-pointer hover:text-red-700' />
            </div>
        </div>
    )
}
