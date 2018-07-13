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

    
    
    kaikkiYhteensa = () => { return (this.state.hyva+this.state.neutraali+this.state.huono)}
    
    render() { 
    const Button = ({handleClick, text}) => (
        <button onClick={handleClick}>
            {text}
        </button>
    )

    const Statistic = ({palaute, arvo, merkki}) => {
        return (
            <tr>
                <td>
                    {palaute}
                </td>
                <td>
                    {arvo}
                </td>
                <td>
                    {merkki}
                </td>
            </tr>
        )
    }

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
                    <tbody>
                        <Statistic palaute="hyva" arvo={this.state.hyva} />
                        <Statistic palaute="neturaali" arvo={this.state.neutraali} />
                        <Statistic palaute="huono" arvo={this.state.huono} />
                        <Statistic palaute="keskiarvo" arvo={((this.state.hyva-this.state.huono) / this.kaikkiYhteensa()).toFixed(1)} />
                        <Statistic palaute="positiivisia" merkki="%" arvo={(this.state.hyva/this.kaikkiYhteensa()*100).toFixed(1)} /> 
                    </tbody>
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