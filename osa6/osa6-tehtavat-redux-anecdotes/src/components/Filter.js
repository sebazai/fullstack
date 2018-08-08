import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
      //console.log(event.target.value)
      this.props.filterChange(event.target.value)
    }
    render() {
      const style = {
        marginBottom: 10
      }

      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
}

export default connect(
  null,
  { filterChange }
)(Filter)