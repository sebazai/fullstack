import React from 'react'

const User = ({user}) => {
    return(
        <div>
            <h1>{user.name}</h1>
            <h3>Added blogs</h3>
            <ul>
                {console.log(user)}
            {user.blogs.map(blog => 
                <li>
                    {blog.title}
                </li>
            )}
            </ul>
        </div>
    )
}

export default User