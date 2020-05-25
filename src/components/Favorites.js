import React, { Component } from 'react'
import { api } from '../services/api'
import UserContext from '../context/userContext'
import ItemCard from './ItemCard'
import ServiceCard from './ServiceCard'

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

    componentWillReceiveProps(){
        if (!!this.context.current_user.id){
        api.getRequests.getFavorites().then(data => {
            if (data.length > 0){
                let myFaves = data.filter(fave => fave.user_id == this.context.current_user.id)
                console.log(myFaves)
            this.setState({favorites: myFaves})
            }
        })
    }
    }

    renderFavorites = () => {
        return this.state.favorites.map(fave => {
            return (fave.offering_type == "Item" ?
                <ItemCard {...this.props} item={api.getRequests.getItems().then(data => {data.find(x => x.id == fave.offering_id)})}/> : <ServiceCard {...this.props} item={api.getRequests.getServices().then(data => {data.find(x => x.id == fave.offering_id)})} />)
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

export default Favorites;