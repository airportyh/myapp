import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Note.actions';
import { Link } from 'react-router-dom';
import { Form, TextField, TextArea } from '../form';

class Note extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.fetchNote(id);
  }
  updateNote(note) {
    this.props.updateNote(note, this.props.history);
  }
  deleteNote() {
    this.props.deleteNote();
    this.props.history.push('/');
  }
  render() {
    let note = this.props.note;
    let dirty = this.props.dirty || this.props.pendingCount > 0;
    return (
      <div className="note">
        <a href="#" className="pull-right" onClick={() => this.deleteNote()}>Delete</a>
        <Link className="link" to="/notes">Back</Link>
        {dirty ? <div className="dirty"></div> : null}
        <Form values={note} onChange={values => this.updateNote(values)}>
          <TextField label="Title" propName="title"/>
          <TextArea label="Write some stuff" propName="text"/>
        </Form>
      </div>
    );
  }
}

const NoteContainer = ReactRedux.connect(
  state => state.note,
  actions
)(Note);

export default NoteContainer;
