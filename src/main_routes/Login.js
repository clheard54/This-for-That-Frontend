import React, { useState } from 'react'
import { api } from '../services/api'
import userContext from '../userContext'

function Login (props) {

    const [username, setUsername] = useState('')
    const  [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        let newUser = {
            user: {
                username: username,
                password: password
            }
        }
        api.auth.login(newUser).then(resp => {
            if (resp.error){
                setError(resp.error)
            } else {
                localStorage.setItem('token', resp.jwt)
                props.userLogin(resp)
            }
            setUsername('')
            setPassword('')
        }, () => this.props.history.push('/profile'))
    }

    return (
        // <userContext.Consumer>
        //   {({userLogin, current_user}) => (
            <div className='login'>
                <form onSubmit={handleSubmit}>
                    <label>Username: &emsp;</label>
                    <input type='text' name='username' value={username}
                    onChange={(e) => setUsername(e.target.value)}></input>
                    <br/><br/>
                    <label>Password: &emsp;</label>
                    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <br/><br/><br/>
                    <input type='submit' value="Log In"></input>
                </form>
            </div> 
        // </userContext.Consumer>
    )
}

export default Login