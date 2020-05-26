import React, { Component } from 'react'
import { api } from '../services/api'
import UserContext from '../context/userContext'
import ItemCard from './ItemCard'
import ServiceCard from './ServiceCard'
import LoadUserHOC from '../HOCs/LoadUserHOC'
import FavoriteCard from './FavoriteCard'

class Favorites extends Component{
    state = {
        favorites: []
    }

    componentDidMount(){
        api.getRequests.getFavorites().then(data => {
            if (data.length > 0){
                let myFaves = data.filter(fave => fave.user_id == this.context.current_user.id)
            this.setState({favorites: myFaves})
            }
        })
    }


    renderFavorites = () => {
        return this.state.favorites.map(fave => {
            return <FavoriteCard {...this.props} fave={fave}/>
                // <ItemCard {...this.props} item={api.getRequests.getItems().then(data => {data.find(x => x.id == fave.offering_id)})}/> : <ServiceCard {...this.props} item={api.getRequests.getServices().then(data => {data.find(x => x.id == fave.offering_id)})} />)
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
Favorites.contextType = UserContext;

export default LoadUserHOC(Favorites);