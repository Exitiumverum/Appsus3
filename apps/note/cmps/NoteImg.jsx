export function NoteImg({ note }) {
    const placeholder = 'https://via.placeholder.com/300'

    return (
        <div className="note-img">
            <img
                src={note.info.url}
                alt={note.info.title || 'Image Note'}
                onError={(e) => (e.target.src = placeholder)} // Fallback to placeholder
            />
            {note.info.title && <h4>{note.info.title}</h4>}
        </div>
    )
}

