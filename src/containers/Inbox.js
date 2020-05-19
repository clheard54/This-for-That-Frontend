import React, { Component } from 'react'
import UserContext from '../context/userContext'
import { api } from '../services/api'
import MessageCard from '../components/MessageCard'
import MessageDetail from '../components/MessageDetail'

//Shows list of MessageCards in column
//onClick of any card => cards slide to left column, and space open in middle for MessageDetail view

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

    renderMessageCards = () => {
        //map through state messages and return <MessageCard> for each</MessageCard>
    }



    render(){
        return (
            <div>
                <p>These are your messages</p>
                {this.renderMessageCards()}
            </div>
        )
    }
}

export default Inbox;