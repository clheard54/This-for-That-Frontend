import React, { useState, useContext } from 'react'
import { api } from '../services/api'
import UserContext from '../context/userContext'

function Login (props) {
    const context = useContext(UserContext)
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
                localStorage.setItem('userToken', resp.jwt)
                context.userLogin(resp)
            }
            setUsername('')
            setPassword('')
        }, () => this.props.history.push('/profile'))
    }

    return (
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
    )
}

export default Login;