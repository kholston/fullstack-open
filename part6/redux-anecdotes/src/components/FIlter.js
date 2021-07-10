import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filterValue = useSelector(state => state.filter)


  const handleChange = (event) => {
    const filterValue = event.target.value
    dispatch(setFilter(filterValue))
  }

  const style = {
    marginBottom: 10
  }

  return(
    <div style={style}>
      filter <input onChange={handleChange} value={filterValue} />
    </div>
  )
}

export default Filter