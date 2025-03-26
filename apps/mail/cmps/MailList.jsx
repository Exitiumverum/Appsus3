import { MailPreview } from "./MailPreview.jsx"
import { mailService } from "../services/mail.service.js"
import { useNavigate } from "react-router-dom"; // Add this import

const { Link, useSearchParams, Navigate } = ReactRouterDOM
const { useState, useEffect } = React

export function MailList({ mails, isFilterOpen, onClick }) {
    // console.log(isFilterOpen);
    const [updateState, setUpdateState] = useState(0); // Add state to trigger re-renders
    const [mailClicked, setMailClicked] = useState(false); // State to track clicked mail ID
    const sortedMails = mails.sort((a, b) => b.sentAt - a.sentAt); // Sort mails by sentAt in descending order

    function handleClick(element) {
        const MAIL_ID = { ...element }.currentTarget.dataset.mailId


        if (MAIL_ID.includes('isCLicked')) return
        else {
            mailService.MailRead(MAIL_ID)
            setMailClicked(prevState => !prevState)
            console.log(MAIL_ID);
        }
        if (onClick) onClick()

    }

    return (
        <ul className='mail-list scorllable'>
            {sortedMails.map(mail => {
                {
                    const IS_MAIL_READ = (mail.isRead) ? 'isClicked' : ''
                    return <Link to={`/mail/${mail.id}`}><li onClick={handleClick} data-mail-id={mail.id} onClick={(element) => handleClick(element)} className={`mail ${IS_MAIL_READ}`} key={mail.id}>
                        <MailPreview mail={mail} />
                    </li></Link>
                }
            })}
        </ul >
    )
}
