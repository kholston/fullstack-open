import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

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
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}


export default Blog