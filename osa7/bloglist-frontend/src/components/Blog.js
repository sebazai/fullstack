import React from 'react'
/*import blogService from '../services/blogs'*/

class Blog extends React.Component {
  /*constructor(props) {
    super()
    this.state = {
      comment: '',
      blogId: props.blog._id
    }
  }
  comment = () => async () => {
    const makeComment = {
      "comment": `${this.state.comment}`
    }
    const response = await blogService.comment(this.state.blogId, makeComment)
    console.log(response)
    /*this.notify(`you liked '${updated.title}' by ${updated.author}`)
    this.setState({
      blogs: this.state.blogs.map(b => b._id === id ? updated : b)
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    console.log(this.state.comment)
    console.log(this.state.blogId)
  }
  */
  render() {
    console.log(this.props)
    const { blog, like, deletable, remove } = this.props

    const adder = blog.user ? blog.user.name : 'anonymous'

    return (
      <div>
        <h1>{blog.title} {blog.author}</h1>
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <button onClick={like}>like</button>
          </div>
          <div>
            added by {adder}
          </div>
          {deletable && <div><button onClick={remove}>delete</button></div>}
        </div>
        <div>
          <h3>comments</h3>
          <ul>
            {blog.comments.map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
        {/*<div>
          <form onSubmit={this.comment}>
          <input
            type="text"
            value={this.state.comment}
            name="comment"
            onChange={this.handleChange}></input><button type="submit">add comment</button>
          </form>
        </div>*/}
      </div>
    )
  }
}

export default Blog