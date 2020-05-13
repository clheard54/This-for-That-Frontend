import React, { Fragment, useContext } from 'react'
import userContext from '../userContext';

class NavBar extends React.Component {

    closeNav = () => {
        document.getElementById("SideNav").style.width = "0";
        document.querySelector(".main").style.marginLeft = "20px";
      }

    render(){
        return (
            <userContext.Consumer>
              {context => (
                <div id="SideNav" class="sidenav">
                    <a href="javascript:void(0)" class="closebtn" onClick={this.closeNav}>&times;</a>
                    <a href="/profile">My Profile</a>
                    <a href="/add_post">Post an Offering</a>
                    <a href="/catolog">Browse Items</a>
                    <a href="/inbox">Inbox</a>
                    <a href="/logout" onClick={this.props.userLogout}>Logout</a>
                </div>
              )}
            </userContext.Consumer>
        )
    }
}

export default NavBar