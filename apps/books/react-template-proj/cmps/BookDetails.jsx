const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouterDOM;
import { LongTxt } from './LongText.jsx';
import { DynamicRating } from './DynamicRating.jsx';
import { bookService } from '../services/bookService.js';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';

export function BookDetails() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [nextBookId, setNextBookId] = useState(null);
    const [prevBookId, setPrevBookId] = useState(null);
    const [currentRating, setCurrentRating] = useState(0); // Stores the dynamic rating
    const [newReview, setNewReview] = useState({ fullname: '', readAt: '', reviewText: '', rating: 0 }); // Includes rating
    const navigate = useNavigate();

    useEffect(() => {
        loadBook();
    }, [bookId]);

    const loadBook = async () => {
        try {
            const books = await bookService.query();
            const currentBookIdx = books.findIndex((b) => b.id === bookId);

            if (currentBookIdx === -1) {
                console.error(`Book with id ${bookId} not found.`);
                navigate('/book');
                return;
            }

            const currentBook = books[currentBookIdx];
            setBook(currentBook);
            setReviews(currentBook.reviews || []);
            setCurrentRating(currentBook.dynamicRating || 0);

            const nextIdx = (currentBookIdx + 1) % books.length;
            const prevIdx = (currentBookIdx - 1 + books.length) % books.length;
            setNextBookId(books[nextIdx] ? books[nextIdx].id : null);
            setPrevBookId(books[prevIdx] ? books[prevIdx].id : null);
        } catch (err) {
            console.error('Failed to load books:', err);
            navigate('/book');
        }
    };

    const handleAddReview = async (ev) => {
        ev.preventDefault()
        console.log('Adding review:',ev.target);
        try {
            const reviewWithRating = { ...newReview, rating: currentRating || newReview.rating };
            const updatedBook = { ...book, reviews: [...(book.reviews || []), reviewWithRating] };

            await bookService.update(updatedBook);
            setReviews((prevReviews) => [...prevReviews, reviewWithRating]);
            setBook(updatedBook);
            setNewReview({ fullname: '', readAt: '', reviewText: '', rating: 0 }); // Reset form
            showSuccessMsg('Review added successfully!');
        } catch (err) {
            console.error('Failed to add review:', err);
            showErrorMsg('Failed to add review. Please try again.');
        }
    };

    const handleRemoveReview = async (reviewIdx) => {
        try {
            const updatedReviews = reviews.filter((_, idx) => idx !== reviewIdx);
            const updatedBook = { ...book, reviews: updatedReviews };

            await bookService.update(updatedBook);
            setReviews(updatedReviews);
            setBook(updatedBook);
            showSuccessMsg('Review removed successfully!');
        } catch (err) {
            console.error('Failed to remove review:', err);
            showErrorMsg('Failed to remove review. Please try again.');
        }
    };

    if (!book) return <p>Loading book details...</p>;

    return (
        <section className="book-details">
            <button className="btn-back" onClick={() => navigate('/book')}>Back to List</button>
            <h2>{book.title}</h2>
            {book.subtitle && <h4>{book.subtitle}</h4>}

            <div>
                <strong>Description:</strong>{' '}
                <LongTxt txt={book.description || 'No description available.'} length={150} />
            </div>

            <p>
                <strong>Price:</strong>{' '}
                <span
                    className={`price ${book.listPrice.amount > 150
                        ? 'price-high'
                        : book.listPrice.amount < 20
                            ? 'price-low'
                            : ''
                        }`}
                >
                    {book.listPrice.amount} {book.listPrice.currencyCode}
                </span>
            </p>

            <p>
                <strong>Authors:</strong>{' '}
                {book.authors && book.authors.length > 0 ? book.authors.join(', ') : 'Unknown'}
            </p>
            <p>
                <strong>Published Date:</strong> {book.publishedDate}
            </p>
            <p>
                <strong>Categories:</strong>{' '}
                {book.categories && book.categories.length > 0 ? book.categories.join(', ') : 'N/A'}
            </p>
            <p>{book.language ? book.language.toUpperCase() : 'N/A'}</p>
            <p>
                <strong>On Sale:</strong> {book.listPrice.isOnSale ? 'Yes' : 'No'}
            </p>

            {book.thumbnail && (
                <img className="book-thumbnail" src={book.thumbnail} alt={`${book.title} cover`} />
            )}

            {/* Next/Prev Navigation */}
            <section className="navigation">
                <button
                    onClick={() => navigate(`/book/${prevBookId}`)}
                    disabled={!prevBookId}
                    className="nav-btn"
                >
                    Previous
                </button>
                <button
                    onClick={() => navigate(`/book/${nextBookId}`)}
                    disabled={!nextBookId}
                    className="nav-btn"
                >
                    Next
                </button>
            </section>

            {/* Dynamic Rating Section */}
            <section className="dynamic-rating-section">
                <DynamicRating
                    rating={currentRating}
                    onRate={(newRating , e) => {
                        setCurrentRating(newRating);
                        setNewReview((prevReview) => ({ ...prevReview, rating: e.target.value }));
                    }}
                />
            </section>

            {/* Reviews Section */}
            <section className="reviews-section">
                <h3>Reviews</h3>
                <ul className="reviews-list">
                    {reviews.length === 0 ? (
                        <p>No reviews yet</p>
                    ) : (
                        reviews.map((review, idx) => (
                            <li key={idx} className="review-item">
                                <div className="review-header">
                                    <p className="review-fullname"><strong>{review.fullname}</strong></p>
                                    <p className="review-rating">{review.rating} Stars</p>
                                </div>
                                <p className="review-readAt">Read on: {review.readAt}</p>
                                <p className="review-text">{review.reviewText}</p>
                                <button
                                    className="delete-review-btn"
                                    onClick={() => handleRemoveReview(idx)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    )}
                </ul>

                {/* Inline Review Form */}
                <form className="add-review-form" onSubmit={handleAddReview}>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            value={newReview.fullname}
                            onChange={(e) => setNewReview({ ...newReview, fullname: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        Read At:
                        <input
                            type="date"
                            value={newReview.readAt}
                            onChange={(e) => setNewReview({ ...newReview, readAt: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        Review Text:
                        <textarea
                            value={newReview.reviewText}
                            onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                            required
                        />
                    </label>
                    <button type="submit">Add Review</button>
                </form>
            </section>
        </section>
    );
}
