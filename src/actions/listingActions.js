import axios from 'axios'

import { FETCH_LISTINGS_FAILURE, FETCH_LISTINGS_REQUEST, FETCH_LISTINGS_SUCCESS } from './types'

const accessToken = localStorage.getItem('accessToken')

export const fetchListings = (endpoint) => (dispatch) => {
  const config = {
    headers: { 'Authorization': `bearer ${accessToken}` },
    method: 'GET',
    url: `https://oauth.reddit.com/${endpoint}`
  }

  dispatch({ type: FETCH_LISTINGS_REQUEST })
  axios(config)
    .then(({ data }) => {
      dispatch({ type: FETCH_LISTINGS_SUCCESS, payload: data })
    })
    .catch(error => {
      dispatch({ type: FETCH_LISTINGS_FAILURE, payload: error })
    })
}
