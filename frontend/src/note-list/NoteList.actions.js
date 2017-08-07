import api from '../api';
import debounce from 'lodash.debounce';

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

export function fetchNoteList(token) {
  return function(dispatch) {
    api.get('/api/notes', token)
      .then(data => dispatch(notes(data)))
      .catch(err => dispatch(error(err)));
  };
}

function newNote(note) {
  return {
    type: 'new-note',
    note: note
  };
}

export function addNote(token, history) {
  return function(dispatch) {
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

const realSearch = debounce((token, q, dispatch) =>
  api.get('/api/notes/search?q=' + escape(q), token)
    .then(data => {
      dispatch(notes(data))
    })
    .catch(err => dispatch(error(err)))
, 250);

export function search(q, token) {
  return function(dispatch) {
    realSearch(token, q, dispatch);
  };
}
