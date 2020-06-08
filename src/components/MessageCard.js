import React, {useEffect, useState} from 'react'
import { api } from '../services/api'
import { Link } from 'react-router-dom'

const MessageCard = props => {
    const [sender, setSender] = useState({})
    const [offering, setOffering] = useState('')
    const { message, messages } = props
    const sentDate = new Date(message.created_at).toString().split(' ').slice(1, 3).join(' ')


    useEffect(() => {
        api.getRequests.getOwner().then(data => {
            let sender = data.find(user => user.id == message.user_id);
            setSender(sender)
        })
        if (message.offering_type == "Item"){
            api.getRequests. getItems().then(data => {
            let offering = data.find(item => message.offering_id == item.id);
            setOffering(offering.title)
        })} else if (message.offering_type == "Task"){
            api.getRequests.getServices().then(data => {
            let offering = data.find(task => message.offering_id == task.id);
            setOffering(offering.title)
        })
     }
    }, [])

    return (
        <div>
            <Link to={{pathname: `/inbox/${message.id}`,
                state: {message: message, messages: messages}}}><button className='msg-card'>
                    <b>From: {sender.username}</b><br/>
                    <b>Regarding: {offering}</b>
                    <br/>
                    <span>{message.message.slice(0, 60)} ...</span>
                </button>
            </Link>
        </div>
    )
}

export default MessageCard