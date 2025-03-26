import { NotePreview } from './NotePreview.jsx'


export function NoteList({ notes, onRemoveNote, onUpdateNote, onTogglePin }) {
    const pinnedNotes = notes.filter(note => note.isPinned) // Separate pinned notes
    const otherNotes = notes.filter(note => !note.isPinned) // Separate non-pinned notes

    return (
        <section className="note-list">
            {pinnedNotes.length > 0 && (
                <React.Fragment>
                    <h3 className="section-title">Pinned Notes</h3>
                    <div className="note-section pinned">
                        {pinnedNotes.map(note => (
                            <NotePreview
                                key={note.id}
                                note={note}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                                onTogglePin={onTogglePin} // Pass toggle pin function
                            />
                        ))}
                    </div>
                </React.Fragment>
            )}
            {otherNotes.length > 0 && (
                <React.Fragment>
                    <h3 className="section-title">Other Notes</h3>
                    <div className="note-section others">
                        {otherNotes.map(note => (
                            <NotePreview
                                key={note.id}
                                note={note}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                                onTogglePin={onTogglePin} // Pass toggle pin function
                            />
                        ))}
                    </div>
                </React.Fragment>
            )}
        </section>
    )
}
