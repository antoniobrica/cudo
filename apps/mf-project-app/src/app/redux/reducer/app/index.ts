import { combineReducers } from 'redux'

import projectAppReducer from './project.app.reducer'

const reducer = combineReducers({
  selectedProject: projectAppReducer  
})

export default reducer
