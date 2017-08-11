import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './NoteList.actions';
import { Link } from 'react-router-dom';

class NoteList extends React.Component {
  componentDidMount() {
    this.props.search(this.props.q, this.props.pageIndex, this.props.pageSize);
  }
  addNote() {
    this.props.addNote(this.props.history);
  }
  changeQ(q) {
    this.props.changeQ(q);
    this.props.search(q, this.props.pageIndex, this.props.pageSize);
  }
  more() {
    this.props.more(this.props.q, this.props.pageIndex, this.props.pageSize);
  }
  render() {
    let notes = this.props.notes;
    let maybeMore;
    let numItems = (this.props.pageIndex + 1) * this.props.pageSize;
    let hasMore = notes.length > numItems;
    if (hasMore) {
      notes = notes.slice(0, numItems);
      maybeMore =
        <li>
          <button className="more"
            onClick={() => this.more()}>
            More
          </button>
        </li>;
    }
    let errorDisplay = this.props.error ?
      <div className="error">{this.props.error}</div> :
      null;
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
        {errorDisplay}
        <ul className="notes">
          {notes.map(note =>
            <li key={note.id}>
              <Link to={`/note/${note.id}`}>
                {note.title ? note.title : <span className="info">Untitled</span> }
              </Link>
            </li>
          )}
          {maybeMore}
        </ul>
      </div>
    );
  }
}

const NoteListContainer = ReactRedux.connect(
  state => state.noteList,
  actions
)(NoteList);

export default NoteListContainer;
