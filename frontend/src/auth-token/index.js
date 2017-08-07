let store = window.localStorage;

export function get() {
  return store.getItem('authToken');
}

export function set(value) {
  store.setItem('authToken', value);
}
