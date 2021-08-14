import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'


export const login = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'USER_LOGIN',
        data: user
      })
      dispatch(createNotification(`Welcome ${user.username}`, 'success'))
    } catch (error) {
      dispatch(createNotification('wrong username or password', 'error'))
    }
  }
}

export const setUser = (userData) => {
  return async dispatch => {
    dispatch({
      type: 'STORE_USER',
      data: userData
    })
    blogService.setToken(userData.token)
  }
}

export const  logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch({
      type: 'CLEAR_USER',
      data: null
    })
    blogService.setToken(null)
    dispatch(createNotification('successfully logged out', 'success'))
  }
}


const userReducer = (state = null, action) => {
  switch(action.type){
  case 'USER_LOGIN':
  case 'STORE_USER':
  case 'CLEAR_USER':
    return action.data
  default:
    return state
  }
}

export default userReducer