// mail service
import { storageService } from "../../../services/storage.service.js"


let starredMailIds = []

const MAILS_KEY = 'mailDB'
const loggedUser = {
    email: 'avi@gmail.com',
    fullname: 'Avi Cohen'
}

// InitMails()

export const mailService = {
    loggedUser,
    createSentMail,
    getCurrentTimestamp,
    startMail,
    MailRead,
    InitMails
}



// function __createDemoMail() {
//     const mails = [{
//         id: 'e101',
//         createdAt: 1737533108,
//         subject: 'I miss you',
//         body: 'Would love to catch up with you sometime!',
//         isRead: false,
//         sentAt: 1737533108,
//         removedAt: null,
//         from: 'momo@momo.com',
//         name: 'Momo',
//         to: 'avi@gmail.com'
//     },
//     {
//         id: 'e102',
//         createdAt: 1737533108,
//         subject: 'I miss you',
//         body: 'Would love to catch up with you sometime!',
//         isRead: false,
//         sentAt: 1737533108,
//         removedAt: null,
//         from: 'momo@momo.com',
//         name: 'Momo',
//         to: 'avi@gmail.com'
//     },
//     {
//         id: 'e103',
//         createdAt: 1737533108,
//         subject: 'I miss you',
//         body: 'Would love to catch up with you sometime!',
//         isRead: false,
//         sentAt: 1737533108,
//         removedAt: null,
//         from: 'avi@gmail.com',
//         to: 'momo@momo.com'
//     }
//     ]
//     storageService.saveToStorage(MAILS_KEY, mails)
// }

// lastMailId = 

function InitMails() {
    if (!storageService.loadFromStorage(MAILS_KEY)) __createDemoMails()
    else return
}



function createSentMail(EMAIL_DATA) {
    const { subject, content, to } = EMAIL_DATA

    const MAIL = {
        id: __generateMailId(),
        createdAt: getCurrentTimestamp(),
        subject: subject,
        body: content,
        isRead: false,
        sentAt: getCurrentTimestamp(),
        removedAt: null,
        from: loggedUser.email,
        to: to,
        isStarred: false,
    }
    const existingMails = storageService.loadFromStorage(MAILS_KEY) || []
    existingMails.push(MAIL)
    storageService.saveToStorage(MAILS_KEY, existingMails)
}

function startMail(mailId) {
    const existingMails = storageService.loadFromStorage(MAILS_KEY) || []
    const mailIndex = existingMails.findIndex(mail => mail.id === mailId)

    if (mailIndex !== -1) {
        if (!existingMails[mailIndex].isStarred) {
            existingMails[mailIndex].isStarred = true

            console.log('isStarred: ', existingMails[mailIndex].isStarred)
            storageService.saveToStorage(MAILS_KEY, existingMails)
            starredMailIds.push(existingMails[mailIndex].id)
        }
    }
}

function MailRead(mailId) {
    const existingMails = storageService.loadFromStorage(MAILS_KEY) || []
    const mailIndex = existingMails.findIndex(mail => mail.id === mailId)

    if (mailIndex !== -1) {
        if (!existingMails[mailIndex].isRead) {
            existingMails[mailIndex].isRead = true

            console.log('isStarred: ', existingMails[mailIndex].isStarred)
            storageService.saveToStorage(MAILS_KEY, existingMails)
            starredMailIds.push(existingMails[mailIndex].id)
        }
    }
}

function __createDemoMails() {
    const randomNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hannah', 'Ian', 'Jack', 'Avi']
    const randomSubjects = ['Hello!', 'Meeting Reminder', 'Happy Birthday!', 'Project Update', 'Quick Question', 'Invitation', 'Thank You!', 'Feedback Request', 'Newsletter', 'Sale Alert!']
    const randomContents = ['Just checking in!', 'Hope you are doing well.', 'Let`s catch up soon.', 'Looking forward to your reply.', 'Can we reschedule?', 'Thanks for your help!', 'I appreciate your support.', 'Let me know your thoughts.', 'Excited to hear from you!', 'Don`t forget our meeting!']

    const mails = Array.from({ length: 40 }, () => {
        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)]
        const randomEmail = `${randomName.toLowerCase()}@example.com`
        const randomSubject = randomSubjects[Math.floor(Math.random() * randomSubjects.length)]
        const randomContent = randomContents[Math.floor(Math.random() * randomContents.length)]


        const TIME_STAMP = __getRandomTimeStamp()
        return {
            id: __generateMailId(),
            createdAt: TIME_STAMP,
            subject: randomSubject,
            body: randomContent,
            isRead: false,
            sentAt: TIME_STAMP,
            removedAt: null,
            from: randomEmail,
            name: randomName,
            to: loggedUser.email,
            isStarred: false,
        }
    })


    storageService.saveToStorage(MAILS_KEY, mails)
}

function __generateMailId() {
    return 'e' + Math.random().toString(36).substring(2, 11)
}



function getCurrentTimestamp() {
    // return Math.floor(Date.now() / 1000) 
    return Math.floor(Date.now())
}

function __getRandomTimeStamp() {
    const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000); // One year ago
    return Math.floor(Math.random() * (Date.now() - oneYearAgo + 1)) + oneYearAgo
}


