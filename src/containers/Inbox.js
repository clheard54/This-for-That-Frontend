import React, { Component } from 'react'
import UserContext from '../context/userContext'
import { api } from '../services/api'

class Inbox extends Component{
    static contextType = UserContext;

    state = {
        messages: []
    }

    componentDidMount(){
        api.getRequests.getMessages().then(data => {
            if (data.length > 0){
                let myMessages = data.filter(msg => msg.recipient == this.context.current_user);
                this.setState({ messages: myMessages })
            }
        });
    }

    render(){
        return (
            <div className='bordered'>
                <p>These are your messages</p>
            </div>
        )
    }
}

export default Inbox;