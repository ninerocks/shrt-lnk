import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {
  render() {
    return (
      <div className="boxed-view">
        <div className="box">
          <h1>Page Not Found</h1>
          <p>Hmmmm, we're unable to find that page.</p>
          <Link className="button" to="/">HEAD HOME</Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
