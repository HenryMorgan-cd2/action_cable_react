import { combineReducers, applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { createLogger } from "redux-logger"

import reducers from "../reducers/table_reducer"

import { action_cable_reducer, action_cable_middleware } from 'utils/action_cable'


const allReducers = combineReducers({
  ...reducers,
  connections: action_cable_reducer,
})

const middleware = applyMiddleware(action_cable_middleware, thunk, createLogger())

export default createStore(allReducers, middleware)
