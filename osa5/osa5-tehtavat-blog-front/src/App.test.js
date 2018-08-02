import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogsService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
      //console.log(app.debug())
    })

    it('only login form is rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      app = mount(<App />)
      //console.log(app.debug())
    })

    it('all notes are rendered', () => {
      
      app.update()
      //console.log(app.debug())
      const blogComponents = app.find(Blog)
      //console.log(blogComponents)
      expect(blogComponents.length).toEqual(blogsService.blogs.length)
    })
  })
})