import React from 'react'

const Notification = ({type, message}) => {
  if(message === null) {
    return null
  }

  return(
    <div className={type === 1 ? "success" : "error"}>
      {message}
    </div>
  )
}

export default Notification