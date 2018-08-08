const initalState = [
  { content: 'reduxin storen toiminnan määrittelee reduceri', important: true, id: 1 },
  { content: 'storen tilassa voi olla mielivaltaista dataa', important: false, id: 2 }
]

const noteReducer = (state = initalState, action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'NEW_NOTE':
    return [...state, action.data]
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

export const noteCreation = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const importanceToggling = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer