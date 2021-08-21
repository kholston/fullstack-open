import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, addComment } from '../reducers/blogReducer'

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const blog = useSelector(state =>
    state.blogs &&
    state.blogs.find(blog => blog.id === id))

  // const deleteBlog = (blogToRemove) => {
  //   const message = `Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`
  //   if(window.confirm(message)){
  //     dispatch(removeBlog(blogToRemove.id))
  //   }
  // }

  if(!blog){
    return null
  }

  const addLike = (blog) => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(likeBlog(blog.id, changedBlog))
  }

  const submitComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }


  return(
    blog &&
    <div className="blogDiv">
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => addLike(blog)}>like</button>
      </div>
      added by {blog.user.name}
      <h3>comments</h3>
      <form onSubmit={submitComment}>
        <input type="text" value={comment} onChange={handleCommentChange}/>
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}


export default Blog