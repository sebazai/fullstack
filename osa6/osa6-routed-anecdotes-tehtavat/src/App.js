import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from 'react-router-dom'
import {Navbar, Nav, NavItem, ListGroup, ListGroupItem, Grid, Row, Col, Alert} from 'react-bootstrap'

const Menu = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Software anecdotes</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem href="#">
          <NavLink exact to="/" activeStyle={activeStyle}>anecdotes</NavLink>
        </NavItem>
        <NavItem href="#">
          <NavLink exact to="/create" activeStyle={activeStyle}>create new</NavLink>
        </NavItem>  
        <NavItem href="#">
          <NavLink exact to="/about" activeStyle={activeStyle}>about</NavLink>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  /*
  <div style={menuStyle}>    
    <NavLink exact to="/" activeStyle={activeStyle}>anecdotes</NavLink> &nbsp;
    <NavLink exact to="/create" activeStyle={activeStyle}>create new</NavLink> &nbsp;
    <NavLink exact to="/about" activeStyle={activeStyle}>about</NavLink>
  </div>*/
)
const activeStyle = {
  fontWeight: 'bold',
  color: 'green',
}


const notiStyle = {
  border: '2px solid green',
  borderRadius: '10px',
  color: 'green'
}

const menuStyle = {
  background: 'cyan'
}

const footerStyle = {
  marginTop: '15px',
}


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup>  
  </div>
)

const Anecdote = ({anecdote}) => {
  return(
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <div>has {anecdote.votes} votes</div><br />
    <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div><br />
  </div>
)}

const About = () => (
  <Grid>
    <Row>
      <h2>About anecdote app</h2>
      <Col xs={7} md={4}>
      <div>
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </div>
      </Col>
      <Col xs={5} md={4}>
        <img src={'/Noam_Chomsky.jpg'} alt="Noam Chomsky" />
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div style={footerStyle}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
  }

  render() {
    return(
      <Grid>
        <Row>
        <h2>create a new anecdote</h2>
        <Col xs={6}>
        <form onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={4}>
            content
          </Col>
          <Col xs={4}>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            author
          </Col>
          <Col xs={4}>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            url for more info
          </Col>
          <Col xs={4}>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Col>
        </Row>
        <Row>
          <Col xs={4} xsOffset={4}>
            <button>create</button>
          </Col>
        </Row>
        </form>
        </Col>
        </Row>
      </Grid>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }


  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `a new anecdote ${anecdote.content} created!` })
    setTimeout(() => {
      this.setState({notification: ''})
    }, 5000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    const Notification = () => (
      this.state.notification === ''
      ? <div></div>
      : <Alert color="success">
        {this.state.notification}
      </Alert>
      /*<div style={notiStyle}>
        <p>{this.state.notification}</p>
      </div>*/
    )
    return (
      <div className="container">
        <Router>
          <div>
            <Menu />
            <Notification />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/create" render={() => 
            this.state.notification === ''
            ? <CreateNew addNew={this.addNew}/>
            : <Redirect to="/" />} />
            <Route exact path="/anecdotes/:id" render={({match}) => 
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />} 
            />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;