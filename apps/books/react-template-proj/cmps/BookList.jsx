export function BookList({ books, onSelectBook, onRemoveBook }) {
    console.log('BookList - books:', books)
    return (
        <section className="book-list">
            {books.map((book) => (
                <div key={book.id} className="book-preview">
                    {/* Book Thumbnail */}
                    <img src={book.thumbnail} alt={`${book.title} cover`} />

                    {/* Book Title */}
                    <h3>{book.title}</h3>

                    {/* Action Buttons */}
                    <button onClick={() => onSelectBook(book.id)}>View Details</button>
                    <button className="remove-btn" onClick={() => onRemoveBook(book.id)}>
                        Remove
                    </button>
                </div>
            ))}
        </section>
    )
}

