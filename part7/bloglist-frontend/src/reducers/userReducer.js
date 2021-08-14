import userService from '../services/users'

export const initializeUsers= () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type:'INIT_USERS',
      data: users
    })
  }
}

export const getUser = (id) => {
  return async dispatch => {
    dispatch({
      type: 'GET_USER',
      data: id
    })
  }
}

const userReducer = (state = null, action) => {
  switch(action.type){
  case 'INIT_USERS':
    return action.data
  case 'GET_USER':
    return state ? state.find(u => u.id === action.data) : null
  default:
    return state
  }

}

export default userReducer