import React, { Component } from 'react'
import { api } from '../services/api'
import UserContext from '../userContext'


class Favorites extends Component{
    static contextType = UserContext;

    state = {
        favorites: []
    }

    componentDidMount(){
        api.getRequests.getFavorites().then(data => {
            if (data.length > 0){
            data.filter(fave => fave.user_id == this.context.current_user.id)
            }
        })
    }

    renderFavorites
    render(){
        return (
            <p>{React.version}</p>
        )
    }
}

export default Favorites;