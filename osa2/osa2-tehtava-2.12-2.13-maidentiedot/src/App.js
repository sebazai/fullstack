import React from 'react'
import axios from 'axios'
import Country from './components/Country'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({countries: response.data})
        console.log(response)
      })
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  changeFilter = (data) => {
    this.setState({filter: data})
  }


  render() {
    const FilteredCountriesAmount = ({countries}) => {
      console.log(countries.length)
      if(countries.length < 10 && countries.length !== 0 && countries.length !== 1) {
        return (
          countries.map(country => <Country funktio={this.changeFilter.bind(country.name)} key={country.name} name={country.name} />)
        )
      } else if(countries.length === 1) {
        const filteredCountries = this.state.countries.find(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        console.log(filteredCountries)
        return (
          <div><Country key={filteredCountries.name} name={filteredCountries.name} population={filteredCountries.population} flag={filteredCountries.flag} capital={filteredCountries.capital} /></div>
        )
      } else {
        return (
          <p>too many matches, specify another filter</p>
        )
      }
    }
    const filteredCountries = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        find countries <input onChange={this.handleFilterChange} /> <br />
        <FilteredCountriesAmount countries={filteredCountries} />
      </div>
    )
  }
}

export default App