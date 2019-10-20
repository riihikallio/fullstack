import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (id, content) => {
        props.store.dispatch(addNotification('You voted for "' + content +'"'))
        props.store.dispatch(voteFor(id))
        setTimeout(() => {
            props.store.dispatch(addNotification(null))
          }, 5000)
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            {props.store.getState().anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>)}
        </div>
    )
}

export default AnecdoteList