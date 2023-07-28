import { combineReducers } from 'redux'

import companyAppReducer from './company.app.reducer'
import projectAppReducer from './project.app.reducer'
import loggedUserAppReducer from './loggedUser.app.reducer'

const reducer = combineReducers({
  selectedCompany: companyAppReducer,
  selectedProject: projectAppReducer, 
  loggedUserDetail: loggedUserAppReducer
})

export default reducer
