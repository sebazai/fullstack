import React from 'react'
import ReactDOM from 'react-dom'



class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }

    asetaArvoHyva = (arvo) => {
        return () => {
            this.setState({ hyva : arvo })
        }
    }
    asetaArvoNeutraali = (arvo) => {
        return () => {
            this.setState({ neutraali : arvo })
        }
    }
    asetaArvoHuono = (arvo) => {
        return () => {
            this.setState({ huono : arvo })
        }
    }

    statistic = () => {
        const keskiarvo = this.state.hyva - this.state.huono / (this.state.hyva+this.state.neutraali+this.state.huono)
        return (
            <div>
            keskiarvo {keskiarvo}<br />
            </div>
        )
    }
    
  
    render() { 
    const Button = ({handleClick, text}) => (
        <button onClick={handleClick}>
            {text}
        </button>
    )

    const Statistics = () => {
        if (this.state.hyva === 0 && this.state.neutraali === 0 && this.state.huono === 0) {
            return (
                <div>
                <h1>statistiikka</h1>
                <em>ei yhtään palautetta annettu</em>
                </div>
            )
        }
        return (
            <div>
                <h1>statistiikka</h1>
                <table>
                <tr>
                <td>hyvä</td><td>{this.state.hyva}</td>
                </tr>
                <tr>
                <td>neturaali</td><td>{this.state.neutraali}</td>
                </tr>
                <tr>
                <td>huono</td><td>{this.state.huono}</td>
                </tr>
                {Statistic()}
                </table>
            </div>
        )
    }

    const Statistic = () => {
        const kaikki = this.state.hyva+this.state.neutraali+this.state.huono
        const arvo = this.state.hyva-this.state.huono
        const keskiarvo = arvo / kaikki
        const positiivi = this.state.hyva/kaikki*100
        return (
            <tbody>
            <tr>
            <td>keskiarvo</td><td>{keskiarvo}</td>
            </tr>
            <tr>
            <td>positiivisia</td><td>{positiivi} %</td>
            </tr>
            </tbody>
        )
    }
    
      return (
        <div>
          <div>
            <h1>anna palautetta</h1>
            <Button 
                handleClick={this.asetaArvoHyva(this.state.hyva + 1)}
                text="hyva"
            />
            <Button 
                handleClick={this.asetaArvoNeutraali(this.state.neutraali + 1)}
                text="neutraali"
            />
            <Button 
                handleClick={this.asetaArvoHuono(this.state.huono + 1)}
                text="huono"
            />
            <Statistics />
          </div>
        </div>
      )
    }
  }
ReactDOM.render(<App />, document.getElementById('root'))