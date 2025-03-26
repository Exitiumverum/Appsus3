const { useState, useEffect } = React

export function MailSideBar(isFilterOpen, onOpenFilter) {

    const [isFilterOpenToEdit, setFilter] = useState(isFilterOpen)
    
    
    function handleMenuClick() {
        const MAIL_LIST = document.querySelector('.mail-list')
        const FILTER_SECTION = document.querySelector('.mail-filter-section')
        
        if (FILTER_SECTION.classList.contains('filter-open')) {
            FILTER_SECTION.classList.remove('filter-open')
            MAIL_LIST.classList.remove('filter-open')
            FILTER_SECTION.classList.add('filter-closed')
            MAIL_LIST.classList.add('filter-closed')
        }
        else{
            FILTER_SECTION.classList.remove('filter-closed')
            MAIL_LIST.classList.remove('filter-closed')
            FILTER_SECTION.classList.add('filter-open')
            MAIL_LIST.classList.add('filter-open')
        }
        onOpenFilter()
        setFilter(prevState => console.log(prevState))
    }

    return (
        <React.Fragment>
            <div className="mail-side-bar">
                <div onClick={handleMenuClick} className="menu-opener">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
                </div>
            </div>
        </React.Fragment>
    )
}