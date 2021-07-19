import { combineReducers } from 'redux'

import errorReducer from './error.reducer'
import appReducer from './app'


const reducers = combineReducers({ 
  error: errorReducer,
  app: appReducer
})


export { reducers }
