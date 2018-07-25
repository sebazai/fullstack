const dummy = (blogs) => {
    // ...
    return 1
  }
  const totalLikes = (blogdata) => {
    const reducer = (sum, blogdata) => {
      return sum + blogdata.likes
    }
    return blogdata.length === 0 ? 0 : blogdata.reduce(reducer, 0)
  }
  const favoriteBlog = (blogs) => {
      const blogPost = (blog) => {
        return {
          title: blog.title,
          author: blog.author,
          likes: blog.likes
        }
      }
      console.log(blogPost(blogs.reduce((prevValue, currentValue) => {
          if(currentValue.likes > prevValue) {
            return currentValue
          } else {
            return prevValue
          }
      }, blogs[0].likes)))
      return blogPost(blogs.reduce((prevValue, currentValue) => currentValue.likes > prevValue ? currentValue : prevValue, blogs[0].likes))
  }

  // help function to get author
  getbestAuthor = (myMap, individuelAuthors) => {
    let bestAuthor = individuelAuthors[0]
    individuelAuthors.forEach((author) => {
      if (myMap.get(author) > myMap.get(bestAuthor)) {
        bestAuthor = author
      }
    })
    return bestAuthor
  }

  //most blog posts
  const mostBlogs = (blogs) => {
    const blogPost = (author, posts) => {
      return {
        author: author,
        blogs: posts
      }
    }
    const individuelAuthors = [...new Set(blogs.map(blog => blog.author))]
    const myMap = new Map()
    //console.log(individuelAuthors)
    individuelAuthors.forEach((author) => {
      myMap.set(author, 0)
      blogs.forEach((value) => {
        if(value.author === author) {
            myMap.set(author, myMap.get(author)+1)
        }
      })
    })
    const bestAuthor = getbestAuthor(myMap, individuelAuthors)
    //console.log(bestAuthor)
    return blogPost(bestAuthor, myMap.get(bestAuthor))
  }

  // most likes
  const mostLikes = (blogs) => {
    const blogPost = (author, likes) => {
      return {
        author: author,
        likes: likes
      }
    }
    const individuelAuthors = [...new Set(blogs.map(blog => blog.author))]
    const myMap = new Map()
    //console.log(individuelAuthors)
    individuelAuthors.forEach((author) => {
      myMap.set(author, 0)
      blogs.forEach((value) => {
        if(value.author === author) {
            myMap.set(author, myMap.get(author)+value.likes)
        }
      })
    })
    const bestAuthor = getbestAuthor(myMap, individuelAuthors)
    //console.log(blogPost(bestAuthor, myMap.get(bestAuthor)))
    return blogPost(bestAuthor, myMap.get(bestAuthor))
  }

  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }

