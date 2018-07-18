import React from 'react';
import Henkilo from './components/Henkilo'
import NewHenkilo from './components/NewHenkilo'
import getPersons from './services/persons'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [ ],
      newName: '',
      newNumber: '',
      filter: '',
      message: null,
      error: null
    }
  }

  componentDidMount() {
    getPersons
      .getAll()
      .then(response => 
      this.setState({persons: response}))
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

  addPersonBack = (id, number) => {
    const newHenkilo = {
      name: this.state.persons.filter(p => p.id === id).map(h => h.name).toString(),
      number: number === undefined ? this.state.persons.filter(p => p.id === id).map(h => h.number).toString() : number
    }
    console.log(newHenkilo)
    getPersons
    .create(newHenkilo)
    .then(henkilo => {
      this.setState({
        message: `lisättiin ${henkilo.name} takaisin, numerolla ${henkilo.number}`,
        newNumber: '',
        newName: ''
    })
    this.componentDidMount()
      setTimeout(() => {
        this.setState({message: null})
      }, 5000)
    })
  }

  removeName = (id, name) => {
      return () => {
        const result = window.confirm(`poistetaanko ${name}?`)
        if (result) {
          const url = `http://localhost:3001/persons/${id}`
          getPersons
          .removeid(url)
          .then(response => {
            const removedPerson = this.state.persons.filter(p => p.id !== id)
            this.setState({
              persons: removedPerson,
              newName: '',
              newNumber: '',
              message: `poistettiin ${name}`
            })
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
            console.log(removedPerson)
            console.log(response)
          })
          .catch(error => {
            console.log(error)
            this.setState({
              error: `Virhe: Tämä henkilö on poistettu`
            })
            setTimeout(() => {
              this.setState({error: null})
              const response = window.confirm(`Lisätäänkö henkilö takaisin?`) ? this.addPersonBack(id) : this.componentDidMount()
            }, 5000)
          })
        }
      }
  }

  addName = (event) => {
    event.preventDefault()
    if(this.state.persons.some((person) => person['name'].toLowerCase() === this.state.newName.toLowerCase())) {
        const result = window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)
        if(result) {
          const personToUpdate = this.state.persons.find(person => person.name.toLowerCase() === this.state.newName.toLowerCase())
          const allPersons = {...personToUpdate, number: this.state.newNumber}
          console.log(personToUpdate)
          getPersons
            .update(personToUpdate.id, allPersons)
            .then(allPersons => {
              const persons = this.state.persons.filter(p => p.id !== personToUpdate.id)
              this.setState({
                  message: `Korvattiin henkilön ${this.state.newName} numero uudella numerolla`,
                  persons: persons.concat(allPersons),
                  newName: '',
                  newNumber: ''
              })
              setTimeout(() => {
                this.setState({
                  message: null
                })
              }, 5000)
            })
            .catch(error => {
              console.log(error)
              this.setState({
                error: `Virhe: Tämä henkilö on poistettu`
              })
              setTimeout(() => {
                this.setState({error: null})
                const response = window.confirm(`Lisätäänkö henkilö takaisin?`) ? 
                    this.addPersonBack(personToUpdate.id, this.state.newNumber) :
                    this.componentDidMount()
              }, 5000)
            })
          } else {
            this.setState({message: `Ei korvattu ${this.state.newName} uudella numerolla`})
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
          }
    } else {
      const newHenkilo = {
          name: this.state.newName,
          number: this.state.newNumber
      }
      getPersons
        .create(newHenkilo)
        .then(henkilo => {
            this.setState({
              persons: this.state.persons.concat(henkilo),
              newName: '',
              newNumber: '',
              message: `lisättiin ${henkilo.name}`
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
        })
    }
  }



  render() {
      const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
      const Notification = ({ message, error }) => {
        if (message === null && error === null) {
          return null
        } else if (message !== null) {
          return (
            <div className="message">
              {message}
            </div>
          )
        } else if (error !== null) {
          return (
            <div className="error">
              {error}
            </div>
          )
        }
      }

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification error={this.state.error} message={this.state.message} />
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
        <table>
          <tbody>
            {filteredPersons.map(person => 
              <Henkilo removeName={this.removeName(person.id, person.name)}  
                key={person.name} 
                person={person.name} 
                number={person.number} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App