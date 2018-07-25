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
    console.log(savedBlogpost)
    response.json(blogpost)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = blogsRouter