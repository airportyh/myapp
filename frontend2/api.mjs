let baseURL;

if (window.location.hostname === 'localhost') {
  baseURL = 'http://localhost:4000';
} else {
  baseURL = '';
}

let globalToken = localStorage.getItem('authToken');

let api = {
  setToken(token) {
    globalToken = token;
    localStorage.setItem('authToken', token);
  },
  hasToken() {
    return !!globalToken;
  },
  get(path) {
    return fetch(`${baseURL}${path}`, {
      headers: {
        'Auth-Token': globalToken
      }
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json()
          .then(err => {
            throw new Error(err.error)
          });
      }
    });
  },
  post(path, data) {
    return fetch(`${baseURL}${path}`, {
      method: 'POST',
      headers: {
        'Auth-Token': globalToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json()
          .then(err => {
            throw new Error(err.error);
          });
      }
    });
  },
  put(path, data) {
    return fetch(`${baseURL}${path}`, {
      method: 'PUT',
      headers: {
        'Auth-Token': globalToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json()
          .then(err => {
            throw new Error(err.error);
          });
      }
    });
  },
  delete(path) {
    return fetch(`${baseURL}${path}`, {
      method: 'DELETE',
      headers: {
        'Auth-Token': globalToken,
        'Content-Type': 'application/json'
      }
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json()
          .then(err => {
            throw new Error(err.error);
          });
      }
    });
  }
};

export default api;
