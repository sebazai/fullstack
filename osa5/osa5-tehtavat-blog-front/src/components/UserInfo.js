import React from 'react'

const UserInfo = ({logout, user}) => {
    return (
        <div>
        <p>{user.name} is logged in <button type="button" onClick={logout}>logout</button></p>
        </div>
    )
}


export default UserInfo