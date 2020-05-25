import React, { Component } from 'react'
import Inbox from './Inbox'
import Favorites from '../components/Favorites'

class UserHome extends Component{
    
    render(){
      return (
        <div className="flex-container">
        <div className="col" id="inbox">
            <Inbox />
        </div>
        <div className="col" >
            <button onClick={()=>this.props.history.push('/catalog')}>Browse Catalog of Offerings</button><br/>
            <button onClick ={() => {this.props.history.push('/post')}}>Post an Offering</button>
        </div>
        <div className="col" id="favorites">
            <Favorites {...this.props}/>
        </div>

        </div>
      )
    }
}

export default UserHome;