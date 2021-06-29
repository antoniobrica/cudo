import { Action } from 'rxjs/internal/scheduler/Action'
import { 
    // authAction, 
    projectAction } from '../../actions'

const initialState = {
  selectedProjectId: null,
}

export default function projectAppReducer(state = initialState, action) {
  switch (action.type) {
    case projectAction.SELECT_PROJECT_ID:
      return { ...state, selectedProjectId: action.payload }

    // case authAction.LOGOUT_SUCCESS:
    //   return initialState

    default:
      return state
  }
}
