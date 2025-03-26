import { mailService } from "../services/mail.service.js";
const { useSearchParams } = ReactRouterDOM; // Import `useSearchParams` hook from React Router DOM

const { useState, useEffect } = React;

export function MailCompose() {
    const [searchParams] = useSearchParams(); // Access query parameters
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const { createSentMail } = mailService;

    // Initialize `subject` and `content` from query parameters
    useEffect(() => {
        const querySubject = searchParams.get('subject') || '';
        const queryBody = searchParams.get('body') || '';
        setSubject(querySubject);
        setContent(queryBody);
    }, [searchParams]); // Runs whenever `searchParams` changes

    const handleSend = () => {
        const EMAIL_DATA = { to, subject, content };
        createSentMail({ ...EMAIL_DATA });
        console.log("Email Sent:", EMAIL_DATA);
    };

    return (
        <div className="mail-compose">
            <h3 className="compose-head">New Message</h3>
            <input
                className="compose-to"
                type="email"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)} // Update state on change
            />
            <input
                className="compose-subject"
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)} // Update state on change
            />
            <textarea
                className="compose-content"
                placeholder="Message content"
                value={content}
                onChange={(e) => setContent(e.target.value)} // Update state on change
            ></textarea>
            <button className="compose-send-btn" onClick={handleSend}>
                Send
            </button>
        </div>
    );
}
