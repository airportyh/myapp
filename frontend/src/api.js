let baseURL;

if (window.location.hostname === 'localhost') {
  baseURL = 'http://localhost:4000';
} else if (window.location.hostname === '192.168.1.234') {
  baseURL = 'http://192.168.1.234:4000';
} else {
  baseURL = '';
}

let api = {
  get(path, token) {
    return fetch(`${baseURL}${path}`, {
      headers: {
        'Auth-Token': token
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
  post(path, token, data) {
    return fetch(`${baseURL}${path}`, {
      method: 'POST',
      headers: {
        'Auth-Token': token,
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
  put(path, token, data) {
    return fetch(`${baseURL}${path}`, {
      method: 'PUT',
      headers: {
        'Auth-Token': token,
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
  delete(path, token) {
    return fetch(`${baseURL}${path}`, {
      method: 'DELETE',
      headers: {
        'Auth-Token': token,
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
