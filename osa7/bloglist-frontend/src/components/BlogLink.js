import React from 'react'
import { Link } from 'react-router-dom'

const BlogLink = ({ blog }) => {

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Link key={blog._id} to={`blogs/${blog._id}`}>{blog.title} {blog.author}</Link>
    </div>
  )
}


export default BlogLink