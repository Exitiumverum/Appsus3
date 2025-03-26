const { useState } = React
const { useNavigate } = ReactRouterDOM

import { bookService } from '../services/bookService.js'

export function GoogleBooks({ onBookAdded }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSearch = async (ev) => {
        ev.preventDefault()
        if (!searchTerm.trim()) return
        setIsLoading(true)

        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
            const data = await res.json()
            console.log('Google Books API Response:', data)
            setSearchResults(data.items || [])
        } catch (err) {
            console.error('Failed to fetch books from Google API:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddBook = async (googleBook) => {
        if (!googleBook || !googleBook.volumeInfo || !googleBook.volumeInfo.title) {
            alert('This book cannot be added because it lacks a title.')
            return
        }
        try {
            const addedBook = await bookService.addGoogleBook(googleBook)
            if (onBookAdded) {
                onBookAdded(addedBook) // Notify parent component
            }
            alert(`${addedBook.title} has been added successfully!`)
        } catch (err) {
            console.error('Failed to add book from Google Books:', err)
            alert('Failed to add the book. Please try again.')
        }
    }

    return (
        <section className="google-books">
            <h2>Find Books from Google</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {isLoading && <p>Loading...</p>}

            <ul className="book-results">
                {searchResults.map((book) => (
                    <li key={book.id} className="book-item">
                        <div>
                            <h4>{book.volumeInfo.title}</h4>
                            <p>
                                {(book.volumeInfo.authors && book.volumeInfo.authors.length > 0)
                                    ? book.volumeInfo.authors.join(', ')
                                    : 'Unknown Author'}
                            </p>
                        </div>
                        <button onClick={() => handleAddBook(book)}>Add Book</button>
                    </li>
                ))}
            </ul>
            <button className="cancel-btn" onClick={() => navigate('/book')}>
                Cancel
            </button>
        </section>
    )
}
