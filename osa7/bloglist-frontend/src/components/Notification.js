import React from 'react'
import { connect } from 'react-redux'
import { Container, Message } from 'semantic-ui-react'

const Notification = ({ notification }) => {
  if (notification) {
    return <Container>
      <Message error>
        {notification}
      </Message>
    </Container>
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state)
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification