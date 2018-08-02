import React from 'react'
import { shallow, mount } from 'enzyme'
import TogglableBlog from './TogglableBlog'
import Blog from './Blog'

describe('TogglableBlog test - exercise 5.14', () => {
let togglableComponent
const blog = {
    title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    _id: "testi",
    url: 'localhost',
    author: "Sebbe",
    likes: 2
}

beforeEach(() => {
    togglableComponent = shallow(
        <TogglableBlog buttonLabel={blog.title + ' ' + blog.author}>
            <Blog key={blog._id} blog={blog} />
        </TogglableBlog>
    )
    //console.log(togglableComponent.debug())
    })
  it('renders content', () => {
    
    expect(togglableComponent.contains(<Blog key={blog._id} />))
    //expect(contentDiv.children().props()).toContain(blog.url)
  })

  it('at start the data is not displayed', () => {
      const div = togglableComponent.find('.clickableDiv')
      expect(div.getElement().props.style).toEqual({display: ''})
  })

  it('after clicking the div, children is displayed', () => {
      const clickDiv = togglableComponent.find('.clickThis').simulate('click')
      togglableComponent.update()
      const div = togglableComponent.find('.clickableDiv')
      expect(div.getElement().props.style).toEqual({display: 'none'})
  })
})