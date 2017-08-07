import api from '../api';
import * as authToken from '../auth-token';

function error(err) {
  return {
    type: 'error',
    error: err.message
  };
}

function loginToken(info) {
  return {
    type: 'login-token',
    token: info.token
  };
}

export function login(password, redirectTo, history) {
  return function(dispatch) {
    dispatch({ type: 'message', message: 'Dispatching' });
    api.post(`/api/login`, null, {
      password: password
    })
    .then(info => {
      authToken.set(info.token);
      dispatch(loginToken(info));
      history.push(redirectTo || '/');
    })
    .catch(err => dispatch(error(err)));
  };
}
