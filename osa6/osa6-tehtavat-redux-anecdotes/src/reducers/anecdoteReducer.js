import anecDoteService from '../services/anecdotes'

export const createAnecdote=(data) => {
  return async (dispatch) => {
    const newAnecdote = await anecDoteService.createNew(data)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (data) => {
  return async (dispatch) => {
    const votedAnecdote = await anecDoteService.update(data.id, data)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecDoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
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