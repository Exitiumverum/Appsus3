const { Route, Routes, Navigate } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;

import { AppHeader } from "./cmps/AppHeader.jsx";
import { About } from "./pages/About.jsx";
import { Home } from "./pages/Home.jsx";
// Mail App cmps
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx";
import { MailInbox } from "./apps/mail/cmps/Inbox.jsx";
import { MailSent } from "./apps/mail/cmps/Sent.jsx";
import { MailCompose } from "./apps/mail/cmps/MailCompose.jsx"; // Add ComposeMessage
import { MailStarred } from "./apps/mail/cmps/Starred.jsx"; // Add ComposeMessage
console

// Note App cmps
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx";
import { BookIndex } from "./apps/books/react-template-proj/cmps/BookIndex.jsx";

export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <Routes basename="/react-hooks-starter">
                    {/* Home and About */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />

                    {/* Mail App */}
                    <Route path="/mail" element={<MailIndex />}>
                        <Route path="inbox" element={<MailInbox />} />
                        <Route path="sent" element={<MailSent />} />
                        <Route path="starred" element={<MailStarred />} />
                        <Route path="/mail" element={<MailCompose />} />
                        {/* Redirect to inbox as the default child route */}
                        <Route index element={<Navigate to="inbox" />} />
                    </Route>

                    {/* Note App */}
                    <Route path="/note" element={<NoteIndex />} />

                    {/* Book App */}
                    <Route path="/book" element={<BookIndex />} />
                </Routes>
            </section>
        </Router>
    );
}
