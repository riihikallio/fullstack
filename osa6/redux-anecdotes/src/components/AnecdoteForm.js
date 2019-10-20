import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const add = (event) => {
        event.preventDefault()
        props.addNotification('You added "' + event.target.quote.value +'"')
        props.addAnecdote(event.target.quote.value)
        setTimeout(() => {
            props.addNotification(null)
          }, 5000)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(event) => { add(event) }}>
                <div><input name="quote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    addAnecdote,
    addNotification
}
  
  const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm