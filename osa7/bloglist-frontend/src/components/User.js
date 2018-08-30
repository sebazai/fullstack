import React from 'react'

const User = ({ user }) => {
  if (user === null) return null
  return(
    <div>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.title}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User