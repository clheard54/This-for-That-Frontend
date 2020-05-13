import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import { api } from './services/api'
// import userContext from './userContext';
// import userProvider from './userProvider';
import NavBar from './main_routes/NavBar';
import Login from './main_routes/Login';
import LandingPage from './main_routes/LandingPage';
import Signup from './main_routes/Signup';
import UserHome from './containers/UserHome';
import Catalog from './containers/Catalog';
import Inbox from './containers/Inbox';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        current_user: {}
    };
  }

  componentDidMount() {
    // get and set currently logged in user to state
    const token = localStorage.getItem("token");
    if (token) {
      // make a request to the backend and find our user
      api.auth.getCurrentUser().then(user => {
        this.setState({
          current_user: user
        })
      })
    }
  }

  userLogin = (user) => {
    this.setState({
        current_user: user
    })
  }

  userLogout = () => {
    localStorage.removeItem('token')
    this.setState({
        current_user: null
    })
  }

  openNav = () =>  {
    document.getElementById("SideNav").style.width = "250px";
    document.querySelector(".main").style.marginLeft = "270px";
  }

  render() {
    return (
      <div className="all">
      <Router>
        <header>
          <NavBar userLogout={this.userLogout} />
          <img id='menu-icon' src="https://cdn.clipart.email/151e0759dc4c56198b327301b2ae90b9_menu-icon-png-3-lines-png-image-with-transparent-background-toppng_840-859.png" alt="menu" onClick={this.openNav}/>
          <h2>uHave.iWant &emsp;&emsp;</h2>
        </header>

        <div className="main">
          <div>
            <Route 
              exact
              path='/' 
              render={props => <LandingPage {...props} />} /> 
      
            <Route
              exact
              path="/login"
              render = { props => <Login {...props} userLogin={this.userLogin}/>}/>

            <Route 
              exact
              path="/signup"
              render = { props => <Signup {...props} />}/>

            <Route
              exact
              path="/profile"
              render = { props => <UserHome {...props} />}/>

            <Route 
              exact
              path='/catalog' 
              render={props => <Catalog {...props}/>} /> 

            <Route 
              exact
              path='/inbox' 
              render={props => <Inbox {...props}/>} /> 
      
      
          </div>
        </div>
      </Router>
  </div>
    );
  }
}

export default App;


            
 