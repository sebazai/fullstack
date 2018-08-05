import React from 'react'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content}<br />
      has {anecdote.votes} votes <button onClick={handleClick}>vote</button>
    </li>
  )
}

export default Anecdote