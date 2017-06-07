import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Login.actions';

class Login extends React.Component {
  submit(event) {
    event.preventDefault();
    let password = this.password.value;
    this.props.login(password);
  }
  render() {
    return (
      <form onSubmit={event => this.submit(event)}>
        <h1>Log In</h1>
        <div>
          <label>What's the password?</label><br/>
          <input type="password"
            ref={input => this.password = input}/>
        </div>
        <button type="submit">Enter</button>
      </form>
    );
  }
}

const LoginContainer = ReactRedux.connect(
  null,
  actions
)(Login);

export default LoginContainer;
