import el from './el.mjs';
import api from './api.mjs';
import buildParams from './buildParams.mjs';
import debounce from './debounce.mjs';
import * as dom from './dom.mjs';

export default function NoteList(nav) {
    let errorEl;
    let searchEl;
    let noteListEl;
    let pendingReq;
    let loadingEl;

    async function search() {
        if (pendingReq) {
            pendingReq.cancel();
        }
        try {
            showLoading();
            errorEl.textContent = '';
            pendingReq = api.cancellableGet('/api/notes/search?' + buildParams({
                q: searchEl.value,
                offset: 0,
                limit: 10,
            }));

            const results = await pendingReq.promise;

            dom.clear(noteListEl);
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
            if (e.message.match(/The user aborted a request/)) {
                return;
            }
            const message = `Error searching for notes ${e.message}`;
            errorEl.textContent = message;
            console.error(message);
        } finally {
            hideLoading();
        }
    }

    const debouncedSearch = debounce(search, 250);

    setTimeout(search);

    async function addNote() {
        try {
            errorEl.textContent = '';
            const reply = await api.post('/api/notes', {
                title: '',
                text: ''
            });
            nav.gotoNote(reply.id);
        } catch (e) {
            const message = `Error adding note: ${e.message}`;
            errorEl.textContent = e.message;
            console.error(message);
        }
    }

    function showLoading() {
        if (loadingEl.style.display !== 'block') {
            loadingEl.style.display = 'block';
        }
        dom.clear(noteListEl);
    }

    function hideLoading() {
        loadingEl.style.display = 'none';
    }

    return el.div(
        el.div({ class: 'header' },
            el.button({
                class: 'add-button',
                onClick: () => {
                    addNote();
                }
            }, '+'),
            el.h1('Notes')
        ),
        searchEl = el.input({
            type: 'text',
            placeholder: 'Search',
            class: 'search-field',
            onKeyup: () => {
                debouncedSearch();
            }
        }),
        errorEl = el.div({ class: 'error' }),
        loadingEl = el.div({ class: 'loading', style: { display: 'none' } }, 
            el.img({ src: 'images/loading.gif' })
        ),
        noteListEl = el.ul(
            { class: 'notes' },
        )
    );

}