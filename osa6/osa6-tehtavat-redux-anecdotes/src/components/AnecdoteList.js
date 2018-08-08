import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'


class AnecdoteList extends React.Component {
  handleVote = async (anecdote) => {
    const id = anecdote.target.value
    //console.log(anecdote.target.value)
    const anecdoteToChangeVote = this.props.anecdotesToShow.find(a => a.id === id)
    const changedAnecdote = { ...anecdoteToChangeVote, votes: anecdoteToChangeVote.votes+1 }
    const updated = await anecdoteService.update(id, changedAnecdote)
    //console.log('CHANGED ', changedAnecdote)
    //console.log('UPDATED', updated)
    this.props.voteAnecdote(updated)
    this.props.addNotification(`you voted '${updated.content}'`)
    setTimeout(() => {
      this.props.removeNotification()
    }, 5000)
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
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


const anecdotesToShow = (anecdotes,filter) => {
  //console.log(filter)
  //console.log(anecdotes)
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { voteAnecdote, addNotification, removeNotification }
)(AnecdoteList)
