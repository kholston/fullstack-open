let currentTimeoutID = null

export const setNotification = (content, time) => {
  if(currentTimeoutID !== null){
    clearTimeout(currentTimeoutID)
    currentTimeoutID = null
  }
  return async dispatch => { 
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: content
    })
    
    currentTimeoutID = setTimeout(()=>{
      dispatch(removeNotification())
      currentTimeoutID = null
   }, (time * 1000))

  }
}

export const removeNotification = () => {
  return{
    type: 'REMOVE_NOTIFICATION',
    data: null
  }
}


const notificationReducer = (state = null, action) => {
  switch(action.type){
    case 'NEW_NOTIFICATION':
    case 'REMOVE_NOTIFICATION':
      return action.data
    default: 
      return state
  }
}

export default notificationReducer