import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: this.props.blog.likes
    }
  }

likeBlog = async ({blog}) => {
  //console.log(blog)
  const newObject = {
    user: blog.user._id,
    likes: this.state.likes+1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  //console.log(newObject)

  const put = await blogService.update(blog._id, newObject)
  this.setState({likes: put.likes})
  //console.log(put)
}
render() {
  //console.log(this.props.blog)
  const blog = this.props.blog
  const user = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
  //console.log(user)
  return(
    
    <div className="wrapper">
      {blog.url}<br />
      {this.state.likes} likes <button onClick={e => this.likeBlog({blog})}>like</button><br />
      Added by {blog.author}<br />
      
      {user.username === blog.user.username ? <button onClick={e => this.props.deleteBlog(blog)}>delete</button> : ''}
    </div>  

  )
}
}

export default Blog