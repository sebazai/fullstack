import React from 'react'
import PropTypes from 'prop-types'
import { importanceToggling } from './../reducers/noteReducer'
import Note from './Note'

class NoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  toggleImportance = (id) => () => {
    this.props.store.dispatch(
      importanceToggling(id)
    )
  }
  render() {
    const notesToShow = () => {
      const { notes, filter } = this.context.store.getState()
      if (filter === 'ALL') {
        return notes
      }

      return filter === 'IMPORTANT'
        ? notes.filter(note => note.important)
        : notes.filter(note => !note.important)
    }

    return (
      <ul>
        {notesToShow().map(note =>
          <Note
            key={note.id}
            note={note}
            handleClick={this.toggleImportance(note.id)}
          />
        )}
      </ul>
    )
  }
}

NoteList.contextTypes = {
  store: PropTypes.object
}

export default NoteList