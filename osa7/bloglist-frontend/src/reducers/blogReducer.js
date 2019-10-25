import blogService from '../services/blogs'
//import store from '../store'
import setNotification from '../reducers/notificationReducer'

export const like = (blog) => {
  return async dispatch => {
    const updA = await blogService.vote(blog)
    dispatch({
      type: 'LIKE',
      data: updA
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const created = await blogService.create(blog)
    dispatch({
      type: 'ADD',
      data: created
    })
  }
}

export const initList = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

const bReducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE':
    return state.map(a => a.id !== action.data.id ? a : action.data)
  case 'ADD':
    return [...state, action.data]
  case 'INIT':
    return action.data
  default: return state
  }
}

export default bReducer