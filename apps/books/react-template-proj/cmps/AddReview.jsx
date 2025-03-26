const { useState } = React

export function AddReview({ onAddReview }) {
    const [review, setReview] = useState({
        fullname: '',
        rating: 1,
        readAt: ''
    })

    const handleChange = ({ target }) => {
        const { name, value } = target
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value
        }))
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (!review.fullname || !review.rating || !review.readAt) {
            console.error('All fields are required!')
            return
        }
        console.log('Submitting review:', review) // Debugging
        onAddReview(review) // Pass the review object to `onAddReview`
        setReview({ fullname: '', rating: 1, readAt: '' }) // Reset the form
    }

    return (
        <form className="add-review" onSubmit={handleSubmit}>
            <label>
                Full Name:
                <input
                    type="text"
                    name="fullname"
                    value={review.fullname}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Rating:
                <select
                    name="rating"
                    value={review.rating}
                    onChange={handleChange}
                    required
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num} Stars
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Read At:
                <input
                    type="date"
                    name="readAt"
                    value={review.readAt}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Add Review</button>
        </form>
    )
}
