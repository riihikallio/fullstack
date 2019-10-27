import blogService from '../services/blogs'

export const likeBlog = (blog) => {
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

export const delBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: id
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
  console.log('bR-state', state)
  console.log('bR-action', action)
  let tst
  switch (action.type) {
  case 'LIKE':
    //return state.map(b => b.id !== action.data.id ? b : action.data)
    return state
  case 'ADD':
    return [...state, action.data]
  case 'DELETE':
    tst = state.filter(b => b.id !== action.data)
    console.log('TST',tst)
    return tst
  case 'INIT':
    return action.data
  default: return state
  }
}

export default bReducer