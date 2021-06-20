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
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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
  
  const addNote = (event) =>{
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5, 
    }
    
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) =>{
    setNewNote(event.target.value)
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
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
          <LoginForm 
            handleLogin={handleLogin} 
            username={username} 
            handleUsernameChange={handleUsernameChange} 
            passwword={password} 
            handlePasswordChange={handlePasswordChange}   
          />
        </Togglable>
        :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='create note'>
            <NoteForm 
              addNote={addNote}
              handleNoteChange={handleNoteChange}
              newNote={newNote}
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
