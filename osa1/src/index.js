import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    return (
      <div>
        <p>Hello {props.name}, you are {props.age} years old</p>
      </div>
    )
  }
  
  const App = () => {
    const nimi = 'Pekka'
    const ika = 10
    return (
      <div>
        <h1>Greetings</h1>
        <Hello name="Arto" age={26 + 10} />
        <Hello name={nimi} age={ika}/>
        <Hello />
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));