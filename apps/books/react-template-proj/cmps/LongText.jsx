const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false) // Tracks whether the text is expanded

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded) // Toggles the expanded state
    }

    return (
        <p className="long-txt">
            {isExpanded ? txt : `${txt.slice(0, length)}...`}
            <button className="toggle-btn" onClick={toggleExpanded}>
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>
        </p>
    )
}
