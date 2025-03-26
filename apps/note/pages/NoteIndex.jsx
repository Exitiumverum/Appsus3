const { useEffect, useState } = React
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [noteType, setNoteType] = useState('NoteTxt') // Default to text note
    const [noteContent, setNoteContent] = useState('')
    const [filterBy, setFilterBy] = useState({ txt: '', type: 'all' }) // Filter state
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        console.log('Loading notes...', showSuccessMsg)
        noteService.query()
            .then(setNotes)
            .catch(() => displayError('Failed to load notes'))
    }

    function onAddNote() {
        if (!noteContent.trim() && noteType !== 'NoteCanvas') {
            displayError('Note content cannot be empty')
            return
        }

        const newNote = noteService.getEmptyNote()
        newNote.type = noteType
        newNote.info = getNoteInfo(noteType, noteContent)

        noteService.save(newNote)
            .then(() => {
                setNoteContent('')
                loadNotes()
            })
            .catch(() => displayError('Failed to add note'))

    }

    function getNoteInfo(type, content) {
        switch (type) {
            case 'NoteTxt':
                return { txt: content }
            case 'NoteImg':
                return { url: content, title: 'Image Note' }
            case 'NoteTodos':
                return {
                    todos: content.split(',').map(todo => ({
                        txt: todo.trim(),
                        done: false,
                    }))
                }
            case 'NoteVideo':
                return { url: content, title: 'Video Note' }
            case 'NoteAudio':
                return { url: content, title: 'Audio Note' }
            case 'NoteCanvas':
                return { title: 'New Canvas', dataUrl: '' }
            default:
                return { txt: content }
        }
    }


    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => loadNotes())
            .then(() => showSuccessMsg('Note removed successfully'))
            .catch(() => displayError('Failed to remove note'))
    }

    function onUpdateNote(updatedNote) {
        noteService.updateNote(updatedNote)
            .then(() => loadNotes())
            .then(() => showSuccessMsg('Note updated successfully'))
            .catch(() => displayError('Failed to update note'))
    }

    function onTogglePin(noteId) {
        noteService.togglePin(noteId)
            .then(() => loadNotes())
            .then(() => showSuccessMsg('Note pinned/unpinned successfully'))
            .catch(() => displayError('Failed to pin/unpin note'))
    }

    function displayError(message) {
        setErrorMsg(message)
        setTimeout(() => setErrorMsg(''), 3000)
    }

    // Filter Notes Based on Search and Type
    function getFilteredNotes() {
        const { txt, type } = filterBy
        return notes.filter(note => {
            const matchesTxt =
                (note.info.txt && note.info.txt.toLowerCase().includes(txt.toLowerCase())) ||
                (note.info.todos && note.info.todos.some(todo => todo.txt.toLowerCase().includes(txt.toLowerCase()))) ||
                (note.info.url && note.info.url.toLowerCase().includes(txt.toLowerCase()))
            const matchesType = type === 'all' || note.type === type
            return matchesTxt && matchesType
        })
    }


    // Update Filter State
    function onSetFilter(event) {
        const { name, value } = event.target
        setFilterBy(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    return (
        <section className="note-index">
            {/* Note Addition */}
            <div className="note-add">
                <select value={noteType} onChange={(e) => setNoteType(e.target.value)}>
                    <option value="NoteTxt">Text Note</option>
                    <option value="NoteImg">Image Note</option>
                    <option value="NoteTodos">Todo Note</option>
                    <option value="NoteVideo">Video Note</option>
                    <option value="NoteAudio">Audio Note</option>
                    {/* <option value="NoteCanvas">Canvas Note</option> */}
                </select>
                <input
                    type="text"
                    placeholder={getPlaceholder(noteType)}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                />
                <button onClick={onAddNote}>Add Note</button>
            </div>

            {/* Error Message */}
            {errorMsg && <div className="error-msg">{errorMsg}</div>}

            {/* Filter Section */}
            <div className="note-filter">
                <input
                    type="text"
                    name="txt"
                    placeholder="Search notes..."
                    value={filterBy.txt}
                    onChange={onSetFilter}
                />
                <select name="type" value={filterBy.type} onChange={onSetFilter}>
                    <option value="all">All Notes</option>
                    <option value="NoteTxt">Text Notes</option>
                    <option value="NoteImg">Image Notes</option>
                    <option value="NoteTodos">Todo Notes</option>
                    <option value="NoteVideo">Video Notes</option>
                    <option value="NoteAudio">Audio Notes</option>
                    <option value="NoteCanvas">Canvas Notes</option>
                </select>
            </div>

            {/* Notes List */}
            <NoteList
                notes={getFilteredNotes()} // Pass filtered notes to the list
                onRemoveNote={onRemoveNote}
                onUpdateNote={onUpdateNote}
                onTogglePin={onTogglePin}
            />
        </section>
    )
}

function getPlaceholder(noteType) {
    switch (noteType) {
        case 'NoteTxt':
            return 'Enter your text...'
        case 'NoteImg':
            return 'Enter image URL...'
        case 'NoteTodos':
            return 'Enter comma-separated todos...'
        case 'NoteVideo':
            return 'Enter video URL...'
        case 'NoteAudio':
            return 'Enter audio URL...'
        case 'NoteCanvas':
            return 'Draw your note...'
        default:
            return 'Enter your note...'
    }
}
