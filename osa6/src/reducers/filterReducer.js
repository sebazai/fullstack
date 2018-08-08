const filterReducer = (state = 'ALL', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'SET_FILTER':
    return action.filter
  default:
    return state
  }
  //console.log(state)
}

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter: filter
  }
}

export default filterReducer