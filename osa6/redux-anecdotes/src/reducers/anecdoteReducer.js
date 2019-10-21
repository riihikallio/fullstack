import dbService from '../services/anecdotes'

export const voteFor = (id) => ({
  type: 'VOTE',
  data: { id }
})

export const addAnecdote = (obj) => {
  return async dispatch => {
    const newA = await dbService.createNew(obj.content)
    dispatch({
  type: 'ADD',
  data: newA
})
}}

export const initAnecdotes = (list) => {
  return async dispatch => {
    const anecdotes = await dbService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
}}

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