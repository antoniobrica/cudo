import { projectAction } from '../../actions'

const initialState = {
  selectedProjectId: null,
  selectedCompanyId: "dapr"
}

export default function projectAppReducer(state = initialState, action) {
  switch (action.type) {
    case projectAction.SELECT_PROJECT_ID:
      return {
        ...state, 
        selectedCompanyId: localStorage.getItem('selectedCompany'), // "Sftobiz_1234" 
        selectedProjectId: action.payload
      }
    default:
      return state
  }
}
