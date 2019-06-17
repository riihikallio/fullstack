import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))

  const voteHandler = () => {
    const copy = [...votes]
    copy[selected]++
    if (copy[selected] > max) {
      max = copy[selected]
      most = selected
    }
    setVote(copy)
  }

  return (
    <div>
      <h1>Anecdote fo the day</h1>
      <p>{props.anecdotes[selected]}<br />
      has {votes[selected]} votes</p>
      <button onClick={voteHandler}>
        vote
      </button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[most]}<br />
      has {max} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

let max = 0
let most = 0

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
