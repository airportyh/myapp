import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './NoteList.actions';
import { Link } from 'react-router-dom';

class NoteList extends React.Component {
  componentDidMount() {
    if (this.props.authToken) {
      console.log('fetching from mount');
      this.props.fetchNoteList(this.props.authToken);
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.authToken !== this.props.authToken) {
      console.log('fetching from receive');
      this.props.fetchNoteList(newProps.authToken);
    }
  }
  addNote() {
    this.props.addNote(
      this.props.authToken,
      this.props.history);
  }
  render() {
    return (
      <div>
        <h1>
          Notes
          <button onClick={() => this.addNote()}>
            +
          </button>
        </h1>
        <ul className="notes">
          {this.props.notes.map(note =>
            <li key={note.id}>
              <Link to={`/note/${note.id}`}>
                {note.title}
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const NoteListContainer = ReactRedux.connect(
  state => ({
    authToken: state.login.token,
    ...state.noteList
  }),
  actions
)(NoteList);

export default NoteListContainer;
