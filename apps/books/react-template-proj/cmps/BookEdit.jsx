const { useState } = React

export function BookEdit({ onAddBook, onCancel }) {
    const [form, setForm] = useState({
        title: '',
        subtitle: '',
        description: '',
        authors: '',
        publishedDate: '',
        pageCount: '',
        categories: '',
        language: '',
        listPrice: {
            amount: '',
            currencyCode: 'USD',
            isOnSale: false,
        },
        thumbnail: '',
    });

    const handleChange = ({ target }) => {
        const { name, value, type, checked } = target;
        if (name.startsWith('listPrice.')) {
            const key = name.split('.')[1];
            setForm((prevForm) => ({
                ...prevForm,
                listPrice: { ...prevForm.listPrice, [key]: type === 'checkbox' ? checked : value },
            }))
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value,
            }))
        }
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()

        const newBook = {
            ...form,
            authors: form.authors.split(',').map((author) => author.trim()),
            categories: form.categories.split(',').map((category) => category.trim()),
        }

        onAddBook(newBook)

        setForm({
            title: '',
            subtitle: '',
            description: '',
            authors: '',
            publishedDate: '',
            pageCount: '',
            categories: '',
            language: '',
            listPrice: {
                amount: '',
                currencyCode: 'USD',
                isOnSale: false,
            },
            thumbnail: '',
        })
    }

    return (
        <section className="book-edit">
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Subtitle:
                    <input
                        type="text"
                        name="subtitle"
                        value={form.subtitle}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Authors (comma-separated):
                    <input
                        type="text"
                        name="authors"
                        value={form.authors}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Published Date:
                    <input
                        type="date"
                        name="publishedDate"
                        value={form.publishedDate}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Page Count:
                    <input
                        type="number"
                        name="pageCount"
                        value={form.pageCount}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Categories (comma-separated):
                    <input
                        type="text"
                        name="categories"
                        value={form.categories}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Language:
                    <input
                        type="text"
                        name="language"
                        value={form.language}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="listPrice.amount"
                        value={form.listPrice.amount}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Currency Code:
                    <input
                        type="text"
                        name="listPrice.currencyCode"
                        value={form.listPrice.currencyCode}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    On Sale:
                    <input
                        type="checkbox"
                        name="listPrice.isOnSale"
                        checked={form.listPrice.isOnSale}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Thumbnail URL:
                    <input
                        type="text"
                        name="thumbnail"
                        value={form.thumbnail}
                        onChange={handleChange}
                    />
                </label>
                <div className="form-actions">
                    <button type="submit">Add Book</button>
                    <button type="button" onClick={onCancel} className="cancel-btn">
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    )
}
