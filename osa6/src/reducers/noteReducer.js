const noteReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'NEW_NOTE':
    return [...state, action.data]
  case 'INIT_NOTES':
    return action.data
  case 'TOGGLE_IMPORTANCE': {
    const id = action.data.id
    const noteToChange = state.find(n => n.id === id)
    const changedNote = { ...noteToChange, important: !noteToChange.important }
    return state.map(note => note.id !== id ? note : changedNote )
  }
  default:
    return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const noteCreation = (data) => {
  return {
    type: 'NEW_NOTE',
    data
  }
}

export const noteInitialization = (data) => {
  return {
    type: 'INIT_NOTES',
    data
  }
}

export const importanceToggling = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer