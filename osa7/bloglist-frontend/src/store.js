import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import bReducer from './reducers/blogReducer'
import nReducer from './reducers/notificationReducer'
import uReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: bReducer,
  notification: nReducer,
  users: uReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store