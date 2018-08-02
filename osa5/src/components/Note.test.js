import React from 'react'
import { shallow, mount } from 'enzyme'
import Note from './Note'
import Togglable from './Togglable'

describe.only('<Note />', () => {
  it('renders content', () => {
    const note = {
      content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      important: true
    }

    const noteComponent = shallow(<Note note={note} />)
    const contentDiv = noteComponent.find('.content')

    expect(contentDiv.text()).toContain(note.content)
  })

  it('clicking the button calls event handler once', () => {
    const note = {
      content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      important: true
    }
  
    const mockHandler = jest.fn()
  
    const noteComponent = shallow(
      <Note
        note={note}
        toggleImportance={mockHandler}
      />
    )
  
    const button = noteComponent.find('button')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(1)
  })

  it('shallow renders only one level', () => {
    const note1 = {
      content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      important: true
    }
    const note2 = {
      content: 'shallow ei renderöi alikomponentteja',
      important: true
    }
  
    const togglableComponent = mount(
      <Togglable buttonLabel="show...">
        <Note note={note1} />
        <Note note={note2} />
      </Togglable>
    )
  
    console.log(togglableComponent.html())
  })
})