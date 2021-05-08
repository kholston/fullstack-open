import React from 'react'


const Search = ({handleFilterChange, value}) => {
 return(
  <div>
    filter shown with <input onChange={handleFilterChange} value={value} />
  </div>
 )
}

export default Search