export const setFilter = (filter) => {
  return{
    type:'SET_FILTER',
    data: filter
  }
}

export const clearFilter = () => {
  return{
    type:'CLEAR_FILTER',
    data: ''
  }
}


const filterReducer = (state = '', action) => {
  switch(action.type){
    case 'SET_FILTER':
    case 'CLEAR_FILTER':
      return action.data
    default:
      return state
  }
}

export default filterReducer