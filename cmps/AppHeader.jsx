const { Link, NavLink } = ReactRouterDOM;

export function AppHeader() {
    return (
        <header className="app-header">
            <Link to="/" className="logo">
                <img src="assets/img/logo.png" alt="Appsus" />
                <h3>Appsus</h3>
            </Link>
            <nav className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
                <NavLink to="/book">Books</NavLink>
            </nav>
        </header>
    );
}
