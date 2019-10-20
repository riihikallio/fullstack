export const addNotification = (text) => ({
    type: 'NOTE',
    data: text,
  })

const nReducer = (state = '', action) => {
    switch (action.type) {
      case 'NOTE':
        return action.data
      default:
        return state
    }
  }

  export default nReducer