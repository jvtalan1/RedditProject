import { FETCH_LISTINGS_FAILURE, FETCH_LISTINGS_REQUEST, FETCH_LISTINGS_SUCCESS } from '../actions/types'

const initialState = {
  listings: null,
  isFetching: false
}

const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LISTINGS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_LISTINGS_SUCCESS:
      return {
        ...state,
        listings: action.payload,
        isFetching: false
      }
    case FETCH_LISTINGS_FAILURE:
      return {
        ...state,
        listings: action.payload,
        isFetching: false
      }
    default:
      return state
  }
}

export default listingReducer
