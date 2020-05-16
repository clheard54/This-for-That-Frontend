import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import { api } from './services/api'
import { UserProvider } from './context/userContext';
import NavBar from './main_routes/NavBar';
import Login from './main_routes/Login';
import LandingPage from './main_routes/LandingPage';
import Signup from './main_routes/Signup';
import UserHome from './containers/UserHome';
import Catalog from './containers/Catalog';
import ItemsCatalog from './containers/ItemsCatalog';
import ServicesCatalog from './containers/ServicesCatalog';
import Inbox from './containers/Inbox';
import AddOffering from './forms/AddOffering'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        current_user: {}
    };
  }

  componentDidMount() {
    // get and set currently logged in user to state
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
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
    localStorage.removeItem('userToken')
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
        <UserProvider value={{
          current_user: this.state.current_user,
          userLogin: this.userLogin,
          userLogout: this.userLogout
          }}>
        <Router>
          <header>
            <NavBar />
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
                render = { props => <Login {...props}/>}/>

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
                path='/items' 
                render={props => <ItemsCatalog {...props}/>} /> 

              <Route 
                exact
                path='/items/:tag' 
                render={props => <ItemsCatalog {...props}/>} />

              <Route 
                exact
                path='/services' 
                render={props => <ServicesCatalog {...props}/>} /> 

              <Route 
                exact
                path='/post' 
                render={props => <AddOffering {...props}/>} /> 
        
              <Route 
                exact
                path='/inbox' 
                render={props => <Inbox {...props}/>} /> 
        
        
            </div>
          </div>
        </Router>
      </UserProvider>
  </div>
    );
  }
}

export default App;


            
 