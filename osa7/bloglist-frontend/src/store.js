import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import bReducer from './reducers/blogReducer'
import nReducer from './reducers/notificationReducer'
//import fReducer from './reducers/filterReducer'

const reducer = combineReducers({
  blogs: bReducer,
  notification: nReducer,
  //filter: fReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store