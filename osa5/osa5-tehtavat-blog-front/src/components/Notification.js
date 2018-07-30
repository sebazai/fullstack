import React from 'react'

const Notification = ({ message, success }) => {
  if (message === null && success === null) {
    return null
  }
  if(message !== null) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  if(success !== null) {
    return (
      <div className="success">
        {success}
      </div>
    )
  }
  
}

export default Notification