import React, {useState, useEffect} from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Note from './components/Note'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Footer from './components/Footer'


const App = () =>{
  const [notes,setNotes] = useState([])
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(()=> {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])
  
  const addNote = (noteObject) =>{ 
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = (id) => {
    const note =  notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService.update(id, changedNote).then(returnedNote=>{
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    }).catch( error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const notesToShow = showAll ? notes: notes.filter(note => note.important)

  const handleLogin = async (credentials) => {
    
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    noteService.setToken(null)
  }



  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>

      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm handleLogin={handleLogin}/>
        </Togglable>
        :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='create note'>
            <NoteForm 
              createNote={addNote}
            />
          </Togglable>
        </div>
      }
      <div>
        <button onClick={()=> setShowAll(!showAll)}>show {showAll ? 'important': 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={()=> toggleImportanceOf(note.id)} />)}
      </ul>

      <Footer/>
    </div>
  );
}

export default App;
