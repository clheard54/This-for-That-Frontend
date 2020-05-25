import React, {useState} from 'react'
import WriteMessage from '../forms/WriteMessage'

const MessageDetail = (props) => {
    const {message} = props
    const [reply, setReply] = useState(false)
    const sentDate = new Date(message.created_at).toString().split(' ').slice(1, 3).join(' ')

    const writeReply = () => {
        setReply(true)
    }

    return(
        <div className='inbox'>
            <div className='msg-header'>
                <b>From: sender.username</b>
                <b>Sent: {sentDate}</b>
                <br/>
            </div>
            <div className='msg-detail'>
                {message.message}
            </div>
            <button onClick={writeReply}>Reply</button>
            <br/>
            {reply ? 
                <div>
                    <WriteMessage offering/>
                </div> 
            : null }
        </div>
    )
}

export default MessageDetail