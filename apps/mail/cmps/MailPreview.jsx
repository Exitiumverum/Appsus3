
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {
    // console.log('mail: ', mail)

    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        const today = new Date()

        if (date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        } else {
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
        }
    }



    function handleStarClick(elemnt) {
        const MAIL_ID = { ...elemnt }.currentTarget.dataset.mailId
        console.log('star clicked on mail id: ', MAIL_ID)
        mailService.startMail(MAIL_ID)
    }

    const { name, subject, body, sentAt, isStarred, isRead } = mail
    // const READ_CLASS = (isRead) ? 'isClicked' : ''

    return (
        <React.Fragment>
            <div className={`mail-start `}>
                <div className="mail-btns">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" /></svg>
                    <div data-mail-id={mail.id} key={mail.id} onClick={(element) => handleStarClick(element)} className="starred">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg>
                    </div>
                </div>
                <p className="mail-name">{name}</p>
            </div>
            <p>{subject}</p>
            <p>{body}</p>
            <p className="mail-date">{formatDate(sentAt)}</p>
        </React.Fragment>
    )
}