import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Home = () => (
  <div> <h2>TKTL notes app</h2> </div>
)

const Notes = () => (
  <div> <h2>Notes</h2> </div>
)

const Users = () => (
  <div> <h2>Users</h2> </div>
)


const App = () => {
  const [page, setPage] = useState('home')

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    switch(page){
      case 'home':
        return <Home/>
      case 'notes':
        return <Notes/>
      case 'users':
        return <Users/>
      default:
        return <Home/>
    }
  }

  const padding = {
    padding: 5
  }

  return(
    <div>
      <div><a href="" onClick={toPage('home')} style={padding}>home</a></div>
      <div><a href="" onClick={toPage('notes')} style={padding}>notes</a></div>
      <div><a href="" onClick={toPage('users')} style={padding}>users</a></div>

      {content()}
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
