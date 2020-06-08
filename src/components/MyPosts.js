import React, { Fragment, useState, useEffect, useContext } from 'react'
import ItemCard from "./ItemCard";
import EditForm from '../forms/EditForm'
import ServiceCard from "./ServiceCard";
import { CatalogContext } from '../context/CatalogContext'
import LoaderHOC_ from '../HOCs/LoaderHOC'
import { api } from '../services/api';


const MyPosts = (props) => {
    const context = useContext(CatalogContext)
    const { items, services } = context
    const [myPosts, setMyPosts] = useState([])
    const [form, setForm] = useState(false)
    const { user_id } = props.location.state

    useEffect(() => {
        let myItems = items.filter(item => item.user_id == user_id);
        let myServices = services.filter(task => task.user_id == user_id);
        console.log(myItems.concat(myServices))
        // setMyPosts([...myItems, ...myServices])
    }, [])

    const editItem = (offering) => {
        setForm(offering.id)
    }

    const resetForm = () => {
        setForm(false)
    }


    const renderItems = () => {
        if (!myPosts || myPosts.length == 0 || myPosts == []) {
            return (
            <Fragment><br/><br/><h4>You have no live posts right now</h4></Fragment>)
        } else {
            return myPosts.map(post => {
                return post.type == "Item" ? 
                <div className='flex-row1'>
                    {!!form && form==post.id ?
                        <EditForm {...props} offering={post} type="Item" resetForm={resetForm}/> :
                    <><ItemCard {...props} item={post} onClick={() => props.history.push(`/items/${post.id}`)}/>
                    <button className='btn' id="deleter" onClick={() => api.delete.deleteItem(post.id)}>x</button>
                    <br/>
                    <button className='btn' onClick={() => editItem(post)}>Edit Posting</button></> }
                </div> 
                : 
                <div className='flex-row1'>
                    {!!form && form==post.id ?
                        <EditForm {...props} offering={post} type="Task" resetForm={resetForm}/> :
                    <><ServiceCard {...props} service={post} onClick={() => props.history.push(`/services/${post.id}`)}/>
                    <button className='btn' id="deleter" onClick={() => api.delete.deleteService(post.id)}>x</button>
                    <br/>
                    <button className='btn' onClick={() => editItem(post)}>Edit Posting</button></> }
                </div>
                })
        }
    }

    return(
        <div>
                {renderItems()}
        <br/><br/>
            <button className='btn' onClick={() => {props.history.push('/profile')}}>Back to Profile</button>&emsp;&emsp;&emsp;
            <button className='btn' onClick ={() => {props.history.push('/post')}}>Add a New Offering</button>        
        </div>
    )
}

export default LoaderHOC_(MyPosts)