import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Body from '../components/body'
import Post from '../components/post'
import usePost from '../hooks/usePost'
import PopupForm from '../components/add-post-form'

export default function Dashboard() {
    const {getAllPosts} = usePost()
    const [isOpen, setIsOpen]= useState(false);
    useEffect(()=>{
        getAllPosts();
    },[])
  return (
    <div className='h-full w-full px-20'>
        <Navbar handlePopup={()=>{setIsOpen(true)}}/>
        <PopupForm isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
        <Body/>
    </div>
  )
}
