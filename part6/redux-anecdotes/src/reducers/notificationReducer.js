const notificationAtTheStart = null

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: content
    })
    setTimeout(()=>{
      dispatch(removeNotification())
    }, (time * 1000))
  }
}

export const removeNotification = () => {
  return{
    type: 'REMOVE_NOTIFICATION',
    data: null
  }
}

const initialState = notificationAtTheStart

const notificationReducer = (state = initialState, action) => {
  switch(action.type){
    case 'NEW_NOTIFICATION':
    case 'REMOVE_NOTIFICATION':
      return action.data
    default: 
      return state
  }
}

export default notificationReducer