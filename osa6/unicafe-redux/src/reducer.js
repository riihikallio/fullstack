const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const incGood = {...state, good: state.good + 1 }
      return incGood
    case 'OK':
        const incOK = {...state, ok: state.ok + 1 }
        return incOK
    case 'BAD':
        const incBad = {...state, bad: state.bad + 1 }
        return incBad
    case 'ZERO':
        return initialState
    default: return state
  }
  
}

export default counterReducer