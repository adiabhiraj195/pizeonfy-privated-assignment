import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Post from '../components/post'
import { PostStore } from '../store/post-store'
import { useParams } from 'react-router-dom'
import MakeComment from '../components/make-comment'
import usePost from '../hooks/usePost'
import Comment from '../components/comment'
import PopupForm from '../components/add-post-form'
import ReplyPopupForm from '../components/reply-popup-form'

export default function PostPage() {

  const { posts } = useContext(PostStore)
  const { id } = useParams();
  const { getCommentsOfPost, comments } = usePost();
  const [isOpen, setIsOpen] = useState(false);
  console.log(comments[comments.length - 1].isReply, comments[comments.length - 1].hasReply, comments[comments.length - 1].body, "comments");

  const thispost = posts.filter((post) => {
    return post.id === id
  })

  const relpyComments = comments.filter((c) => {
    return c?.isReply === true;
  })
  console.log(relpyComments[relpyComments.length - 1].isReply, relpyComments[relpyComments.length - 1].hasReply, relpyComments[relpyComments.length - 1].body, "reply comments")


  useEffect(() => {
    getCommentsOfPost(id as string);
  }, [])
  
  return (
    <div className='px-20'>
      <Navbar />
      <Post author={thispost[0].author} body={thispost[0].body} />
      <MakeComment postId={id as string} />

      <hr />
      <div className='my-5'>

        {comments.map((comment) => {
          if (comment.hasReply=== true && comment.isReply === false) {
            return (
              <div className='border-y py-4 mb-1' key={comment.id}>
                {/* <p>A</p> */}
                <Comment
                  id={comment.id}
                  author={comment.author}
                  body={comment.body}
                  hasReply={true}
                  replyPopup={() => setIsOpen(true)}
                />

                {relpyComments.map((replycomment) => {
                  if (replycomment.commentId === comment.id) {

                    return (
                      <>
                        {/* <p>C</p> */}
                        <Comment
                          id={comment.id}
                          author={replycomment.author}
                          body={replycomment.body}
                          key={replycomment.id}
                          replyPopup={() => setIsOpen(true)}
                        />
                      </>
                    )
                  }
                })}
              </div>
            )
          } else if (!comment.isReply) {
            return (
              <div className='border-y py-4 mb-1' key={comment.id}>
                {/* <p>B</p> */}
                <Comment
                  id={comment.id}
                  author={comment.author}
                  body={comment.body}
                  hasReply={true}
                  replyPopup={() => setIsOpen(true)}
                />
              </div>

            )
          }
        })}
      </div>
    </div>
  )
}
