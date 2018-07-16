import React from 'react'

const NewHenkilo = ({onSubmit, nameChange, phoneChange, newName, newNumber}) => {
    return (
        <form onSubmit={onSubmit}>
          <div>
            nimi: <input 
                onChange={nameChange}
                value={newName}
            />
          </div>
          <div>
            numero: <input
                onChange={phoneChange}
                value={newNumber}
                />
            </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
    )
}

export default NewHenkilo