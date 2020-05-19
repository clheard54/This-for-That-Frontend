import React, { Component } from 'react'
import { api } from '../services/api'
import UserContext from '../context/userContext'
import ItemCard from './ItemCard'

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

    renderFavorites = () => {
        return this.state.favorites.map(fave => {
            return <ItemCard item={fave} />
        })
    }
    
    render(){
        return (
            <>
            <p>My Favorites</p>
            {this.renderFavorites()}
            </>
        )
    }
}

export default Favorites;