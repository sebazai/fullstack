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
          <div className="content">
            <div style={hideWhenVisible} className="clickableDiv">
              <div className="clickThis" onClick={this.toggleVisibility}>{this.props.buttonLabel}</div>
            </div>
            <div style={showWhenVisible} className="clickableDiv2">
              <div onClick={this.toggleVisibility}>{this.props.buttonLabel}</div>
              {this.props.children}
            </div>
          </div>
        </div>
      )
    }
  }

  export default TogglableBlog