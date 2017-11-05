import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value.trim();
    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password.' });
      } else {
        this.setState({ error: '' });
      };
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="box">
          <h1>Short Lnk</h1>
          { this.state.error && <p>{ this.state.error }</p> }
          <form onSubmit={ this.onSubmit } noValidate>
            <input type="email" name="email" placeholder="Email" ref={ (value) => { this.emailInput = value } } />
            <input type="password" name="password" placeholder="Password" ref={ (value) => { this.passwordInput = value } } />
            <button type="submit">Login</button>
          </form>
          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
}

export default Login;
