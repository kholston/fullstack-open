const notificationAtTheStart = 'Welcome to Anecdotes'

export const setNotification = (content) => {
  return{
    type: 'NEW_NOTIFICATION',
    data: content
  }
}

export const removeNotification = () => {
  return{
    type: 'REMOVE_NOTIFICATION',
    data: 'Vote for an Anecdote or Create a new Anecdote'
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