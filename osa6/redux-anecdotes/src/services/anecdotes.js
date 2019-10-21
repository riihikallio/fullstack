import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 })
  return response.data
}

const vote = (anecdote) => {
  return axios.put(`${baseUrl}/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1})
    .then(response => response.data)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { createNew, vote, getAll }