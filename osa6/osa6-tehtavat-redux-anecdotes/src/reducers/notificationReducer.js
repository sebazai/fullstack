export const addNotification = (text) => {
  return {
    type: 'SET_NOTIFICATION',
    text
  }
}

export const removeNotification = () => {
  const text = ''
  return {
    type: 'SET_NOTIFICATION',
    text
  }
}


const notificationReducer = (state = 'This is the notification box', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.text
  default:
    return state
  }
  //console.log(state)
}

export default notificationReducer