import api from '../api';

function error(err) {
  return {
    type: 'error',
    error: err.message
  };
}

function loginSuccess(info) {
  return {
    type: 'login-success',
    info: info
  };
}

export function login(password, history) {
  return function(dispatch) {
    api.post(`/api/login`, null, {
      password: password
    })
    .then(info => {
      dispatch(loginSuccess(info));
      history.push('/notes');
    })
    .catch(err => dispatch(error(err)));
  };
}
