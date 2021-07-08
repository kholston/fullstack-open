import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const listStyle = {
  listStyle: 'none',
  padding: 0
}

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    const message = `you voted for '${anecdote.content}'`
    console.log(message)
    dispatch(setNotification(message))
    setTimeout(()=>{
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <ul style={listStyle}>
      {anecdotes.sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote} 
            handleClick={() => vote(anecdote)}
          />
      )}
    </ul>
  )
}

export default AnecdoteList