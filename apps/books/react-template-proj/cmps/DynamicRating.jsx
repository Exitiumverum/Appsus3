const { useState } = React
import { RateBySelect } from './RateBySelect.jsx'
import { RateByTextbox } from './RateByTextbox.jsx'
import { RateByStars } from './RateByStars.jsx'

export function DynamicRating() {
    const [rating, setRating] = useState(0)

    const [ratingType, setRatingType] = useState('select') // Default: select

    const handleTypeChange = (event) => {
        setRatingType(event.target.value)
    }

    const handleRate = (newRating) => {
        setRating(newRating)
        console.log('Rating:', newRating)
    }

    const renderRatingComponent = () => {
        switch (ratingType) {
            case 'select':
                return <RateBySelect val={rating} onRate={handleRate} />
            case 'textbox':
                return <RateByTextbox val={rating} onRate={handleRate} />
            case 'stars':
                return <RateByStars val={rating} onRate={handleRate} />
            default:
                return null
        }
    }

    return (
        <div className="dynamic-rating">
            <h3>Rate this Book</h3>
            <fieldset>
                <legend>Choose Rating Method:</legend>
                <label>
                    <input
                        type="radio"
                        name="ratingType"
                        value="select"
                        checked={ratingType === 'select'}
                        onChange={handleTypeChange}
                    />
                    Rate by Select
                </label>
                <label>
                    <input
                        type="radio"
                        name="ratingType"
                        value="textbox"
                        checked={ratingType === 'textbox'}
                        onChange={handleTypeChange}
                    />
                    Rate by Textbox
                </label>
                <label>
                    <input
                        type="radio"
                        name="ratingType"
                        value="stars"
                        checked={ratingType === 'stars'}
                        onChange={handleTypeChange}
                    />
                    Rate by Stars
                </label>
            </fieldset>

            <div className="rating-component">{renderRatingComponent()}</div>
            <p>Your Rating: {rating || 'Not Rated'}</p>
        </div>
    )
}
