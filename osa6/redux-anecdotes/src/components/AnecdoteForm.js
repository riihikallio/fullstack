import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => (
    <div>
        <h2>create new</h2>
        <form onSubmit={(event) => { event.preventDefault(); props.store.dispatch(addAnecdote(event.target.quote.value)) }}>
            <div><input name="quote" /></div>
            <button>create</button>
        </form>
    </div>
)

export default AnecdoteForm