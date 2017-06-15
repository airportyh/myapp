import api from '../api';
import debounce from 'lodash.debounce';

export function fetchNote(id, token) {
  return function(dispatch) {
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

export function setEditMode(value) {
  return {
    type: 'set-edit-mode',
    value: value
  };
}

export function change(prop, value) {
  return {
    type: 'change',
    prop: prop,
    value: value
  };
}

function error(err) {
  return {
    type: 'error',
    error: err.message
  };
}

const realUpdateNote = debounce((note, token, history, dispatch) => {
  return api.put('/api/note/' + note.id, token, note)
    .then(data => {
      dispatch(setNote(data));
    })
    .catch(err => dispatch(error(err)));
}, 500);

export function updateNote(note, token, history) {
  return function(dispatch) {
    realUpdateNote(note, token, history, dispatch);
  };
}
