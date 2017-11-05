import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

class Signup extends React.Component {
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
    if (password.length < 8) {
      return this.setState({ error: 'Password must be at least 8 characters long.'});
    }
    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="box">
          <h1>Signup to Short Lnk</h1>
          { this.state.error && <p>{ this.state.error }</p> }
          <form onSubmit={ this.onSubmit } noValidate>
            <input type="email" name="email" placeholder="Email" ref={ (value) => { this.emailInput = value } } />
            <input type="password" name="password" placeholder="Password" ref={ (value) => { this.passwordInput = value } } />
            <button>Create Account</button>
          </form>
          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
}

export default Signup;
