import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

import {
  FETCH_TOKEN_FAILURE,
  FETCH_TOKEN_REQUEST,
  FETCH_TOKEN_SUCCESS,
  GET_AUTH_STATE
} from './types'

import { generateRandomString } from '../utils/helpers'
import { REDDIT_CLIENT_ID, REDDIT_REDIRECT_URI, REDDIT_SECRET } from '../variables/globals'

export const fetchToken = postData => {
  let url = 'https://www.reddit.com/api/v1/access_token'

  if (postData.grantType) {
    url += `?grant_type=${postData.grantType}`

    // Retrieving the access token
    if (postData.grantType === 'authorization_code') {
      if (postData.code) {
        url += `&code=${postData.code}`
      } else {
        throw new Error('code missing from postData')
      }

      if (postData.redirectURI) {
        url += `&redirect_uri=${postData.redirectURI}`
      } else {
        throw new Error('redirectURI missing form postData')
      }
    }

    // Refreshing the token
    if (postData.grantType === 'refresh_token') {
      if (postData.refreshToken) {
        url += `&refresh_token=${postData.refreshToken}`
      } else {
        throw new Error('refreshToken missing from postData')
      }
    }
  } else {
    throw new Error('grantType missing from postData.')
  }

  const config = {
    auth: {
      username: REDDIT_CLIENT_ID,
      password: REDDIT_SECRET
    },
    method: 'POST',
    url
  }

  return axios(config)
}

export const initializeToken = code => dispatch => {
  dispatch({ type: FETCH_TOKEN_REQUEST })
  return fetchToken({
    grantType: 'authorization_code',
    redirectURI: REDDIT_REDIRECT_URI,
    code
  })
    .then(({ data }) => {
      const payload = camelcaseKeys(data)
      localStorage.setItem('updatedAt', Date.now() / 1000)

      if (payload && payload.error) {
        dispatch({ type: FETCH_TOKEN_FAILURE, error: payload.error })
      } else {
        for (let i in payload) {
          localStorage.setItem(i, payload[ i ])
        }
        dispatch({ type: FETCH_TOKEN_SUCCESS, payload })
      }
    })
    .catch(error => {
      dispatch({ type: FETCH_TOKEN_FAILURE, error })
    })
}

export const getAuthState = () => dispatch => {
  let authState = localStorage.getItem('authState')
  if (!authState) {
    authState = localStorage.setItem('authState', generateRandomString(12))
  }
  dispatch({
    type: GET_AUTH_STATE,
    payload: authState
  })
}
