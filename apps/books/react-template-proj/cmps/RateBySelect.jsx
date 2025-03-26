export function RateBySelect({ val, onRate }) {
    const handleChange = (event) => {
        const selectedValue = parseInt(event.target.value)
        onRate(selectedValue)
    }

    return (
        <div>
            <label>Rate by Select:</label>
            <select value={val} onChange={handleChange}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                        {num} Stars
                    </option>
                ))}
            </select>
        </div>
    )
}
