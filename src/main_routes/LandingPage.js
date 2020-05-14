import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Login from './Login'

function LandingPage(props){

    const handleClick = () => {
        this.props.history.push('/signup')
    }

    return(
        <Fragment>
        <svg class="defs-only" style={{'display': 'none'}}>
        <filter id="monochrome" color-interpolation-filters="sRGB"
                x="0" y="0" height="100%" width="100%">
            <feColorMatrix type="matrix"
            values="0.95 0 0 0 0.05 
                    0.35 0 0 0 0.65  
                    0.55 0 0 0 0.75 
                    0    0 0 1 0" />
        </filter>
        </svg>
        <div className="flex-container">
            {!localStorage.getItem('userToken') ?
            <div className='col'>
              <p>Please Log In or Sign Up below.</p> 
              <Login />
            </div> : null } 
            <img id='trade-circle' src="https://i.ya-webdesign.com/images/trade-drawing-barter-1.gif" alt="trade that"></img>
        </div>
        </Fragment>
    )
}

export default LandingPage
