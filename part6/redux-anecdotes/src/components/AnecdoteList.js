import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state)

  return (
    <ul style={listStyle}>
      {anecdotes.sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote} 
            handleClick={() => 
              dispatch(addVote(anecdote.id))
            }
          />
      )}
    </ul>
  )
}

export default AnecdoteList