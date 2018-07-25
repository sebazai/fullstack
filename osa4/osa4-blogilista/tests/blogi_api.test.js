const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialPosts = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

beforeAll(async () => {
  await Blog.remove({})
  const blogPosts = initialPosts.map(post => new Blog(post))
  const promiseArray = blogPosts.map(post => post.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogpost amount is 6', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const testData = await api
    .get('/api/blogs')

  expect(testData.body.length).toBe(6)
})

test('add a blog post with all the necessary information', async () => {
  const newPost = {
    title: 'this is a test blog post',
    author: 'Sebastian S',
    url: 'localhost/api/blogs/postsebu',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')
    //console.log(response.body)
  expect(response.body[response.body.length-1].title).toContain('this is a test blog post')
  expect(response.body.length).toBe(initialPosts.length +1)
})

test('add a blog post missing url and title', async () => {
  const fakePost = {
    author: 'Mika häkkinen',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(fakePost)
    .expect(400)
})

test('add a blog post without likes and see if it is 0', async () => {
  const newPost = {
    title: 'this is a new post without likes',
    author: 'Dalai',
    url: 'is here'
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')

  expect(response.body[response.body.length-1].likes).toBe(0)

})

afterAll(() => {
  server.close()
})