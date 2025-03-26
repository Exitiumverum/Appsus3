import { Home } from './pages/Home.jsx'
import { AboutUs } from './cmps/AboutUs.jsx'
import { BookIndex } from './cmps/BookIndex.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { BookDetails } from './cmps/BookDetails.jsx'
import { BookDashboard } from './cmps/BookDashboard.jsx'








// Import ReactRouterDOM components
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Link } = ReactRouterDOM


export function App() {
    return (
        <Router>
            <section className="app">
                <header className="app-header main-layout">
                    <h1>Miss Books</h1>
                    <nav className="main-nav">
                        {/* Navigation Links */}
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/about" className="nav-link">About Us</Link>
                        <Link to="/book" className="nav-link">Book Index</Link>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </nav>
                </header>
                <main className="main-layout">
                    <Routes>
                        {/* Define Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/dashboard" element={<BookDashboard />} />
                    </Routes>
                </main>
                {/* Global User Messages */}
                <UserMsg />
            </section>
        </Router>
    )
}

