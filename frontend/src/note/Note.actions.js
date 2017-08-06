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

const realUpdateNote = debounce((getState, token, history, dispatch) => {
  let note = getState().note.note;
  return api.put('/api/note/' + note.id, token, note)
    .then(data => {
      dispatch(setNote(data));
    })
    .catch(err => dispatch(error(err)));
}, 500);

export function updateNote(note, token, history) {
  return function(dispatch, getState) {
    realUpdateNote(getState, token, history, dispatch);
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
