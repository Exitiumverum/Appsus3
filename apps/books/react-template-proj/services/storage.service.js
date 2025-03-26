const BOOKS_KEY = 'books'


export const bookService = {
    getBooks,
    addBook,
    removeBook,
}


export const storageService = {
    loadFromStorage,
    saveToStorage,
    save,
    query,

}



function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value)) // Save to localStorage
    return Promise.resolve(value) // Return a resolved promise
}

function query(key) {
    const data = localStorage.getItem(key)
    return Promise.resolve(data ? JSON.parse(data) : [])
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value)) // Save to localStorage
    return Promise.resolve(value) // Return a resolved promise
}

function getBooks() {
    return storageService.loadFromStorage(BOOKS_KEY) || []
}

function addBook(book) {
    const books = getBooks()
    books.push(book)
    storageService.saveToStorage(BOOKS_KEY, books)
}

function removeBook(bookId) {
    const books = getBooks().filter((book) => book.id !== bookId)
    storageService.saveToStorage(BOOKS_KEY, books)
}
