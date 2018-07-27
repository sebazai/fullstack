const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
  const posts = await Blog.find({}).populate('user', {id: 1, username: 1, name: 1} )
  response.json(posts)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try {
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }

    if(body.title === undefined && body.url === undefined ) {
      return response.status(400).json({ error: 'content missing' })
    }

    const user = await User.findById(decodedToken.id)

    const blogpost = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })
    const savedBlogpost = await blogpost.save()

    user.posts = user.posts.concat(savedBlogpost._id)
    await user.save()
    //console.log(savedBlogpost)
    response.json(Blog.format(blogpost))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({error: exception.message})
    } else {
      //console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const posts = await Blog.findById(request.params.id)
    //const post = posts.find(post => post.id === request.params.id)

    if (posts) {
      response.json(posts)
    } else {
      return response.status(404).end()
    }

  } catch (exception) {
    //console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if(!request.token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }

    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)

    if (blog.user.toString() === user.id.toString()) {
      const post = await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).json({error: 'token invalid'})
    }
  
    
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({error: exception.message})
    } else {
      console.log(exception)
      response.status(400).send({error: 'cannot find id'})
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    //console.log(request.body)
    const body = request.body
    const updatedBlogPost = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedpost = await Blog.findByIdAndUpdate(request.params.id,updatedBlogPost, { new: true})
    response.json(Blog.format(updatedpost))
  } catch (exception) {
    //console.log(exception)
    response.status(400).send({error: 'malformatted id'})
  }

})

module.exports = blogsRouter