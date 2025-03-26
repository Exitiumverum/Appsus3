const { useEffect, useState } = React
import { eventBusService } from '../services/event-bus.service.js'

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (newMsg) => {
            setMsg(newMsg)
            setTimeout(() => setMsg(null), 3000) // Hide the message after 3 seconds
        })
        return unsubscribe // Cleanup the listener on unmount
    }, [])

    if (!msg) return null

    return (
        <section className={`user-msg ${msg.type}`}>
            {msg.txt}
        </section>
    )
}
