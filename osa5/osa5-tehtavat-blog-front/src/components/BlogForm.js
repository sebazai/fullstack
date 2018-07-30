import React from 'react'
const BlogForm = ({title, addBlog, author, handleBlogChange, url}) => (
    <div>
    <h2>Create new</h2>
    <form onSubmit={addBlog}>
      Title: <input
        value={title}
        onChange={handleBlogChange}
        name="title"
      /><br />
      Author: <input
        value={author}
        onChange={handleBlogChange}
        name="author"
      /><br />
      URL:<input
        value={url}
        onChange={handleBlogChange}
        name="url"
      /><br />
      <button>create</button>
    </form>
  </div>
)

export default BlogForm