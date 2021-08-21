import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhileVisible = { display: visible ? 'none' : '' }
  const showWhileVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return(
    <div className="mt-3 mb-3">
      <div style={hideWhileVisible}>
        <Button variant="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhileVisible}>
        {props.children}
        {/* <button onClick={toggleVisibility}>cancel</button> */}
        <Button variant="secondary" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable