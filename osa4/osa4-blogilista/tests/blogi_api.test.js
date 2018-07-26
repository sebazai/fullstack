const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


describe('blog post testing', async () => {
  beforeAll(async () => {
    await Blog.remove({})
    const blogPosts = helper.initialPosts.map(post => new Blog(post))
    const promiseArray = blogPosts.map(post => post.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    const postsInDb = await helper.postsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(postsInDb.length)
    const returnedTitles = response.body.map(p => p.title)
    postsInDb.forEach(post => {
      expect(returnedTitles).toContain(post.title)
    })
  })

  test('individual blogpost is return as json via GET /api/blogs/:id', async () => {
    const postsInDb = await helper.postsInDb()
    const firstPost = postsInDb[0]

    const response = await api
      .get(`/api/blogs/${firstPost.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe(firstPost.title)
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

  test('404 returned by GET /api/blogs/:id with nonexisting valid id', async () => {
    const nonExistingId = await helper.nonExistingID()

    const response = await api
      .get(`/api/blogs/${nonExistingId}`)
      .expect(404)
  })

  test('400 is returned by GET /api/blogs/:id with invalid id', async () => {
    const invalidId = "5a3d5da59070081a82a3445"

    const response = await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  describe('adding of a new blog post', async () => {
    test('add a blog post with all the necessary information', async () => {
      const postsAtStart = await helper.postsInDb()

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

      const postsAfterAdding = await helper.postsInDb()
        //console.log(response.body)
      expect(postsAfterAdding[postsAfterAdding.length-1].title).toContain('this is a test blog post')
      expect(postsAfterAdding.length).toBe(postsAtStart.length +1)
    })
  })
  describe('add posts without all the necessary information', async () => {
    test('add a blog post missing url and title', async () => {
      const fakePost = {
        author: 'Mika häkkinen',
        likes: 2
      }

      const postsAtStart = await helper.postsInDb()

      await api
        .post('/api/blogs')
        .send(fakePost)
        .expect(400)

      const postsAfterAdding = await helper.postsInDb()
      expect(postsAfterAdding.length).toBe(postsAtStart.length)
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
  })
  describe('deletion of posts', async () => {
    let addedPost
    beforeAll(async () => {
      addedPost = new Blog({
        title: 'this is testing api deletion',
        author: 'Sebastian S',
        url: 'localhost/api/blogs/post',
        likes: 7
      })
      await addedPost.save()
    })

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
      const postsAtStart = await helper.postsInDb()

      await api
        .delete(`/api/blogs/${addedPost._id}`)
        .expect(204)

        const afterDeletion = await helper.postsInDb()

        const titles = afterDeletion.map(p => p.title)
        expect(titles).not.toContain(addedPost.title)
        expect(afterDeletion.length).toBe(postsAtStart.length-1)
    })
  })

  describe('updating likes on post', async () =>{
    test('Change the first posts like from 7 to 9', async () => {
      const postWithNewLikes = {
        id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 9,
        __v: 0
      }
      const postsBeforeAdding = await helper.postsInDb()
  
      await api
        .put(`/api/blogs/${postWithNewLikes.id}`)
        .send(postWithNewLikes)
        .expect(200)

      const afterAdding = await helper.postsInDb()
      
      expect(postsBeforeAdding.length).toBe(afterAdding.length)
      expect(afterAdding[0].likes).toBe(9)
    })
  })
})

afterAll(() => {
  server.close()
})