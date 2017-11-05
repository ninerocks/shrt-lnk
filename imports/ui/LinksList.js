import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    }
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      this.setState({
        links: Links.find({
          visible: Session.get('showVisible')
        }).fetch(),
      });
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinks = () => {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="status">No links found.</p>
        </div>
      );
    }

    return this.state.links.map((link) => {
      link.shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={ link._id } { ...link } />;
    });
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={ true }>
          { this.renderLinks() }
        </FlipMove>
      </div>
    );
  }
}

export default LinksList;
