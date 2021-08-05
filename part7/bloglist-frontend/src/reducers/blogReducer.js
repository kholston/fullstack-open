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
  console.log('createBlog - blogObject', blogObject)
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
      dispatch(createNotification('blog creation failed, please try again', 'error'))
    }
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  default:
    return state
  }
}

export default blogReducer
