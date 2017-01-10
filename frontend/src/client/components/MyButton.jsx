import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap';

const MyButton = ({ active, children, onClick }) => {
  if (active) {
    return <Button>{children}</Button>
  }

  return (
    <Button
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </Button>
  )
}

MyButton.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MyButton
