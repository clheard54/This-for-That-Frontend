import React from 'react'
import { api } from '../services/api'

const INITIAL_STATE = {
    user: {
        first_name: '',
        last_name: '',
        email: '',
        location: '',
        username: '',
        password: ''
    },
    errors: null
  }

class Signup extends React.Component{
    state = INITIAL_STATE
                
    handleChange = (event) => {
        let newState = {
          ...this.state,
          user: {
            ...this.state.user,
            [event.target.name]: event.target.value
        } 
      }
        this.setState(newState)
    }

    goToLogin = () => {
        this.props.history.push('/login')
      }


    handleSubmit = (event) => {
        event.preventDefault();
        api.auth.createUser(this.state.user)
            .then(data => {
               if (!!data.user.id){
                  this.setState({...INITIAL_STATE, success: true})
              } else {
                  this.setState({...INITIAL_STATE, errors: data.error})
              }
            })
        this.setState(INITIAL_STATE)
    }

    render(){
        return(
            <div className='container' id='signup'>
              {!this.state.success ?
                (<form id="event-form" onSubmit={this.handleSubmit}>
                  <h3 className="font-weight-bolder">Create an Account:</h3><br></br>
                  {this.state.errors ? <h5 style={{'color': 'red'}}>{this.state.errors} Please try again.</h5> : null}
                    <label>First Name:&ensp;</label><br></br>
                    <input type='text' name='first_name' placeholder='Jane' value={this.state.user.first_name} onChange={this.handleChange}/><br/><br/>

                    <label>Last Name:&ensp;</label><br></br>
                    <input type='text' name='last_name' placeholder='Doe' value={this.state.user.last_name} onChange={this.handleChange}/><br/><br/>

                    <label>Email:&ensp;</label><br></br>
                    <input type='text' placeholder="Email Address" name='email' value={this.state.user.email} onChange={this.handleChange}/><br/><br/>

                    <label>Location:&ensp;</label><br></br>
                    <input type='text' placeholder="Region/State/City" name='location' value={this.state.user.location} onChange={this.handleChange}/><br/><br/>

                    <label>Username:&ensp;</label><br/>
                    <input type='text' placeholder='Your Username' name='username' value={this.state.username} onChange={this.handleChange}/><br/><br/>

                    <label>Password:&ensp;</label>
                    <br/><br/>
                    <input type='password' placeholder="It's a secret" name='password' value={this.state.password} onChange={this.handleChange}/><br></br>
                    <br/><br/><br/><br/>

                <input className="btn btn-success" type="submit" ></input>
        </form> ) : <div>
          <br></br>
          <h4 className="font-weight-bolder">Success!</h4>
          <p style={{'fontSize': '18px'}}>Head to the Login page to see your account.</p>
          <button className="btn btn-success" onClick={this.goToLogin}>Go to Log In</button>
        </div> }
        </div>
        )
    }
}


export default Signup