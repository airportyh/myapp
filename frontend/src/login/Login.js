import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Login.actions';
import { Form, PasswordField, SubmitButton } from '../form';

class Login extends React.Component {
  submit(values) {
    let password = values.password;
    let from = this.props.location.state && this.props.location.state.from.pathname;
    this.props.login(password, from, this.props.history);
  }
  render() {
    return (
      <div>
        <h1>Log In: {this.props.token}</h1>
        <div>{this.props.message}</div>
        <Form onSubmit={values => this.submit(values)}>
          <div className="error">{this.props.error}</div>
          <div>
            <label>What is the password?</label><br/>
            <PasswordField label="What is the password?" propName="password"/>
          </div>
          <SubmitButton>Enter</SubmitButton>
        </Form>
      </div>
    );
  }
}

const LoginContainer = ReactRedux.connect(
  state => state.login,
  actions
)(Login);

export default LoginContainer;
