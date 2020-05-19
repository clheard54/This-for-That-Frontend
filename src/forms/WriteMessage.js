import React, { Fragment, useState, useEffect, useContext } from 'react'
import UserContext from '../context/userContext'

import { api } from '../services/api'

const WriteMessage = props => {
    const context = useContext(UserContext)
    const [message, setMessage] = useState('')
    const [recipient, setRecipient] = useState({})
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(false)
    const { offering } = props

    useEffect(() => {
        let owner = api.getRequests.findOwner(offering);
        setRecipient(owner)
    }, [])
    
    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        let newMsg = {
            message: {
                user_id: context.currentUser.id,
                recipient: recipient,
                message: message,
                offering_type: props.type,
                offering_id: props.offering.id
            }
        }
        api.posts.postMessage(newMsg).then(resp => {
            if (!resp.error){
                setComplete(true)
            } else {
                setError(resp.error)
            }
        })
        setMessage('')
    }

    return (
        <Fragment>
            {complete ? <><h3>Message Sent!</h3><button onClick={() => this.props.history.push('/catalog')}>Back to Catalog</button></> : 
            <>
              {error ? <h4>Uh-oh, something went wrong. Please try again.</h4> : null}

                <form onSubmit={handleSubmit}>
                    <label>To: {recipient.username}</label><br/>
                    <input type='hidden' value={recipient}></input>
                    <br/><br/>

                    <label>From: {context.currentUser.username}</label><br/>
                    <input type='hidden' value={context.currentUser}></input>
                    <br/><br/>

                    <label>Subject:&ensp;</label>
                    <input type='text' name='subject' placeholder={offering.title}></input>
                    <br/><br/>

                    <textarea rows='5' cols='30' name="message" value={message} onChange={() => handleChange}></textarea>
                    <br/><br/>

                    <input type='submit' value="Send Message"></input>
                </form> 
              </>}
        </Fragment>
    )
}

export default WriteMessage;