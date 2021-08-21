import React from'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)


  if(notification){
    return(
      // <div
      //   className={notification.notificationType}>
      //   {notification.content}
      // </div>
      <Alert variant={notification.notificationType}>
        {notification.content}
      </Alert>
    )
  } else {
    return null
  }
}
export default Notification