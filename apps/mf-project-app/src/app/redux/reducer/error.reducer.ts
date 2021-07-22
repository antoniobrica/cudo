import { RESET_ERROR_MESSAGE } from '../actions'

export default function errorReducer(state = '', action) {
  const { type, error } = action
  if (type === RESET_ERROR_MESSAGE) {
    return ''
  } else if (error) {
    return error
  }
  return state
}
