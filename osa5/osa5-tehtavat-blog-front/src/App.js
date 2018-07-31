import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import TogglableBlog from './components/TogglableBlog';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      error: null,
      success: null,
      user: null,
      title: '',
      author: '',
      url: '',
      loginVisible: ''
    }
  }

  componentDidMount = async () => {
    const blogs = await blogService.getAll()
    this.setState({blogs})
    /*blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )*/
    const loggedUserJSON = await window.localStorage.getItem('loggedBlogUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        this.setState({user})
        blogService.setToken(user.token)
      }
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blogPost = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    const newBlog = await blogService.create(blogPost)
    //console.log(newBlog.id)
    this.setState({
      blogs: this.state.blogs.concat(newBlog),
      title: '',
      author: '',
      url: '',
      success: `a new blog '${newBlog.title}' by ${newBlog.author} added`
    })
    setTimeout(()=>{
      this.setState({success: null})
      this.componentDidMount()
    }, 5000)
    
    /*
    blogService
      .create(blogPost)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: '',
          success: `a new blog '${newBlog.title}' by ${newBlog.author} added`
        })
        setTimeout(() => {
          this.setState({ success: null })
        }, 5000)
      })*/
  
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = async (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    this.setState({user: null})
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'username or password incorrect',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  deleteBlog = async (blog) => {
    console.log(blog)
    if(window.confirm(`delete '${blog.title}' by ${blog.author}?`)) {
      const deleted = await blogService.remove(blog._id)
      console.log(deleted)
      const updateBlogs = this.state.blogs.filter(b => b._id !== blog._id)
      this.setState({blogs: updateBlogs})
    }
  }



  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    
    if (this.state.user === null) {
      return (
        <Togglable buttonLabel='login'>
          <LoginForm 
            handleLoginFieldChange={this.handleLoginFieldChange} 
            username={this.state.username}
            password={this.state.password}
            error={this.state.error}
            success={this.state.success}
            login={this.login}
          />
        </Togglable>
      )
    }
  
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={this.state.error} success={this.state.success} />
        <UserInfo logout={this.logout} user={this.state.user} />
        <Togglable buttonLabel="new blog">
        <BlogForm 
          title={this.state.title} 
          author={this.state.author} 
          url={this.state.url} 
          addBlog={this.addBlog} 
          handleBlogChange={this.handleBlogChange} />
        </Togglable><br />
          {this.state.blogs.sort((yks, kaks) => yks.likes < kaks.likes).map(blog => 
          <TogglableBlog key={blog._id+blog.likes} buttonLabel={blog.title + ' ' + blog.author}>
            <Blog key={blog._id} blog={blog} deleteBlog={this.deleteBlog.bind(blog)} />
          </TogglableBlog>
          )}
      </div>
    )
  }
}

export default App
