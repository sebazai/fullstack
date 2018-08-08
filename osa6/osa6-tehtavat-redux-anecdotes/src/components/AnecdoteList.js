import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'


class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    console.log(anecdote.target.value)
    //console.log(anecdote.target)
    //console.log(anecdote.target.value)
    this.props.voteAnecdote(anecdote.target.value)
    const allVisibleAnecdotes = this.props.anecdotesToShow
    //console.log(allAnecdotes)
    const votedAnecdote = allVisibleAnecdotes.filter(a => a.id === anecdote.target.value)
    console.log(votedAnecdote)
    this.props.addNotification(`you voted '${votedAnecdote[0].content}'`)
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
