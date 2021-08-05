import React from'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)


  if(notification){
    return(
      <div
        className={notification.notificationType}>
        {notification.content}
      </div>
    )
  } else {
    return null
  }
}
export default Notification