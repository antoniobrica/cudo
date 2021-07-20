// import { Action } from 'rxjs/internal/scheduler/Action'
import { projectAction } from '../../actions'

const initialState = {
  selectedProjectId: null,
  company: "Sftobiz_1234" // localStorage ? JSON.parse(localStorage.getItem('selectedCompany')) : "dapr"
}

export default function projectAppReducer(state = initialState, action) {
  switch (action.type) {
    case projectAction.SELECT_PROJECT_ID:
      return { ...state, selectedProjectId: action.payload }
    default:
      return state
  }
}
