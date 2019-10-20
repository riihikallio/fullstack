import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.store.getState().notification) {
    return <div style={style}>
      {props.store.getState().notification}
    </div>
  } else {
    return null
  }
}

export default Notification