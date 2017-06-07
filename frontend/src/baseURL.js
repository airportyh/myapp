let baseURL;

if (window.location.hostname === 'localhost') {
  baseURL = 'http://localhost:4000';
} else {
  baseURL = '';
}

export default baseURL;
