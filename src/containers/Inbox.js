import React, { Component } from 'react'
import UserContext from '../context/userContext'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import MessageCard from '../components/MessageCard'
import MessageDetail from '../components/MessageDetail'
import WriteMessage from '../forms/WriteMessage'
import LoadUserHOC from '../HOCs/LoadUserHOC'
//Shows list of MessageCards in column
//onClick of any card => cards slide to left column, and space open in middle for MessageDetail view

class Inbox extends Component{
    static contextType = UserContext;

    state = {
        messages: [],
        reply: false
    }

    componentDidMount(){
        api.getRequests.getMessages().then(data => {
            if (data.length > 0){
                let myMessages = data.filter(msg => msg.recipient == this.context.current_user.username);
                this.setState({ messages: myMessages })
            }
        });
    }


    renderMessageCards = () => {
        return this.state.messages.map(msg => {
            return (<MessageCard {...this.props} message={msg} messages={this.state.messages}></MessageCard>)
        })
        //map through state messages and return <MessageCard> for each</MessageCard>
    }

    reply = () => {
        this.setState({reply: true})
    }

    render(){
        return (
           <>
           <Link className='link' to={{pathname: `/inbox/`, state:{fromProf: true}}}><h2>Inbox</h2></Link>
                <div>
                    <p>These are your messages</p>
                    {this.renderMessageCards()}
                </div>
              </>
        )
    }
}

export default LoadUserHOC(Inbox);
