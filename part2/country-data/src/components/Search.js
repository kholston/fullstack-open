import React from 'react'
import Button from './Button'

const Search = ({clearSearch, handleChange, inputVal}) => {

  return(
    <div>
      find countries <input onChange={handleChange} value={inputVal}/>
      {inputVal && <Button handleClick={clearSearch} text='clear'/>}
    </div>
  )
}

export default Search;