import React from 'react'
import { shallow } from 'enzyme'
import TogglableBlog from './TogglableBlog'
import Blog from './Blog'

describe.skip('TogglableBlog test - exercise 5.14', () => {
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
    })
  it('renders content', () => {
    
    const contentDiv = togglableComponent.find('.togglableBlogTitle')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    
  })
})