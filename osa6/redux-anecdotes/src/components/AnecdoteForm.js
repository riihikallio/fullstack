import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => (
    <div>
        <h2>create new</h2>
        <form onSubmit={(event) => { props.store.dispatch(newAnecdote(event.target.quote.value)) }}>
            <div><input name="quote" /></div>
            <button>create</button>
        </form>
    </div>
)

export default AnecdoteForm