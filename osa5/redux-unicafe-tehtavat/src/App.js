import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)

const keskiarvo = ({arviot, palautteita}) => {
    return (arviot.good - arviot.bad) / palautteita
}

const positiivisia = ({arviot, palautteita}) => {
    return arviot.good / palautteita*100
}

const Statistiikka = ({arviot, nollaa}) => {
  const palautteita = arviot.good + arviot.bad + arviot.ok
  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{arviot.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{arviot.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{arviot.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo({arviot, palautteita}).toFixed(1)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia({arviot, palautteita}).toFixed(1)} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={nollaa}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type: nappi})
    console.log(store.getState())
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka arviot={store.getState()} nollaa={this.klik('ZERO')}/>
      </div>
    )
  }
}

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}
  
render()
store.subscribe(render)

export default App