import {
  FETCH_TOKEN_FAILURE,
  FETCH_TOKEN_REQUEST,
  FETCH_TOKEN_SUCCESS,
  GET_AUTH_STATE
} from '../actions/types'

const initialState = {
  authState: '',
  isAuthenticated: false,
  isFetching: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_STATE:
      return {
        ...state,
        authState: action.payload
      }
    case FETCH_TOKEN_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false
      }
    case FETCH_TOKEN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false
      }
    default:
      return state
  }
}

export default authReducer
