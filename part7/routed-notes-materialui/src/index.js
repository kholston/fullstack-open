import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch 
} from 'react-router-dom';
import './index.css';

const Home = () => (
  <div> <h2>TKTL notes app</h2> </div>
)

const Notes = ({notes}) => (
  <div> 
    <h2>Notes</h2> 
    <ul>
      {notes.map(note => 
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Note = ({notes}) => {
  const id = useParams().id
  const note = notes.find(n => n.id === Number(id))
  return(
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important':''}</strong></div>
    </div>
  )
}

const Users = () => (
  <div> <h2>Users</h2> </div>
)

const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mainUser')
    history.push('/')
  }

  return(
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username <input />
        </div>
        <div>
          password <input type='password'/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}


const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)

  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding: 5
  }

  const match = useRouteMatch('/notes/:id')
  const note = match
    ? notes.find(note = note.id === Number(match.params.id))
    : null

  return(
    <Router>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/notes'>notes</Link>
        <Link style={padding} to='/users'>users</Link>
        {user 
        ? <em>{user} logged in</em>
        : <Link style={padding} to="/login">login</Link>
        }
      </div>

      <Switch>
        <Route path='/notes/:id'>
          <Note note={note}/>
        </Route>
        <Route path='/notes'>
          <Notes notes={notes}/>
        </Route>
        <Route path='/users'>
          {user ? <Users/> : <Redirect to='login'/>}
        </Route>
        <Route path='/login'>
          <Login onLogin={login}/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>

      <div>
        <i>Note app, Department of Computer Science 2021</i>
      </div>
    </Router>
    
  )
}

ReactDOM.render(
  <Router>
    <App/>,
  </Router>
  document.getElementById('root')
);
