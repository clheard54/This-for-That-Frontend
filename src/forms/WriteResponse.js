import React, { Fragment, useState, useEffect, useContext } from 'react'
import UserContext from '../context/userContext'
import LoadUserHOC from '../HOCs/LoadUserHOC'
import { api } from '../services/api'

const ResponseMessage = props => {
    const context = useContext(UserContext)
    const [response, setResponse] = useState('')
    const [recipient, setRecipient] = useState({})
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(false)
    const [offering, setOffering] = useState({})

    useEffect(() => {
        {props.message.offering_type == "Item" ? api.getRequests. getItems().then(data => {
            let offering = data.find(item => props.message.offering_id == item.id);
            setOffering(offering)
        }) : api.getRequests.getServices().then(data => {
            let offering = data.find(task => props.message.offering_id == task.id);
            setOffering(offering)
        })}
        api.getRequests.getOwner().then(data => {
            let recipient = data.find(user => props.message.user_id == user.id)
            console.log(recipient)
            setRecipient(recipient)
        })
    }, [])
    
    const handleChange = (e) => {
        setResponse(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        let newMsg = {
            message: {
                user_id: context.current_user.id,
                recipient: recipient.username,
                message: response,
                offering_type: !!props.type ? props.type : offering.type,
                offering_id: offering.id
            }
        }
        debugger
        api.posts.postMessage(newMsg).then(resp => {
            if (!resp.error){
                setComplete(true)
            } else {
                setError(resp.error)
            }
        })
        setResponse('')
    }

    return (
        <Fragment>
            {complete ? <><br/><div id='confirmed'>Message Sent!</div></> : 
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

                    <textarea rows='10' cols='60' name="message" value={response} onChange={handleChange}></textarea>
                    <br/><br/>

                    <input className="btn btn-primary" type='submit' value="Send Message"></input>
                </form> 
              </>}
        </Fragment>
    )
}

export default LoadUserHOC(ResponseMessage);


    