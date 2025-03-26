import { NoteImg } from './NoteImg.jsx';
import { NoteTodos } from './NoteTodos.jsx';
import { NoteTxt } from './NoteText.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteAudio } from './NoteAudio.jsx';
import { NoteCanvas } from './NoteCanvas.jsx'; 

const { useState } = React;
const { useNavigate } = ReactRouterDOM;

export function NotePreview({ note, onRemoveNote, onUpdateNote, onTogglePin }) {
    const [isEditing, setIsEditing] = useState(false); // Track editing state
    const [editedContent, setEditedContent] = useState({ ...note.info }); // Clone the content to avoid direct mutation
    const navigate = useNavigate(); // React Router navigation

    function handleSave() {
        const updatedNote = { ...note, info: editedContent };
        onUpdateNote(updatedNote); // Call the update function
        setIsEditing(false); // Exit editing mode
    }

    function handleColorChange(color) {
        const updatedNote = { ...note, style: { ...note.style, backgroundColor: color } };
        onUpdateNote(updatedNote); // Update the note's background color
    }

    function sendToEmail(note) {
        if (!note || !note.info) {
            console.error('Error: Note is undefined or missing info');
            return;
        }
    
        const baseUrl = '/mail'; // Use `/mail` for the route
        const subject = encodeURIComponent(note.info.title || 'New Note');
        let body;
    
        // Prepare email content based on the note type
        switch (note.type) {
            case 'NoteTxt':
                body = encodeURIComponent(note.info.txt || 'This note has no content.');
                break;
            case 'NoteImg':
                body = encodeURIComponent(`Check out this image: ${note.info.url}`);
                break;
            case 'NoteTodos':
                body = encodeURIComponent(
                    `Todos:\n${note.info.todos.map(todo => `- ${todo.txt}`).join('\n')}`
                );
                break;
            case 'NoteVideo':
                body = encodeURIComponent(`Check out this video: ${note.info.url}`);
                break;
            default:
                body = encodeURIComponent('Unsupported note type.');
        }
    
        // Construct the final URL with query parameters
        const queryParams = `?subject=${subject}&body=${body}`;
        const finalUrl = `${baseUrl}${queryParams}`; // No `#` prefix, HashRouter will handle it
    
        console.log('Navigating to:', finalUrl); // Debugging log
        navigate(finalUrl); // Navigate to `/mail` route with query parameters
    }
    
    function renderEditingContent() {
        switch (note.type) {
            case 'NoteTxt':
                return (
                    <textarea
                        className="edit-textarea"
                        value={editedContent.txt}
                        onChange={(e) => setEditedContent({ ...editedContent, txt: e.target.value })}
                    />
                );
            case 'NoteImg':
                return (
                    <input
                        className="edit-input"
                        type="text"
                        value={editedContent.url}
                        placeholder="Enter image URL"
                        onChange={(e) => setEditedContent({ ...editedContent, url: e.target.value })}
                    />
                );
            case 'NoteTodos':
                return (
                    <textarea
                        className="edit-textarea"
                        value={editedContent.todos.map(todo => todo.txt).join(', ')}
                        onChange={(e) => {
                            const todos = e.target.value.split(',').map(txt => ({ txt: txt.trim(), done: false }));
                            setEditedContent({ ...editedContent, todos });
                        }}
                    />
                );
            default:
                return <p>Unsupported note type</p>;
        }
    }

    function renderNoteContent() {
        if (isEditing) {
            return (
                <div className="note-edit">
                    {renderEditingContent()}
                    <div className="note-edit-actions">
                        <button onClick={handleSave} className="btn-save">Save</button>
                        <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
                    </div>
                </div>
            );
        }

        // Normal rendering when not in edit mode
        switch (note.type) {
            case 'NoteTxt':
                return <NoteTxt note={note} />;
            case 'NoteImg':
                return <NoteImg note={note} />;
            case 'NoteTodos':
                return <NoteTodos note={note} onUpdateNote={onUpdateNote} />;
            case 'NoteVideo': // Add support for video notes
                return <NoteVideo note={note} />
            case 'NoteAudio': // Add support for audio notes
                return <NoteAudio note={note} />
            case 'NoteCanvas': // Add support for canvas notes
                return <NoteCanvas note={note} onUpdateNote={onUpdateNote} />
            default:
                return <p>Unsupported note type</p>;
        }
    }

    return (
        <article
            className="note-preview"
            style={{ backgroundColor: note.style.backgroundColor || '#ffffff' }}
        >
            <div className="note-content">{renderNoteContent()}</div>
            <div className="note-actions">
                {!isEditing && (
                    <button className="btn-edit" onClick={() => setIsEditing(true)}>
                        ✏️ 
                    </button>
                )}
                <button className="btn-pin" onClick={() => onTogglePin(note.id)}>
                    {note.isPinned ? '📌' : '📍'}
                </button>
                <button className="btn-remove" onClick={() => onRemoveNote(note.id)}>
                🚮 
                </button>
                <button onClick={() => sendToEmail(note)} className="btn-email">
                    ✉️
                </button>
            </div>
            <div className="note-color-picker">
                <label htmlFor={`color-${note.id}`}>🎨</label>
                <input
                    id={`color-${note.id}`}
                    type="color"
                    value={note.style.backgroundColor || '#ffffff'}
                    onChange={(e) => handleColorChange(e.target.value)}
                />
            </div>
        </article>
    );
}
