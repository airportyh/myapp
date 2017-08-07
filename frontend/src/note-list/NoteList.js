import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './NoteList.actions';
import { Link } from 'react-router-dom';
import cookies from 'js-cookie';

class NoteList extends React.Component {
  componentDidMount() {
    let authToken = cookies.get('authToken');
    if (!authToken) {
      this.props.history.push('/login');
      return;
    }
    if (this.props.authToken) {
      this.props.search(this.props.q, this.props.authToken);
    }
  }
  addNote() {
    this.props.addNote(
      this.props.authToken,
      this.props.history);
  }
  changeQ(q) {
    this.props.changeQ(q);
    setTimeout(() => this.props.search(q, this.props.authToken));
  }
  render() {
    return (
      <div>
        <div className="header">
          <button onClick={() => this.addNote()}>
            +
          </button>
          <h1>Notes</h1>
        </div>
        <input type="search" placeholder="Search"
          value={this.props.q}
          onChange={event => this.changeQ(event.target.value)}/>
        <ul className="notes">
          {this.props.notes.map(note =>
            <li key={note.id}>
              <Link to={`/note/${note.id}`}>
                {note.title ? note.title : <span className="info">Untitled</span> }
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
    ...state.noteList,
    authToken: state.login.token
  }),
  actions
)(NoteList);

export default NoteListContainer;
