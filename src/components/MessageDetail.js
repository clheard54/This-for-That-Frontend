import React, {useState, useEffect} from 'react'
import ResponseMessage from '../forms/WriteResponse'
import { api } from '../services/api'
import Inbox from '../containers/Inbox'

const MessageDetail = (props) => {
    const { message, messages } = props.location.state
    const [sender, setSender] = useState({})
    const [reply, setReply] = useState(false)
    const sentDate = new Date(message.created_at).toString().split(' ').slice(1, 3).join(' ')


    useEffect(() => {
        api.getRequests.getOwner().then(data => {
            let sender = data.find(user => user.id == message.user_id);
            setSender(sender)
        })
    }, [])


    const writeReply = () => {
        setReply(true)
    }

    const showDetail = () => {
        return (
        <><div className='inbox'>
            <div className='msg-header'>
                <b>From: {!!sender ? sender.username : "Unknown"}</b><br/>
                <b>Sent: {sentDate}</b>
                <br/>
            </div>
            <div id='msg-detail'>
                <p>{message.message}</p>
            </div>
        </div>
            <br/>
         </>
        )
    }

    return (
        <div className='flex-container'>
            <div className='col col-md-4 inbox-col'>
                <Inbox />
            </div>
            <div className='col col-md-8'>
                {messages.length == 0 ? <><h3>No Messages in your inbox</h3></> : showDetail()}
            {reply ? <ResponseMessage {...props} message={message}/>: <button className='btn btn-primary' onClick={writeReply}>Reply</button>}
            </div>
        </div>
    )
}

export default MessageDetail