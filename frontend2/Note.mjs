import el from './el.mjs';
import api from './api.mjs';
import debounce from './debounce.mjs';

export default function Note(id, nav) {
    let titleEl;
    let textareaEl;

    async function load() {
        try {
            const note = await api.get(`/api/note/${id}`);

            titleEl.value = note.title;
            textareaEl.value = note.text;
        } catch (e) {
            console.error(`Failed to fetch note ${id}: ${e.message}`);
        }
    }

    const updateNote = debounce(function() {
        let data = {
            title: titleEl.value,
            text: textareaEl.value
        };
        api.put(`/api/note/${id}`, data)
        .then(() => {
            console.log(`Note ${id} updated`);
        })
        .catch((e) => {
            console.error(`Failed to update note ${id}`);
        });
    }, 500);

    async function deleteNote(id) {
        try {
            await api.delete(`/api/note/${id}`);
            nav.gotoNoteList();
        } catch (e) {
            console.error(`Failed to delete note ${id}`);
        }
    }

    load();

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