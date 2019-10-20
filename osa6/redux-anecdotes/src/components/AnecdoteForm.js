import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const add = (event) => {
        event.preventDefault()
        props.store.dispatch(addNotification('You added "' + event.target.quote.value +'"'))
        props.store.dispatch(addAnecdote(event.target.quote.value))
        setTimeout(() => {
            props.store.dispatch(addNotification(null))
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

export default AnecdoteForm