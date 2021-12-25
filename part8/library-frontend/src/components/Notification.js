import React from 'react'

const Notification = ({notifications}) => {
  if(!notifications.length){
    return null
  }

  return (
    <div>
      {notifications.map(m => <div style={{color: (m.color ? m.color : 'red')}} key={new Date()}>{m.message}</div>)} 
    </div>
  )
}

export default Notification
