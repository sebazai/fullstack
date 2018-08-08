import React from 'react'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {addNotification, removeNotification} from '../reducers/notificationReducer'
import Filter from './Filter'


class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    //console.log(this)
    //console.log(anecdote.target)
    //console.log(anecdote.target.value)
    this.props.store.dispatch(voteAnecdote(anecdote.target.value))
    const anecdoteFirst = this.props.store.getState().anecdotes
    console.log(anecdoteFirst[0])
    const anecdoteContent = anecdoteFirst[0].content
    this.props.store.dispatch(addNotification(`you voted '${anecdoteContent}'`))
    setTimeout(() => {
      this.props.store.dispatch(removeNotification())
      }, 5000)
    }
  render() {

    const anecdotesToShow = () => {
      const { anecdotes, filter } = this.props.store.getState()
      //console.log(filter)
      //console.log(anecdotes)
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    }
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotesToShow().sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button value={anecdote.id} onClick={this.handleVote.bind(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
