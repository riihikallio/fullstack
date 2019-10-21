import dbService from '../services/anecdotes'

export const voteFor = (anecdote) => {
  return async dispatch => {
    const updA = await dbService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updA
    })
  }
}

export const addAnecdote = (obj) => {
  return async dispatch => {
    const newA = await dbService.createNew(obj.content)
    dispatch({
      type: 'ADD',
      data: newA
    })
  }
}

export const initAnecdotes = (list) => {
  return async dispatch => {
    const anecdotes = await dbService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

const aReducer = (state = [], action) => {
  console.log('state: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      return state.map(a => a.id !== action.data.id ? a : action.data)
    case 'ADD':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default: return state
  }
}

export default aReducer