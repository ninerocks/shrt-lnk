import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';
import moment from 'moment';

class LinkListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCopied: false,
    };
  }

  renderStats = () => {
    const { visitedCount, lastVisitedAt } = this.props;
    const visitMessage = (visitedCount === 1) ? 'visit' : 'visits';
    let visitedMessage = null;
    if (typeof lastVisitedAt === 'number') {
      visitedMessage = `(last visited ${ moment(lastVisitedAt).fromNow() })`;
    }
    return (
      <p className="message">{ `${visitedCount} ${visitMessage}` } { visitedMessage }</p>
    );
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.copyTextButton);
    this.clipboard.on('success', () => {
      this.setState({ isCopied: true });
      window.setTimeout(() => this.setState({ isCopied: false }), 1000);
    }).on('error', () => {
      alert('Could not copy to clipboard. Please copy manually.');
      this.setState({ isCopied: false });
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    const copyButtonText = (this.state.isCopied) ? 'Copied' : 'Copy';
    return (
      <div className="item">
        <h2>{ this.props.url }</h2>
        <p className="message">{ this.props.shortUrl }</p>
        { this.renderStats() }
        <a className="button pill" href={ this.props.shortUrl } target="_blank">Visit</a>
        <button className="pill" ref={ (el) => this.copyTextButton = el } data-clipboard-text={ this.props.shortUrl }>{ copyButtonText }</button>
        <button className="pill" onClick={() => Meteor.call('links.setVisibility', this.props._id, !this.props.visible) }>{ this.props.visible ? 'Hide' : 'Unhide' }</button>
      </div>
    );
  }
}

LinkListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number,
};

export default LinkListItem;
