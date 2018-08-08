export const createAnecdote=(data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const voteAnecdote = (data) => {
  return {
    type: 'VOTE',
    data
  }
}

export const anecdoteInit = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

const reducer = (store = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const oldStore = store.filter(a => a.id !==action.data.id)
      console.log('OLDSTORE ', oldStore)
      console.log('VOTED DATA ', action.data)
      return [...oldStore, action.data ]
    case 'CREATE':
      return [...store, action.data]
    case 'INIT_ANECDOTES':
      return action.data
  default:
    return store
  }
}

export default reducer