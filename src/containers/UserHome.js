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
            <button>Browse Items</button>
            <button>Browse Services</button>
            <button>Post an Offering</button>
        </div>
        <div className="col" id="favorites">
            <Favorites/>
        </div>

        </div>
      )
    }
}

export default UserHome;