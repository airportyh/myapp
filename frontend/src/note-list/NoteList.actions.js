import api from '../api';
import debounce from 'lodash.debounce';
import params from '../query-params';

function error(err) {
  return {
    type: 'error',
    error: err.message
  };
}

function notes(data) {
  return {
    type: 'notes',
    payload: data
  };
}

function newNote(note) {
  return {
    type: 'new-note',
    note: note
  };
}

export function addNote(history) {
  return function(dispatch, getState) {
    let state = getState();
    let token = state.login.token;
    let note = {
      title: '',
      text: ''
    };
    api.post('/api/notes', token, note)
      .then(data => {
        dispatch(newNote(data));
        history.push(`/note/${data.id}`);
      })
      .catch(err => dispatch(error(err)));
  };
}

export function changeQ(q) {
  return {
    type: 'change-q',
    value: q
  };
}

export function more(q, pageIndex, pageSize) {
  return function(dispatch, getState) {
    let state = getState();
    let token = state.login.token;
    let limit = ((pageIndex + 2) * pageSize) + 1;
    realSearch(token, q, 0, limit, dispatch);
    dispatch({ type: 'more' });
  }
}

const realSearch = debounce((token, q, offset, limit, dispatch) =>
  api.get('/api/notes/search?' + params({ q, offset, limit }), token)
    .then(data => dispatch(notes(data)))
    .catch(err => dispatch(error(err)))
, 250);

export function search(q, pageIndex, pageSize) {
  return function(dispatch, getState) {
    let state = getState();
    let token = state.login.token;
    let limit = ((pageIndex + 1) * pageSize) + 1;
    realSearch(token, q, 0, limit, dispatch);
  };
}
