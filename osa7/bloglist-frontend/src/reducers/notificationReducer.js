export const setNotification = (text) => {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR', data: '' })
    }, 10000)
    dispatch({
      type: 'NOTE',
      data: text ? text : 'Huuhaa'
    })
  }
}

const nReducer = (state = '', action) => {
  console.log('nReducer', action)
  console.log('nState', state)
  switch (action.type) {
  case 'NOTE':
    return action.data
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

export default nReducer