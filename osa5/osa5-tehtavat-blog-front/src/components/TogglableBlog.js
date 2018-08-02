import React from 'react'

class TogglableBlog extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false,
      }
    }

  
    toggleVisibility = () => {
      this.setState({visible: !this.state.visible})
    }
  
    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }
      
      const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
  
      return (
        <div style={blogStyle} className="togglableBlogTitle">
          <div style={hideWhenVisible}>
            <div className="clickable" onClick={this.toggleVisibility}>{this.props.buttonLabel}</div>
          </div>
          <div style={showWhenVisible}>
            <div className="clickable" onClick={this.toggleVisibility}>{this.props.buttonLabel}</div>
            {this.props.children}
          </div>
        </div>
      )
    }
  }

  export default TogglableBlog