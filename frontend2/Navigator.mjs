import * as dom from './dom.mjs';
import NoteList from './NoteList.mjs';
import Note from './Note.mjs';

export default class Navigator {
    constructor(rootEl) {
        this.rootEl = rootEl;
    }

    gotoNoteList() {
        dom.clear(this.rootEl);
        this.rootEl.appendChild(NoteList(this));
    }

    gotoNote(id) {
        dom.clear(this.rootEl);
        this.rootEl.appendChild(Note(id, this));
    }

    back() {

    }
}