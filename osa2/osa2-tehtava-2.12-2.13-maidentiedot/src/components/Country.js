import React from 'react'

const Country = (props) => {
    if (props.population !== undefined) {
        return(
            <div>
                <h1>{props.name}</h1>
                <p>capital: {props.capital}</p>
                <p>population: {props.population}</p>
                <p><img alt={props.name} src={props.flag} /></p>
            </div>
        )
    }
  return (
    <div onClick={props.funktio.bind(this, props.name)}>{props.name}<br /></div>
  )
}

export default Country