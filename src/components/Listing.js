import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'

class Listing extends PureComponent {
  render () {
    const { content, title } = this.props
    return (
      <div>
        <h4>{title}</h4>
        <Markdown escapeHtml={false} source={content} />
      </div>
    )
  }
}

Listing.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string
}

export default Listing
