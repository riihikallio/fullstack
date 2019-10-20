import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => (
    <div>
        <h2>Anecdotes</h2>
        {props.store.getState().sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => props.store.dispatch(voteFor(anecdote.id))}>vote</button>
                </div>
            </div>)}
    </div>
)

export default AnecdoteForm