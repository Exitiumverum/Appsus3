const { Link } = ReactRouterDOM;

export function Home() {
    return (
        <section className="home">
            <div className="home-hero">
                <h1>Welcome to <span>Appsus</span>!</h1>
                <p>Your favorite apps, all in one place.</p>
                <div className="home-actions">
                    {/* Use Link instead of <a> */}
                    <Link to="/note" className="btn-primary">Take Notes</Link>
                    <Link to="/mail" className="btn-secondary">Check Mail</Link>
                </div>
            </div>
            <div className="home-intro">
                <h2>What is Appsus?</h2>
                <p>
                    Appsus brings together all your essential tools into a single platform. 
                    With Notes, Mail, and Books, managing your life has never been easier.
                </p>
            </div>
        </section>
    );
}
