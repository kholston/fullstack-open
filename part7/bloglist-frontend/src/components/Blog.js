import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, showRemoveButton }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const deleteBlog = (blogToRemove) => {
    const message = `Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`
    if(window.confirm(message)){
      dispatch(removeBlog(blogToRemove.id))
    }
  }

  const addLike = (blog) => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(likeBlog(blog.id, changedBlog))
  }

  return(
    <div style={blogStyle} className="blogDiv">
      <div className='blogTitle'>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div style={showWhenVisible} className="blogInfo">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={() => addLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {showRemoveButton && <button onClick={() => deleteBlog(blog)}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  showRemoveButton: PropTypes.bool.isRequired
}

export default Blog