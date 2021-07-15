import anecdoteService from "../services/anecdotes"

export const addVote = (anecdote) => {
  return async dispatch => {
    const id = anecdote.id
    const anecdoteObject = {...anecdote, votes: anecdote.votes + 1}
    const updatedNote = await anecdoteService.update(id,anecdoteObject)
    dispatch({
      type: 'VOTE',
      data: updatedNote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE' :
      return [...state, action.data]
    case 'VOTE':{
      return state.map(anecdote => 
        anecdote.id !== action.data.id ? anecdote : action.data  
      )
    }
    default:
      return state
  }

  
}

export default anecdoteReducer