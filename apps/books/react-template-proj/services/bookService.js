import { storageService } from './async-storage.service.js'
import { books } from './books.js'

const BOOKS_KEY = 'books'

export const bookService = {
    query,
    getById,
    save,
    remove,
    add,
    getEmptyBook,
    addReview,
    removeReview,
    addGoogleBook,
    update,
}

async function query() {
    let booksInStorage = await storageService.query(BOOKS_KEY)
    if (!booksInStorage || !booksInStorage.length) {
        console.log('No books found. Initializing storage with demo books...')
        for (const book of books) {
            await storageService.post(BOOKS_KEY, book)
        }
        booksInStorage = await storageService.query(BOOKS_KEY)
    }
    // console.log('Books loaded from storage:', booksInStorage)
    return booksInStorage
}

async function getById(bookId) {
    const book = await storageService.get(BOOKS_KEY, bookId)
    if (!book) console.error(`Book with ID ${bookId} not found.`)
    return book
}


function update(updatedBook) {
    console.log('Updating book:', updatedBook)
    return storageService.query(BOOKS_KEY).then((books) => {
        const idx = books.findIndex((book) => book.id === updatedBook.id)
        if (idx === -1) throw new Error(`Book with id ${updatedBook.id} not found`)
        books.splice(idx, 1, updatedBook) // Replace the book in the array
        return storageService.save(BOOKS_KEY, books).then(() => updatedBook) // Save updated array
    })
}



async function save(book) {
    if (book.id) {
        console.log(`Updating book with ID: ${book.id}`)
        return await storageService.put(BOOKS_KEY, book)
    } else {
        console.log('Adding new book:', book)
        return await storageService.post(BOOKS_KEY, book)
    }
}

async function add(newBook) {
    console.log('Adding book:', newBook)
    return await save(newBook)
}

async function remove(bookId) {
    console.log(`Removing book with ID: ${bookId}`)
    return await storageService.remove(BOOKS_KEY, bookId)
}

// Add a review to a specific book
async function addReview(bookId, review) {
    console.log(`Adding review to book with ID: ${bookId}`, review)
    const books = await query()
    const book = books.find((book) => book.id === bookId)
    if (!book.reviews) book.reviews = [] // Initialize reviews if not present
    book.reviews.push(review)
    await save(book) // Save the updated book
}

// Delete a review by index
async function removeReview(bookId, reviewIdx) {
    const books = await query()
    const book = books.find((book) => book.id === bookId)
    if (!book.reviews) return
    book.reviews.splice(reviewIdx, 1) // Remove the review
    await save(book) // Save the updated book
}

// Add a book from Google Books API
async function addGoogleBook(googleBook) {
    const book = _mapGoogleBookToAppBook(googleBook)
    try {
        await storageService.post('books', book) // Use `post` to add new books
        console.log('Book added:', book)
        return book
    } catch (err) {
        console.error('Failed to add Google Book:', err)
        throw err
    }
}

function _mapGoogleBookToAppBook(googleBook) {
    const volumeInfo = googleBook.volumeInfo || {} // Ensure volumeInfo exists
    return {
        id: googleBook.id || `google_${Date.now()}`, // Fallback ID
        title: volumeInfo.title || 'Untitled', // Fallback for missing title
        subtitle: volumeInfo.subtitle || '',
        authors: volumeInfo.authors || ['Unknown Author'], // Default author
        publishedDate: volumeInfo.publishedDate || 'N/A', // Default date
        description: volumeInfo.description || 'No description available', // Default description
        pageCount: volumeInfo.pageCount || 0, // Default page count
        categories: volumeInfo.categories || [], // Default empty categories
        thumbnail: volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail
            ? volumeInfo.imageLinks.thumbnail
            : '', // Fallback for missing thumbnail
        listPrice: {
            amount: 0, // Default price
            currencyCode: 'USD',
            isOnSale: false,
        },
        reviews: [], // Initialize with an empty reviews array
    }
}


function getEmptyBook() {
    return {
        id: _makeId(),
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: '',
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '',
        language: '',
        listPrice: {
            amount: 0,
            currencyCode: 'USD',
            isOnSale: false,
        },
    }
}

// Helper function to generate a unique ID
function _makeId(length = 8) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}
