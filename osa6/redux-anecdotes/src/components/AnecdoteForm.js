import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const add = async (event) => {
        event.preventDefault()
        props.setNotification(`You added "${event.target.quote.value}"`, 10)
        props.addAnecdote(event.target.quote.value)
        event.target.quote.value = ''
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(event) => { event.persist(); add(event) }}>
                <div><input name="quote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    addAnecdote,
    setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm