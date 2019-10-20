import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (id, content) => {
        props.store.dispatch(addNotification('You voted for "' + content + '"'))
        props.store.dispatch(voteFor(id))
        setTimeout(() => {
            props.store.dispatch(addNotification(null))
        }, 5000)
    }

    const { anecdotes, filter } = props.store.getState()
    let filtered
    if (!filter) {
        filtered = anecdotes
    } else {
        filtered = anecdotes.filter(a => a.content.includes(filter))
    }


    console.log("Suodatettu", filtered)

    return (
        <div>
            {filtered.sort((a, b) => b.votes - a.votes).map(anecdote =>
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