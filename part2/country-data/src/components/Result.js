import React from 'react'
import Button from './Button'

const Result = ({country, handleShowClick}) => {
  return(
    <div>
    {country.name}
    <Button handleClick={handleShowClick} text='show'/>
  </div>
  )
}

export default Result