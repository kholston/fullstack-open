const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE' :
      // not immutable
      // state.push(action.data)
      
      // Good
      // return state.concat(action.data)

      // Better
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE' : {
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => 
        note.id !== id ? note : changedNote  
      )
    }
    default:
      return state
  }
}


export default noteReducer