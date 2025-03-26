export function NoteVideo({ note }) {
    return (
        <div className="note-video">
            <iframe
                width="100%"
                height="200"
                src={note.info.url}
                title={note.info.title || 'Video Note'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <p>{note.info.title}</p>
        </div>
    )
}
