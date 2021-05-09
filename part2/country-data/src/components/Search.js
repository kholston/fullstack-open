import React from 'react'

const Search = ({handleChange, inputVal}) => {

  return(
    <div>
      find countries <input onChange={handleChange} value={inputVal}/>
    </div>
  )
}

export default Search;