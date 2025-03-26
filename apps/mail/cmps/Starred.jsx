
import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"

export function MailStarred({ mails, isFilterOpen }) {

    console.log("starredMail");
    
    const { fullname, email } = mailService.loggedUser
    // console.log(mails);

    // console.log(isFilterOpen)
    const INBOX_BTN = document.querySelector('.mail-filter-item.filter-inbox')


    let filteredMails = mails.filter((mail) => mail.isStarred === true)
    console.log('Satrred: ', filteredMails)
    console.log('Satrred: ', email);

    // console.log(INBOX_BTN);

    return (
        <MailList mails={filteredMails} isFilterOpen={isFilterOpen} />
    )
}