import React, { Component } from 'react'
import UserContext from '../context/userContext'
import Inbox from './Inbox'
import Favorites from '../components/Favorites'
import { Link } from 'react-router-dom'

class UserHome extends Component{
    static contextType = UserContext;

    render(){
      return (
        <div className="flex-container">
        <div className="col" id="inbox">
            <Inbox {...this.props}/>
        </div>
        <div className="col" >
            <button className='btn' onClick={()=>this.props.history.push('/catalog')}>Browse Catalog of Offerings</button><br/>
            <button className='btn' onClick ={() => {this.props.history.push('/post')}}>Post an Offering</button><br/><br/><br/><Link to={{pathname: `/myposts`, state: {user_id: this.context.current_user.id}}}><button className='btn' >Manage Your Posts</button></Link>
        </div>
        <div className="col" id="favorites">
            <Favorites {...this.props}/>
        </div>

        </div>
      )
    }
}


export default UserHome;