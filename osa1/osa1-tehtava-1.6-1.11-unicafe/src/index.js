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

    pressButton = (button) => {
        return () => {
            this.setState({ [button] : this.state[button] +1 })
        }
    }

    Statistic = () => {
        const kaikki = this.state.hyva+this.state.neutraali+this.state.huono
        const arvo = this.state.hyva-this.state.huono
        let keskiarvo = (arvo / kaikki).toFixed(1)
        const positiivi = (this.state.hyva/kaikki*100).toFixed(1)
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
                <em>ei yhtään palautetta annettu</em>
                </div>
            )
        }
        return (
            <div>
                <table>
                <tr>
                    <td>hyvä</td>
                    <td>{this.state.hyva}</td>
                </tr>
                <tr>
                    <td>neturaali</td>
                    <td>{this.state.neutraali}</td>
                </tr>
                <tr>
                    <td>huono</td>
                    <td>{this.state.huono}</td>
                </tr>
                    {this.Statistic()}
                </table>
            </div>
        )
    }

      return (
        <div>
          <div>
            <h1>anna palautetta</h1>
            <Button 
                handleClick={this.pressButton("hyva")}
                text="hyva"
            />
            <Button 
                handleClick={this.pressButton("neutraali")}
                text="neutraali"
            />
            <Button 
                handleClick={this.pressButton("huono")}
                text="huono"
            />
            <h1>statistiikka</h1>
            <Statistics />
          </div>
        </div>
      )
    }
  }
ReactDOM.render(<App />, document.getElementById('root'))