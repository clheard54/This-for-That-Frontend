import React, { Fragment, useContext } from 'react'
import UserConsumer from '../context/userContext';

class NavBar extends React.Component {

    closeNav = () => {
        document.getElementById("SideNav").style.width = "0";
        document.querySelector(".main").style.marginLeft = "20px";
      }

    render(){
        return (
            <UserConsumer>
              {context => (
                <div id="SideNav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                    <a href="/profile">My Profile</a>
                    <a href="/add_post">Post an Offering</a>
                    <a href="/catalog">Browse Items</a>
                    <a href="/inbox">Inbox</a>
                    <a href="/logout" onClick={context.userLogout}>Logout</a>
                </div>
              )}
            </UserConsumer>
        )
    }
}

export default NavBar