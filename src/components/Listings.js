import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Listing from './Listing'

import { fetchListings } from '../actions/listingActions'

class Listings extends Component {
  componentWillMount () {
    this.props.fetchListings('r/redditdev/hot')
  }

  renderListings () {
    const { listings } = this.props.listings
    if (listings && listings.data) {
      return listings.data.children.map(listing => {
        return (
          <Listing
            content={listing.data.selftext}
            key={listing.data.id}
            title={listing.data.title}
          />
        )
      })
    }
    return null
  }

  render () {
    return (
      <div>
        Listings
        <div>
          {this.props.listings.isFetching && 'Fetching listings...'}
        </div>
        {this.renderListings()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listings: state.listings,
    isFetching: state.isFetching
  }
}

Listings.propTypes = {
  fetchListings: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { fetchListings })(Listings)
