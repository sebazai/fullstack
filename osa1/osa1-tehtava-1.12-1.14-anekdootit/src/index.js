import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: [0,0,0,0,0,0]
    }
  }

  randomAnekdootti = () => {
    return() => {
        const random = Math.floor(Math.random() * anecdotes.length)
        this.setState({ selected : random })
    }
  }

  anekdootinAanestys = () => {
    return() => {
      const kopio = [...this.state.pisteet]
      kopio[this.state.selected] += 1
      this.setState({pisteet : kopio})
    }
  }

  render() { 
    const BestAnecdote = () => {
        return(
          anecdotes[this.state.pisteet.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)]
        )
    }
    return (
      <div>
        {this.props.anecdotes[this.state.selected]} <br />
        has {this.state.pisteet[this.state.selected]} votes<br />
        <button onClick={this.anekdootinAanestys()}>
          vote
        </button>
        <button onClick={this.randomAnekdootti(this.props.anecdotes)}>
            next anecdote
        </button>
        <br />
        <h1>anecdote with most votes:</h1>
        <BestAnecdote /><br />
        has {Math.max(...this.state.pisteet)} votes
      </div>
    )
  }
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)