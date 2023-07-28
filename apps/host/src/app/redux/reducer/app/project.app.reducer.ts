import { taskActions } from '../../actions'

const initialState = {
  selectedProjectId: null 
}

export default function projectAppReducer(state = initialState, action) {
  switch (action.type) {
     case taskActions.SELECT_PROJECT_ID:
      return {
        ...state, 
        selectedProjectId: action.payload
      }
    default:
      return state
  }
}
