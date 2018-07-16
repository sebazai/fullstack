import React from 'react';
import Henkilo from './components/Henkilo'
import NewHenkilo from './components/NewHenkilo'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [ 
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
       ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({newName : event.target.value})
  }

  handleNumberChange = (event) => {
      this.setState({newNumber : event.target.value})
  }

  handleFilteredChange = (event) => {
      this.setState({filter: event.target.value})
  }

  addName = (event) => {
    event.preventDefault()
    if(this.state.persons.some((person) => person['name'] === this.state.newName)) {
        alert('Nimi on jo listalla.')
    } else {
        const newHenkilo = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        const persons = this.state.persons.concat(newHenkilo)
        this.setState({
            persons: persons,
            newName: '',
            newNumber: ''
        })
    }
  }

  render() {
      const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
            <div>
                rajaa näytettäviä: <input 
                    onChange={this.handleFilteredChange} />
            </div>
        <h3>Lisää uusi</h3>
            <NewHenkilo 
            onSubmit={this.addName} 
            newName={this.state.newName} 
            newNumber={this.newNumber} 
            nameChange={this.handleNameChange} 
            phoneChange={this.handleNumberChange} />
        <h3>Numerot</h3>
        {filteredPersons.map(person => <Henkilo key={person.name} person={person.name} number={person.number} />)}
      </div>
    )
  }
}

export default App