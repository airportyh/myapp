import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Note.actions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  deleteNote() {
    this.props.deleteNote();
    this.context.router.history.push('/');
  }
  render() {
    let note = this.props.note;
    let dirty = this.props.dirty;
    return (
      <div className="note">
        <a href="#" className="link pull-right" onClick={() => this.deleteNote()}>Delete</a>
        <Link className="link" to="/notes">Back</Link>
        {dirty ? <div className="dirty"></div> : null}
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

Note.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
}

const NoteContainer = ReactRedux.connect(
  state => ({
    authToken: state.login.token,
    ...state.note
  }),
  actions
)(Note);

export default NoteContainer;
