import api from '../api';
import { BrowserRouter } from 'react-router-dom';

console.log('browser router history', (new BrowserRouter()).history);

function error(err) {
  return {
    type: 'error',
    error: err.message
  };
}

export function fetchNoteList(token) {
  return function(dispatch) {
    api.get('/api/notes', token)
      .then(data => dispatch({
        type: 'notes',
        payload: data
      }))
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
        history.push(`/note/${data.id}`);
        dispatch(newNote(data));
      })
      .catch(err => dispatch(error(err)));
  };
}
