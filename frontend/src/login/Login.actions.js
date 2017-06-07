import baseURL from '../baseURL';

export function login(password) {
  return fetch(`${baseURL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password
    })
  })
  .then(resp => resp.json())
  .then(info => ({
    type: 'login-success',
    info: info
  }));
}
