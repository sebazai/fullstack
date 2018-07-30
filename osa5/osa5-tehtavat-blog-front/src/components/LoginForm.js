import React from 'react'
import Notification from './Notification'

const LoginForm = ({handleLoginFieldChange, username, password, error, success, login}) => {
    return (
        <div>
            <h2>Kirjaudu sovellukseen</h2>
            <Notification message={error} success={success} />
            <form onSubmit={login}>
            <div>
            käyttäjätunnus
            <input
                type="text"
                name="username"
                value={username}
                onChange={handleLoginFieldChange}
            />
            </div>
            <div>
            salasana
            <input
                type="password"
                name="password"
                value={password}
                onChange={handleLoginFieldChange}
            />
            </div>
            <button>kirjaudu</button>
            </form>
        </div>
        )
}

export default LoginForm