import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (id, content) => {
        props.addNotification('You voted for "' + content + '"')
        props.voteFor(id)
        setTimeout(() => {
            props.addNotification(null)
        }, 5000)
    }

    let filtered
    if (!props.filter) {
        filtered = props.anecdotes
    } else {
        filtered = props.anecdotes.filter(a => a.content.includes(props.filter))
    }

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

const mapStateToProps = (state) => {
    // joskus on hyödyllistä tulostaa mapStateToProps:ista...
    console.log(state)
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    voteFor,
    addNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes