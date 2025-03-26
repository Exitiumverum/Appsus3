export function RateByTextbox({ val, onRate }) {
    const handleChange = (event) => {
        const newValue = parseInt(event.target.value) || ''
        onRate(newValue)
    }

    return (
        <div>
            <label>Rate by Textbox:</label>
            <input
                type="number"
                min="1"
                max="5"
                placeholder="Enter a rating (1-5)"
                value={val}
                onChange={handleChange}
            />
        </div>
    )
}
