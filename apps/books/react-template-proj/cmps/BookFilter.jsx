const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function BookFilter({ onFilterChange }) { // Accept onFilterChange as a prop
    const [searchParams, setSearchParams] = useSearchParams()
    const [filter, setFilter] = useState({
        title: searchParams.get('title') || '',
        price: searchParams.get('price') || ''
    })

    useEffect(() => {
        // Sync filter state with URL parameters when the component mounts or searchParams change
        setFilter({
            title: searchParams.get('title') || '',
            price: searchParams.get('price') || ''
        })
    }, [searchParams])

    const handleChange = ({ target }) => {
        const { name, value } = target
        const updatedFilter = { ...filter, [name]: value }
        console.log('Filter updated:', updatedFilter)

        setFilter(updatedFilter)

        // Notify the parent component of the updated filter
        if (onFilterChange) {
            onFilterChange(updatedFilter)
        }

        // Update the URL search parameters
        const updatedParams = new URLSearchParams(searchParams)
        if (value) {
            updatedParams.set(name, value) // Add or update the parameter
        } else {
            updatedParams.delete(name) // Remove the parameter if empty
        }
        setSearchParams(updatedParams)
    }

    return (
        <section className="book-filter">
            <input
                name="title"
                type="text"
                placeholder="Filter by title"
                value={filter.title}
                onChange={handleChange}
            />
            <input
                name="price"
                type="number"
                placeholder="Max price"
                value={filter.price}
                onChange={handleChange}
            />
        </section>
    )
}
