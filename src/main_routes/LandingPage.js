import React, { Fragment } from 'react'
import Login from '../components/Login'

function LandingPage(){

    const handleClick = () => {
        this.props.history.push('/signup')
    }

    return(
        <Fragment>
        <div>Home</div>
          <h2>Welcome!</h2>
          {!localStorage.getItem('token') ?
          <p>Please Log In or Sign Up below.</p> : null }
        </Fragment>
    )
}

export default LandingPage
