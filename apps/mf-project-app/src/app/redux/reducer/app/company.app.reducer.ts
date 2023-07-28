import { projectAction } from '../../actions'

const initialState = {
  selectedCompanyId: localStorage.getItem('selectedCompany')
}

export default function companyAppReducer(state = initialState, action) {
  switch (action.type) {
    case projectAction.SELECT_COMPANY_ID:
      return {
        ...state,
        selectedCompanyId: localStorage.getItem('selectedCompany')
      }
    default:
      return state
  }
}
