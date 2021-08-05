export const createNotification = (content, notificationType) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: {
        content,
        notificationType
      }
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const clearNotification = () => {
  return{
    type: 'CLEAR_NOTIFICATION',
    data: null
  }
}

const notificationReducer = (state = null, action) => {
  switch(action.type){
  case 'CREATE_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export default notificationReducer