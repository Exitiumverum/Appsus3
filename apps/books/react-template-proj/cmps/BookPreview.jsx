export function BookPreview({ book }) {
    return (
        <div className="book-preview">
            <img src={book.thumbnail} alt={`${book.title} thumbnail`} />
            <h3>{book.title}</h3>
            <p>{book.subtitle}</p>
            <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
        </div>
    )
}
