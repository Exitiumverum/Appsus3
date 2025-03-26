import { mailService } from "../services/mail.service.js"
import { MailList } from "./MailList.jsx"

const {useState} = React

export function MailInbox({mails, isFilterOpen}) {

    const [refresh, setRefresh] = useState(0); // Add state to trigger re-render

    const { fullname, email } = mailService.loggedUser
// console.log(mails);
    
// console.log(isFilterOpen)
    const INBOX_BTN = document.querySelector('.mail-filter-item.filter-inbox')
    
    const handleMailListClick = () => {
        setRefresh(prev => prev + 1); // Update state to trigger re-render
    };
    
    let filteredMails = mails.filter((mail) => mail.from !== email)
    console.log('Inbox: ', filteredMails)
    console.log('Inbox: ', email);
    
    // console.log(INBOX_BTN);

    return (
        <MailList mails={filteredMails} isFilterOpen={isFilterOpen} onClick={handleMailListClick} />
    )
}