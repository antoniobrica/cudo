import { combineReducers } from 'redux'

import projectAppReducer from './project.app.reducer'

const reducer = combineReducers({
  project: projectAppReducer  
})

export default reducer
