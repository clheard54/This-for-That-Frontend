import React, { Fragment, useState, useEffect, useContext } from 'react'
import UserContext from '../context/userContext'
import LoadUserHOC from '../HOCs/LoadUserHOC'
import { api } from '../services/api'

const WriteMessage = props => {
    const context = useContext(UserContext)
    const [message, setMessage] = useState('')
    const [recipient, setRecipient] = useState({})
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(false)
    const { offering } = props

    useEffect(() => {
        api.getRequests.getOwner().then(data => {
            let owner = data.find(user => offering.user_id == user.id)
            setRecipient(owner)
        })
    }, [])
    
    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        let newMsg = {
            message: {
                user_id: context.current_user.id,
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
                <br/><br/>
                <form onSubmit={handleSubmit}>
                    {/* <label>To: {recipient.username}</label><br/> */}
                    <input type='hidden' value={recipient}></input>

                    {/* <label>From: {context.current_user.username}</label> */}
                    <input type='hidden' value={context.currentUser}></input>
                    {/* <br/><br/> */}

                    <label>Subject:&ensp;</label>
                    <input type='text' name='subject' placeholder={offering.title}></input>
                    <br/><br/>

                    <textarea rows='10' cols='60' name="message" value={message} onChange={handleChange}></textarea>
                    <br/><br/>

                    <input className="btn btn-primary" type='submit' value="Send Message"></input>
                </form> 
              </>}
        </Fragment>
    )
}

export default LoadUserHOC(WriteMessage);