import api from '../api';
import cookies from 'js-cookie';

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

export function login(password, history) {
  return function(dispatch) {
    api.post(`/api/login`, null, {
      password: password
    })
    .then(info => {
      cookies.set('authToken', info.token);
      dispatch(loginToken(info));
      history.push('/notes');
    })
    .catch(err => dispatch(error(err)));
  };
}
