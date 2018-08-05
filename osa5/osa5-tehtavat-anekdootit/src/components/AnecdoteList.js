import React from 'react'
import PropTypes from 'prop-types'
import actionFor from '../actionCreator'
import Anecdote from './Anecdote'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
    
  voteAnecdote = (id) => (e) => {
    this.context.store.dispatch(
      actionFor.voteAnecdote(id)
    )
  }
  render() {
    return (
      <ul>
        {this.context.store.getState().map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={this.voteAnecdote(anecdote.id)}
          />
        )}
      </ul>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList