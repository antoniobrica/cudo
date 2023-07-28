import { taskActions } from '../../actions'

const initialState = {
  loggedUserEmail : localStorage.getItem("email") ,
  loggedUserID: null,
  loggedUserName: null,
  loggedUserProfileURL: null
}

export default function loggedUserAppReducer(state = initialState, action) {
  switch (action.type) {
     case taskActions.LOGGED_USER_EMAIL:
      return {
        ...state, 
        loggedUserEmail: localStorage.getItem("email") 
      }
      case taskActions.LOGGED_USER_ID:
      return {
        ...state, 
        loggedUserID: action.payload
      }
      case taskActions.LOGGED_USER_NAME:
      return {
        ...state, 
        loggedUserName: action.payload
      }
      case taskActions.LOGGED_USER_PROFILE_URL:
      return {
        ...state, 
        loggedUserProfileURL: action.payload
      }
    default:
      return state
  }
}
