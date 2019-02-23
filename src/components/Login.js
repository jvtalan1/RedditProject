import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { parse } from 'query-string'
import { connect } from 'react-redux'

import { getAuthState, initializeToken } from '../actions/authActions'
import { REDDIT_CLIENT_ID, REDDIT_REDIRECT_URI } from '../variables/globals'

const authorizationURL = 'https://www.reddit.com/api/v1/authorize' +
  `.compact?client_id=${REDDIT_CLIENT_ID}` +
  `&response_type=code&state=${localStorage.getItem('authState')}` +
  `&redirect_uri=${REDDIT_REDIRECT_URI}` +
  '&duration=permanent&scope=read'

class Login extends Component {
  constructor (props) {
    super(props)
    this.authState = localStorage.getItem('authState')
    this.state = {
      data: [],
      width: null
    }
  }

  componentWillMount () {
    const { auth, history } = this.props

    this.props.getAuthState()
    if (auth.isAuthenticated) {
      history.push('/')
    }
  }

  componentDidMount () {
    const { state, code } = parse(this.props.location.search)
    if (state && code) {
      if (state === localStorage.getItem('authState')) {
        this.props.initializeToken(code)
      } else {
        console.error('Invalid authorization code')
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div>
        <a href={authorizationURL}>Login</a>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

Login.propTypes = {
  auth: PropTypes.object,
  getAuthState: PropTypes.func.isRequired,
  history: PropTypes.object,
  initializeToken: PropTypes.func,
  location: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getAuthState, initializeToken })(Login)
