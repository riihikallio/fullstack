export const setNotification = (text, time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: 'NOTE', data: null })
    }, time * 1000)
    dispatch({
      type: 'NOTE',
      data: text,
    })
  }
}

const nReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTE':
      return action.data
    default:
      return state
  }
}

export default nReducer