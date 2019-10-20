const getId = () => (100000 * Math.random()).toFixed(0)

export const voteFor = (id) => ({
  type: 'VOTE',
  data: { id }
})

export const addAnecdote = (object) => ({
  type: 'ADD',
  data: object
})


export const initAnecdotes = (list) => ({
  type: 'INIT',
  data: list
})

const aReducer = (state = [], action) => {
  console.log('state: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const anecdote = state.find(a => a.id === action.data.id)
      const voted = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(a => a.id !== action.data.id ? a : voted)
    case 'ADD':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default: return state
  }
}

export default aReducer