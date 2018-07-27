const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  adult: Boolean
})

userSchema.statics.format = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    posts: user.posts,
    adult: user.adult
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User