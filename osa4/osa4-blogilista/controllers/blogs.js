const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const posts = await Blog.find({})
  response.json(posts)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if(body.title === undefined && body.url === undefined ) {
      return response.status(400).json({ error: 'content missing' })
    }
    const blogpost = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    })
    const savedBlogpost = await blogpost.save()
    //console.log(savedBlogpost)
    response.json(blogpost)
  } catch (exception) {
    //console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
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
    const post = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({error: 'cannot find id'})
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
    response.json(updatedpost)
  } catch (exception) {
    //console.log(exception)
    response.status(400).send({error: 'malformatted id'})
  }

})

module.exports = blogsRouter