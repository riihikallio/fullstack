import userService from '../services/users'

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'LIST',
      data: users,
    })
  }
}

const uReducer = (state = '', action) => {
  switch (action.type) {
  case 'LIST':
    return action.data
  default:
    return state
  }
}

export default uReducer