const { useEffect, useRef } = React
import { bookService } from '../services/bookService.js'

export function BookDashboard() {
    const chartRef = useRef(null)

    useEffect(() => {
        loadBooks()
    }, [])

    const loadBooks = async () => {
        try {
            const books = await bookService.query()
            const categoryStats = calculateCategoryStats(books)
            renderChart(categoryStats)
        } catch (err) {
            console.error('Failed to load books:', err)
        }
    }

    const calculateCategoryStats = (books) => {
        const categoryCount = books.reduce((acc, book) => {
            book.categories.forEach((category) => {
                acc[category] = (acc[category] || 0) + 1
            })
            return acc
        }, {})

        return Object.entries(categoryCount).map(([category, count]) => ({
            category,
            count
        }))
    }

    const renderChart = (categoryStats) => {
        if (!chartRef.current) return

        const ctx = chartRef.current.getContext('2d')
        const labels = categoryStats.map((stat) => stat.category)
        const data = categoryStats.map((stat) => stat.count)

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Books by Category',
                        data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.raw} books`
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        ticks: {
                            callback: (value) => `${value}%`
                        }
                    }
                }
            }
        })
    }

    return (
        <section className="book-dashboard">
            <h2>Books Dashboard</h2>
            <canvas ref={chartRef} width="400" height="200"></canvas>
        </section>
    )
}
