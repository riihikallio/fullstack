export const filter = (text) => ({
    type: 'FILTER',
    data: text,
  })

const fReducer = (state = '', action) => {
    switch (action.type) {
      case 'FILTER':
        return action.data
      default:
        return state
    }
  }

  export default fReducer