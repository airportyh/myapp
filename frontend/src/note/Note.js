import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Note.actions';
import { Link } from 'react-router-dom';

class Note extends React.Component {
  componentDidMount() {
    if (this.props.authToken) {
      this.fetchNote(this.props.authToken);
    }
  }
  id() {
    return this.props.match.params.id;
  }
  fetchNote(token) {
    this.props.fetchNote(this.id(), token);
  }
  componentWillReceiveProps(newProps) {
    if (this.props.authToken !== newProps.authToken) {
      this.fetchNote(newProps.authToken);
    }
  }
  createNote() {
    let note = this.props.note;
    this.props.createNote(note, this.props.authToken, this.props.history);
  }
  change(prop, value) {
    this.props.change(prop, value);
    setTimeout(() =>
      this.props.updateNote(
        this.props.note,
        this.props.authToken,
        this.props.history
      )
    );
  }
  render() {
    let note = this.props.note;

    return (
      <div className="note">
        <Link to="/notes">Back</Link>
        <input type="text"
          placeholder="Title"
          value={note.title}
          onChange={event => this.change('title', event.target.value)}/>
        <textarea
          placeholder="Write some stuff"
          value={note.text}
          onChange={event => this.change('text', event.target.value)}></textarea>
      </div>
    );
  }
}

const NoteContainer = ReactRedux.connect(
  state => ({
    authToken: state.login.token,
    ...state.note
  }),
  actions
)(Note);

export default NoteContainer;
