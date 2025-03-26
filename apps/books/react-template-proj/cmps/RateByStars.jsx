export function RateByStars({ val, onRate }) {
    const handleClick = (rating) => {
        onRate(rating)
    }

    return (
        <div>
            <label>Rate by Stars:</label>
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => handleClick(star)}
                        className={star <= val ? 'selected' : ''}
                    >
                        ★
                    </span>
                ))}
            </div>
        </div>
    )
}
