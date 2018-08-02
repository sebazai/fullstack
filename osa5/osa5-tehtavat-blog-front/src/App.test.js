import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import blogsService from './services/blogs'

describe('<App />', () => {
  let app

  describe.skip('when user is not logged', () => {
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

  describe.skip('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      
      app = mount(<App>
          {localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))}
        </App>)
      console.log(app.debug())
    })

    it('all notes are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })
})