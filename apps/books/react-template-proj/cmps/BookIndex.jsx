const { useEffect, useState } = React
const { useNavigate } = ReactRouterDOM
import { bookService } from '../services/bookService.js'
import { BookList } from './BookList.jsx'
import { BookFilter } from './BookFilter.jsx'
import { BookEdit } from './BookEdit.jsx'
import { UserMsg } from './UserMsg.jsx'
import { GoogleBooks } from './GoogleBooks.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BookIndex() {
    const [books, setBooks] = useState([]) // All books
    const [filteredBooks, setFilteredBooks] = useState([]) // Filtered books
    const [isEditing, setIsEditing] = useState(false) // Toggles "Add Book" view
    const [isSearchingGoogleBooks, setIsSearchingGoogleBooks] = useState(false) // Google Books view toggle
    const navigate = useNavigate()

    useEffect(() => {
        loadBooks()
    }, [])

    // Fetch books from the book service
    const loadBooks = async () => {
        try {
            const books = await bookService.query()
            console.log('Books loaded:', books)
            setBooks(books)
            setFilteredBooks(books) // Initially display all books
            showSuccessMsg('Books loaded successfully')
        } catch (err) {
            console.error('Failed to load books:', err)
            showErrorMsg('Failed to load books. Please try again.')
        }
    }

    // Navigate to the details page for a specific book
    const handleSelectBook = (bookId) => {
        navigate(`/book/${bookId}`)
    }

    // Remove a book and refresh the list
    const handleRemoveBook = async (bookId) => {
        try {
            await bookService.remove(bookId)
            loadBooks()
            showSuccessMsg('Book removed successfully')
        } catch (err) {
            console.error('Failed to remove book:', err)
            showErrorMsg('Failed to remove the book.')
        }
    }

    // Add a new book to the list
    const handleAddBook = async (newBook) => {
        try {
            await bookService.add(newBook)
            loadBooks()
            setIsEditing(false) // Exit editing mode
            showSuccessMsg('Book added successfully')
        } catch (err) {
            console.error('Failed to add book:', err)
            showErrorMsg('Failed to add the book. Please try again.')
        }
    }

    // Add a book from Google Books
    const handleAddGoogleBook = async (googleBook) => {
        if (!googleBook || !googleBook.volumeInfo || !googleBook.volumeInfo.title) {
            showErrorMsg('This book cannot be added because it lacks a title.')
            return
        }

        try {
            const addedBook = await bookService.addGoogleBook(googleBook)
            loadBooks() // Refresh the book list
            setIsSearchingGoogleBooks(false) // Exit Google Books view
            showSuccessMsg(`${addedBook.title} has been added successfully!`)
        } catch (err) {
            console.error('Failed to add book from Google Books:', err)
            showErrorMsg('Failed to add the book. Please try again.')
        }
    }

    // Filter books based on title and price
    const handleFilterChange = (filter) => {
        console.log('Filtering books triggered with:', filter)
        const filtered = books.filter((book) => {
            const matchesTitle = book.title.toLowerCase().includes(filter.title.toLowerCase())
            const matchesPrice = filter.price ? book.listPrice.amount <= filter.price : true
            return matchesTitle && matchesPrice
        })
        setFilteredBooks(filtered)
        console.log('Filtered books:', filtered)
    }
    

    return (
        <section className="book-index">
            <h2 className="main-title">Book Index</h2>

            {/* Google Books Search View */}
            {isSearchingGoogleBooks ? (
                <GoogleBooks onBookAdded={handleAddGoogleBook} />
            ) : isEditing ? (
                // Add Book View
                <div>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                    <BookEdit onAddBook={handleAddBook} />
                </div>
            ) : (
                // Default View (Book List and Filter)
                <div>
                    <div className="controls">
                        <button
                            className="add-google-book-btn"
                            onClick={() => setIsSearchingGoogleBooks(true)}
                        >
                            Add from Google Books
                        </button>
                        <button
                            className="add-book-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            Add Book
                        </button>
                    </div>
                    <BookFilter onFilterChange={handleFilterChange} />
                    <BookList
                        books={filteredBooks}
                        onSelectBook={handleSelectBook}
                        onRemoveBook={handleRemoveBook}
                    />
                </div>
            )}
        </section>
    )
}
