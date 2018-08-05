const initialState = [
    {
      "id": 1,
      "content": 'If it hurts, do it more often',
      "votes": 23
    },
    {
      "id": 2,
      "content": 'Adding manpower to a late software project makes it later!',
      "votes": 3
    },
    {
      "id": 3,
      "content": 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      "votes": 12
    },
    {
      "content": 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      "votes": 45,
      "id": 4
    },
    {
      "content": 'Premature optimization is the root of all evil.',
      "votes": 1,
      "id": 5
    },
    {
      "content": 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      "votes": 3,
      "id": 6
    }
  ]

const anecReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteVoted = state.find(n => n.id === id)
      const changedAnecdote = { ...anecdoteVoted, votes: anecdoteVoted.votes + 1 }
      return state.map(a => a.id !== id ? a : changedAnecdote ).sort((a1, a2) => a1.votes < a2.votes)
    default:
      return state.sort((a1,a2) => a1.votes < a2.votes)
  }
}

export default anecReducer