let token = null

const blogs = [
  {
    _id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "Matti Luukkainen",
    url: "localhost/matti",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    _id: "5a451e21e0b8b04a45638211",
    title: "Selain pystyy suorittamaan vain javascriptiä",
    author: "Sebastian",
    url: "localhost/teppo",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    _id: "5a451e30b5ffd44a58fa79ab",
    title: "HTTP-protokollan tärkeimmät metodit ovat GET ja POST",
    author: "Christian",
    url: "localhost/obirc",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

const getAll = () => {
  return Promise.resolve(blogs)
}


export default { getAll, blogs, setToken }