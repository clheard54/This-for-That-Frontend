import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Login from './Login'

function LandingPage(props){

    const handleClick = () => {
        this.props.history.push('/signup')
    }

    return(
        <Fragment>
        <svg className="defs-only" style={{'display': 'none'}}>
        <filter id="monochrome" colorInterpolationFilters="sRGB"
                x="0" y="0" height="100%" width="100%">
            <feColorMatrix type="matrix"
            values="0.95 0 0 0 0.05 
                    0.35 0 0 0 0.65  
                    0.55 0 0 0 0.75 
                    0    0 0 1 0" />
        </filter>
        </svg>
        <div className="flex-container">
            <div className='col'>
            {!localStorage.getItem('userToken') ?
            <>
              <p>Please Log In or Sign Up below.</p> 
              <Login />
            </>
              : 
            <>
              <h4>You're logged in!<br/> Head to your profile</h4><br/> 
              <button className='btn' id='profile-btn' onClick={() => props.history.push('/profile')}>My Profile</button>
              </>}
            </div>  
            <img id='trade-circle' src="https://i.ya-webdesign.com/images/trade-drawing-barter-1.gif" alt="trade that"></img>
        </div>
        </Fragment>
    )
}

export default LandingPage
