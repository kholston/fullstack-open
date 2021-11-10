import React from 'react'

const Notification = ({messages}) => {
  if(!messages){
    return null
  }

  return (
    <div>
      {messages.map(m => <div style={{color: m.color ? m.color : 'red'}} key={m.message}>{m.message}</div>)} 
    </div>
  )
}

export default Notification
