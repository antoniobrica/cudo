import { combineReducers } from 'redux'

import companyAppReducer from './company.app.reducer'
import projectAppReducer from './project.app.reducer'

const reducer = combineReducers({
  selectedCompany: companyAppReducer,
  selectedProject: projectAppReducer  
})

export default reducer
