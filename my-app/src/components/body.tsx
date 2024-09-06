import { useEffect, useContext } from 'react'
import Post from './post'
import usePost from '../hooks/usePost'
import { PostStore } from '../store/post-store';
import { Link } from 'react-router-dom';

export default function Body() {
    const { getAllPosts } = usePost();
    const { posts } = useContext(PostStore)
    useEffect(() => {
        getAllPosts();

    }, [])
    return (
        <div className='px-20 w-full border-x border-gray-600 '>
            <h1 className='items-center text-2xl font-bold my-4'>POSTS</h1>
            {
                posts.map((post) => {
                    return (
                        <Link to={`/dashboard/${post.id}`} key={post.id}>
                            <Post author={post.author} body={post.body} />
                        </Link>
                    )
                })
            }
        </div>
    )
}
