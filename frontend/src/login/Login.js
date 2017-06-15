import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Login.actions';

class Login extends React.Component {
  submit(event) {
    event.preventDefault();
    let password = this.password.value;
    this.props.login(password, this.props.history);
  }
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form className="login content" onSubmit={event => this.submit(event)}>
          <div>
            <label>What's the password?</label><br/>
            <input type="password"
              ref={input => this.password = input}/>
          </div>
          <button type="submit">Enter</button>
        </form>
      </div>
    );
  }
}

const LoginContainer = ReactRedux.connect(
  null,
  actions
)(Login);

export default LoginContainer;
