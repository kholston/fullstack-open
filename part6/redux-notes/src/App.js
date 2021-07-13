import React, {useEffect} from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter';
import { useDispatch } from 'react-redux';
import { initializeNotes } from './reducers/noteReducer';
import './App.css';


const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(initializeNotes())
  },[dispatch])

  return (
    <div>
      <NewNote/>
      <VisibilityFilter/>
      <Notes/>
    </div>
  )
}

export default App;
