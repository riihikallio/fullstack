import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import dbService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const add = async (event) => {
        event.preventDefault()
        props.addNotification('You added "' + event.target.quote.value + '"')
        const newA = await dbService.createNew(event.target.quote.value)
        event.target.quote.value = ''
        props.addAnecdote(newA)
        setTimeout(() => {
            props.addNotification(null)
        }, 5000)
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
    addNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm