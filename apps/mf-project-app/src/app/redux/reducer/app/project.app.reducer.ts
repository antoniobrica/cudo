import { projectAction } from '../../actions'

const initialState = {
  selectedProjectId: null
}

export default function projectAppReducer(state = initialState, action) {
  switch (action.type) {
     case projectAction.SELECT_PROJECT_ID:
      return {
        ...state, 
        selectedProjectId: action.payload
      }
    default:
      return state
  }
}
