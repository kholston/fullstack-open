import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.create(blogObject)
      dispatch({
        type:'NEW_BLOG',
        data: createdBlog
      })
      const message = `a new blog '${createdBlog.title}' by ${createdBlog.author} was added.`
      dispatch(createNotification(message, 'success'))
    } catch (error) {
      dispatch(createNotification('blog creation failed, please try again', 'danger'))
    }
  }
}

export const removeBlog = (blogId) => {
  return async dispatch => {
    try {
      await blogService.remove(blogId)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blogId
      })
      dispatch(createNotification('blog deleted successfully', 'success'))
    } catch (error) {
      dispatch(createNotification('blog deletion failed', 'danger'))
    }
  }
}

export const updateBlog = (id, changedBlog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(id, changedBlog)
      dispatch({
        type:'UPDATE_BLOG',
        data: updatedBlog
      })
      dispatch(createNotification(`Blog ${updatedBlog.title} successfully updated`, 'success'))
    } catch (error) {
      dispatch(createNotification('failed to update blog', 'danger'))
    }
  }
}

export const likeBlog = (id, changedBlog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(id, changedBlog)
      dispatch({
        type:'UPDATE_BLOG',
        data: updatedBlog
      })
      dispatch(createNotification(`Liked ${updatedBlog.title}`, 'success'))
    } catch (error) {
      dispatch(createNotification('failed to like blog', 'danger'))
    }
  }
}

export const addComment = (blog, comment) => {
  const changedBlog = {
    ...blog,
    comments: blog.comments.concat(comment)
  }
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addComment(blog.id, changedBlog)
      dispatch({
        type: 'ADD_COMMENT',
        data : updatedBlog
      })
    } catch (error) {
      dispatch(createNotification('failed to add comment', 'danger'))
    }
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'UPDATE_BLOG':
  case 'ADD_COMMENT':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data )
  default:
    return state
  }
}

export default blogReducer
