import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { storageService } from '../../../services/async-storage.service.js'
import { MailSideBar } from '../cmps/MailSideBar.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailInbox } from '../cmps/Inbox.jsx'
import { MailSent } from '../cmps/Sent.jsx'
import { MailStarred } from '../cmps/Starred.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'

const { Route, Routes, Navigate, useLocation, useSearchParams, useParams } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

const { useState, useEffect } = React

export function MailIndex() {
    const LOCATION = useLocation().pathname // Get current location
    const [searchParams] = useSearchParams()  // Get query parameters

    const [mails, setMails] = useState(null)
    const [isComposeOpen, setCompose] = useState(false)
    const [composeData, setComposeData] = useState({ subject: '', body: '' })
    const [isFilterOpen, setIsFilterOpen] = useState(true)
    // const [filterBy, setFilterBy] = useState(carService.getFilterFromSearchParams(searchParams))


    useEffect(() => {
        
        document.body.classList.add('no-overflow') // Add class when component mounts
        mailService.InitMails()
        loadMails();

        return () => {
            document.body.classList.remove('no-overflow') // Remove class when component unmounts
        };
    }, [LOCATION, isFilterOpen])

    useEffect(() => {
        // Check for query parameters and open the compose modal if present
        const querySubject = searchParams.get('subject') || ''
        const queryBody = searchParams.get('body') || ''
        if (querySubject || queryBody) {
            setComposeData({ subject: querySubject, body: queryBody })
            setCompose(true) // Open the compose modal
        }
    }, [searchParams]) // Runs whenever query parameters change

    function loadMails() {
        storageService
            .query('mailDB')
            .then(setMails)
            .catch((err) => {
                console.log('err: ', err)
            })
    }

    function onOpenCompose() {
        setCompose((prevState) => !prevState)
    }

    if (!mails) return <div>Loading...</div>;
    return (
        <section className="mail-index">
            <MailSideBar isFilterOpen={isFilterOpen} onOpenFilter={() => setIsFilterOpen(!isFilterOpen)} />
            <div className="mail-header-body">
                <MailHeader />
                <div className="mail-body">
                    <MailFilter isFilterOpen={isFilterOpen} isComposeOpen={isComposeOpen} onOpenCompose={onOpenCompose} />
                    <React.Fragment>
                        {(() => {
                            switch (LOCATION) {
                                case '/mail/inbox':
                                    return <MailInbox mails={mails} isFilterOpen={isFilterOpen} />;
                                case '/mail/sent':
                                    return <MailSent mails={mails} isFilterOpen={isFilterOpen}/>
                                case '/mail/starred':
                                    return <MailStarred mails={mails} isFilterOpen={isFilterOpen}/>
                                case `/mail/${useParams().mailId}`:
                                    return <MailDetails mailId={useParams().mailId} />
                                default:
                                    return <MailInbox mails={mails} isFilterOpen={isFilterOpen} />;
                            }
                        })()}
                        {isComposeOpen && (
                            <MailCompose
                                to=""
                                subject={composeData.subject}
                                content={composeData.body}
                            />
                        )}
                    </React.Fragment>
                </div>
            </div>
        </section>
    )
}
