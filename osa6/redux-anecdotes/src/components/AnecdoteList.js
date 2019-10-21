import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        props.setNotification(`You voted for "${anecdote.content}"`, 10)
        props.voteFor(anecdote)
    }

    return (
        <div>
            {props.filtered.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>)}
        </div>
    )
}

const filtered = ({ anecdotes, filter }) => {
    if (!filter) {
        return anecdotes.sort((a, b) => b.votes - a.votes)
    } else {
        return anecdotes.filter(a => a.content.includes(filter)).sort((a, b) => b.votes - a.votes)
    }
}

const mapStateToProps = (state) => {
    // joskus on hyödyllistä tulostaa mapStateToProps:ista...
    console.log(state)
    return {
        filtered: filtered(state),
        filter: state.filter
    }
}

const mapDispatchToProps = {
    voteFor,
    setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes