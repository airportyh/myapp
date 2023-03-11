import el from './el.mjs';
import api from './api.mjs';
import buildParams from './buildParams.mjs';

export default function NoteList(nav) {
    let query = '';
    let results;
    let errorEl;
    let noteListEl;

    async function load() {
        try {
            results = await api.get('/api/notes/search?' + buildParams({
                q: query,
                offset: 0,
                limit: 10,
            }));

            for (let note of results) {
                const noteEl = el.li(
                    el.a(
                        {
                            href: "#",
                            onClick: () => {
                                nav.gotoNote(note.id);
                            }
                        },
                        note.title || el.span(
                            {class: 'info'}, 'Untitled'
                        )
                    )
                )
                noteListEl.appendChild(noteEl);
            }
        } catch (e) {
            console.error('Error searching for notes', e.message);
        }
    }

    load();

    return el.div(
        el.div({ class: 'header' },
            el.button({
                class: 'add-button',
                onClick: () => {
                    console.log('add note');
                }
            }, '+'),
            el.h1('Notes')
        ),
        el.input({
            type: 'text',
            placeholder: 'Search',
            class: 'search-field',
        }),
        errorEl = el.div({ class: 'error' }),
        noteListEl = el.ul(
            { class: 'notes' },
        )
    );

}