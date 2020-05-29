import React, { Fragment, useState, useEffect, useContext } from 'react'
import ItemCard from "../components/ItemCard";
import ServiceCard from "../components/ServiceCard";
import { CatalogContext } from '../context/CatalogContext'
import LoaderHOC_ from '../HOCs/LoaderHOC'


const Profile = (props) => {
    const context = useContext(CatalogContext)
    const { items, services } = context
    const [myPosts, setMyPosts] = useState([])
    const { user_id } = props.location.state

    useEffect(() => {
        items.forEach(item => {
            if (item.user_id == user_id){
                myPosts.push(item)
            }
        })
        let myServices = services.filter(task => task.user_id == user_id)
        myServices.forEach(task => myPosts.push(task))
    }, [])


    const renderItems = () => {
        if (!myPosts || myPosts.length == 0 || myPosts == []) {
            return (
            <Fragment><br/><br/><h4>You have no live posts right now</h4></Fragment>)
        } else {
            return myPosts.map(post => {
                return post.type == "Item" ? <div><button>Delete</button><ItemCard {...props} item={post} onClick={() => props.history.push(`/items/${post.id}`)}/></div> : <div><button>Delete</button><ServiceCard {...props} service={post} onClick={() => props.history.push(`/services/${post.id}`)}/></div>
                })
        }
    }

    return(
        <div>
            {renderItems()}
        <br/><br/>
            <button onClick={() => {props.history.push('/profile')}}>Back to Profile</button>&emsp;&emsp;&emsp;
            <button onClick ={() => {props.history.push('/post')}}>Add a New Offering</button>        
        </div>
    )
}

export default LoaderHOC_(Profile)