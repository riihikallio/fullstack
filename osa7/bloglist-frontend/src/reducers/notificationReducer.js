export const setNotification = (text) => {
  console.log('Notifikaatio!!', text)
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: 'NOTE', data: null })
    }, 5000)
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