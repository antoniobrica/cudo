import { RESET_ERROR_MESSAGE //, authAction 
} from '../actions'

export default function errorReducer(state = '', action) {
  const { type, error } = action
  if (type === RESET_ERROR_MESSAGE 
    //|| type === authAction.LOGOUT_SUCCESS
    ) {
    return ''
  } else if (error) {
    return error
  }
  return state
}
