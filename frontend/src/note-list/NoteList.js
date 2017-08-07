import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './NoteList.actions';
import { Link } from 'react-router-dom';

class NoteList extends React.Component {
  componentDidMount() {
    if (this.props.authToken) {
      this.props.search(this.props.q, this.props.authToken);
    }
  }
  addNote() {
    this.props.addNote(this.props.authToken, this.props.history);
  }
  changeQ(q) {
    this.props.changeQ(q);
    this.props.search(q, this.props.authToken);
  }
  render() {
    return (
      <div>
        <div className="header">
          <button className="add-button" onClick={() => this.addNote()}>
            +
          </button>
          <h1>Notes</h1>
        </div>
        <input type="text" placeholder="Search"
          value={this.props.q}
          className="search-field"
          onChange={event => this.changeQ(event.target.value)}/>
        { this.props.error ? <div className="error">{this.props.error}</div> : null }
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
