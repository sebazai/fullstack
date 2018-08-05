import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecReducer from './reducer'

const store = createStore(anecReducer)

ReactDOM.render(
  <Provider store={createStore(anecReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
)