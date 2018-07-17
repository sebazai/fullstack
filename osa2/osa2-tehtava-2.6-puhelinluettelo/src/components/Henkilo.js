import React from 'react'

const Henkilo = ({ person, number, removeName }) => {
  return (
    <tr>
      <td>{person}</td>
      <td>{number}</td>
      <td><button type="submit" onClick={removeName}>poista</button></td>
    </tr>
  )
}

export default Henkilo