import api from '../api';
import debounce from 'lodash.debounce';

export function fetchNote(id) {
  return function(dispatch, getState) {
    let state = getState();
    let token = state.login.token;
    api.get(`/api/note/${id}`, token)
      .then(data => dispatch(setNote(data)))
      .catch(err => dispatch(error(err)));
  };
}

export function setNote(note) {
  return {
    type: 'note',
    payload: note
  };
}

function error(err) {
  return {
    type: 'error',
    error: err.message
  };
}

const realUpdateNote = debounce((note, getState, history, dispatch) => {
  let state = getState();
  let token = state.login.token;
  let data = {
    title: note.title,
    text: note.text
  };
  dispatch({ type: 'push-update' });
  return api.put('/api/note/' + note.id, token, data)
    .then(data => {
      dispatch({ type: 'pop-update' });
    })
    .catch(err => dispatch(error(err)));
}, 500);

export function updateNote(note, history) {
  return function(dispatch, getState) {
    dispatch({ type: 'dirty' });
    realUpdateNote(note, getState, history, dispatch);
  };
}

export function deleteNote() {
  return function(dispatch, getState) {
    let state = getState();
    let note = state.note.note;
    let token = state.login.token;
    api.delete(`/api/note/${note.id}`, token)
      .catch(err => dispatch(error(err)));
  };
}
