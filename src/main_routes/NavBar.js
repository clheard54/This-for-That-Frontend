import React, { Fragment, useContext } from 'react'
import UserConsumer from '../context/userContext';

class NavBar extends React.Component {

    closeNav = () => {
        document.getElementById("SideNav").style.width = "0";
        document.querySelector(".main").style.marginLeft = "10px";
      }

    render(){
        return (
            <UserConsumer>
              {context => (
                <div id="SideNav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                    <h3>Welcome, {context.current_user.username}!</h3>
                    <a href="/profile">My Profile</a>
                    <a href="/post">Post an Offering</a>
                    <a href="/catalog">Browse Catalog</a>
                    <a href="/inbox">Inbox</a>
                    <a href="/" onClick={context.userLogout}>Logout</a>
                </div>
              )}
            </UserConsumer>
        )
    }
}

export default NavBar