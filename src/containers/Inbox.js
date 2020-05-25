import React, { Component } from 'react'
import UserContext from '../context/userContext'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import MessageCard from '../components/MessageCard'
import MessageDetail from '../components/MessageDetail'
import WriteMessage from '../forms/WriteMessage'
//Shows list of MessageCards in column
//onClick of any card => cards slide to left column, and space open in middle for MessageDetail view

class Inbox extends Component{
    static contextType = UserContext;

    state = {
        messages: [],
        detail: null,
        reply: false
    }

    componentDidMount(){
        api.getRequests.getMessages().then(data => {
            if (data.length > 0){
                let myMessages = data.filter(msg => msg.recipient == this.context.current_user);
                this.setState({ messages: myMessages })
            }
        });
    }

    showMessage = (msg) => {
        this.props.history.push('/inbox')
        this.setState({detail: msg})
    }

    renderMessageCards = () => {
        return this.state.messages.map(msg => {
            return <button onClick={() => this.showMessage(msg)}><MessageCard {...this.props} message={msg}></MessageCard></button>
        })
        //map through state messages and return <MessageCard> for each</MessageCard>
    }

    reply = () => {
        this.setState({reply: true})
    }


    render(){
        return (
           <>
           <Link className='link' to={{pathname: '/inbox', state:{fromProf: true}}}><h2>Inbox</h2></Link>
            {!this.props.location ?
                <div>
                    <p>These are your messages</p>
                    {this.renderMessageCards()}
                </div> : 
                <div className='flex-container'>
                    <div className='col col-md-4 inbox-col'>
                        <p>These are your messages</p>
                        {this.renderMessageCards()}
                    </div>
                    <div className='col col-md-8'>
                    {!!this.state.detail ?
                    <MessageDetail {...this.props} message={this.state.detail}/> : <><h3>No Messages in your inbox</h3></> }
                    </div>
                    {this.state.reply ? <WriteMessage /> : null}
                </div>
            }
              </>
        )
    }
}

export default Inbox;