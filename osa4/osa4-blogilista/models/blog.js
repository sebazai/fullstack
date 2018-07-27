const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

postSchema.statics.format = (post) => {
  return {
    id: post._id,
    title: post.title,
    author: post.author,
    url: post.url,
    likes: post.likes,
    user: post.user
  }
}

const Blog = mongoose.model('Blog', postSchema)
module.exports = Blog