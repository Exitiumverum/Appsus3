export function NoteAudio({ note }) {
    const { url, title } = note.info

    if (!url) {
        return <p>No audio URL provided</p>
    }

    return (
        <div className="note-audio">
            <h3>{title || 'Audio Note'}</h3>
            <audio controls>
                <source src={url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    )
}
