import React, {useEffect, useState} from 'react'
import { api } from '../services/api'

const MessageCard = props => {
    const [sender, setSender] = useState({})
    const { message } = props
    const sentDate = new Date(message.created_at).toString().split(' ').slice(1, 3).join(' ')


    useEffect(() => {
        setSender(api.getRequests.findOwner(message))
    }, [])

    return (
        <div className='msg-card'>
            <b>From: sender.username</b>
            <b>Sent: {sentDate}</b>
            <br/>
            <span>{message.message.slice(0, 30)}...</span>
        </div>
    )
}

export default MessageCard