import blogService from '../services/blogs'

export const like = (blog) => {
  return async dispatch => {
    const tmp = { ...blog, likes: blog.likes + 1 }
    const liked = await blogService.update(tmp)
    dispatch({
      type: 'LIKE',
      data: liked
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
    return state.map(b => b.id !== action.data.id ? b : action.data)
  case 'ADD':
    return [...state, action.data]
  case 'INIT':
    return action.data
  default: return state
  }
}

export default bReducer