import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
    const text = e.target.anecdote.value
    this.props.createAnecdote(text)
    e.target.anecdote.value = ''
    const add = `You added an anecdote '${text}'`
    this.props.addNotification(add)
    setTimeout(() => {
      this.props.removeNotification()
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { createAnecdote, addNotification, removeNotification }
)(AnecdoteForm)

