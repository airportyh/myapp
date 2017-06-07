import baseURL from '../baseURL';

export function fetchFriends(token) {
  return fetch(`${baseURL}/api/friends`, {
    headers: {
      'Auth-Token': token
    }
  })
  .then(resp => resp.json())
  .then(data => ({
    type: 'friends',
    friends: data
  }));
}
