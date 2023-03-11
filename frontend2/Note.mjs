import el from './el.mjs';
import api from './api.mjs';
import debounce from './debounce.mjs';

export default function Note(id, nav) {
    let titleEl;
    let textareaEl;
    let errorEl;

    async function load() {
        try {
            clearError();
            const note = await api.get(`/api/note/${id}`);

            titleEl.value = note.title;
            textareaEl.value = note.text;
        } catch (e) {
            setError(`Failed to fetch note ${id}: ${e.message}`);
        }
    }

    const updateNote = debounce(async function() {
        try {
            clearError();
            let data = {
                title: titleEl.value,
                text: textareaEl.value
            };
            await api.put(`/api/note/${id}`, data);
        } catch (e) {
            setError(`Failed to update note ${id}: ${e.message}`);
        }
    }, 500);

    async function deleteNote(id) {
        try {
            clearError();
            await api.delete(`/api/note/${id}`);
            nav.gotoNoteList();
        } catch (e) {
            setError(`Failed to delete note ${id}: ${e.message}`);
        }
    }

    function clearError() {
        errorEl.textContent = '';
    }

    function setError(message) {
        errorEl.textContent = message;
        console.error(message);
    }

    setTimeout(load);

    return el.div(
        { class: 'note' },
        el.button({
            class: 'link pull-right',
            onClick: () => {
                const yes = confirm('Sure you want to delete?');
                if (yes) {
                    deleteNote(id);
                }
            }
        }, 'Delete'),
        el.button({
            class: 'link',
            onClick: () => {
                nav.gotoNoteList();
            }
        }, 'Back'),
        errorEl = el.div({ class: 'error '}),
        el.form(
            { onSubmit: (e) => {
                e.preventDefault();
            }},
            titleEl = el.input({
                type: 'text',
                class: 'title-field',
                placeholder: 'Title',
                onKeyup: updateNote,
            }),
            textareaEl = el.textarea({
                class: 'note-text-field',
                placeholder: 'Write some stuff',
                onKeyup: updateNote,
            })
        )
    )
}