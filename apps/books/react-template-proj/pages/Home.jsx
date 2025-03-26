const { Link } = ReactRouterDOM

export function Home() {
    return (
        <section className="home">
            <h1 className="home-title">Welcome to Miss Books</h1>
            <nav className="home-nav">
                <Link to="/about" className="nav-link">About Us</Link>
                <Link to="/book" className="nav-link">Book Index</Link>
            </nav>
        </section>
    )
}

