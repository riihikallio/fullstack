import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
}

const create = person => {
  return axios.post(baseUrl, person)
    .then(response => response.data)
}

const update = (person) => {
  return axios.put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
  }

export default {getAll, create, update, remove}