import '../../../assets/css/apps/note/cmps/NoteTodos.css'

export function NoteTodos({ note, onUpdateNote }) {
    function onToggleTodo(idx) {
        const updatedTodos = note.info.todos.map((todo, i) =>
            i === idx ? { ...todo, done: !todo.done } : todo
        )
        const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } }
        onUpdateNote(updatedNote)
    }

    function onDeleteTodo(idx) {
        const updatedTodos = note.info.todos.filter((_, i) => i !== idx)
        const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } }
        onUpdateNote(updatedNote)
    }

    return (
        <ul className="note-todos">
            {note.info.todos.map((todo, idx) => (
                <li key={idx}>
                    <input
                        type="checkbox" id={`todo-${idx}`}
                        checked={todo.done}
                        onChange={() => onToggleTodo(idx)}
                    />
                    <label htmlFor={`todo-${idx}`}></label>
                    <span>{todo.txt}</span>
                    <button onClick={() => onDeleteTodo(idx)}  title="Delete item" aria-label="Delete item">🚮</button>
                </li>
            ))}
        </ul>
    )
}
