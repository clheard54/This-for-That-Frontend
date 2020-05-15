import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CatalogProvider } from '../context/CatalogContext'
import { api } from '../services/api'

const Catalog = props => {
    const [allItems, setAllItems] = useState([])
    const [allServices, setAllServices] = useState([])
    const [tags, setTags] = useState([])

    useEffect( ()=> {
        api.getRequests.getItems().then(data => {
            setAllItems(data)}
        )
        api.getRequests.getServices().then(data => {
            setAllServices(data)}
        )
        api.getRequests.getTags().then(data => {
            setTags(data)}
        )
    }, [])


    const addItem = () => {};
    const removeItem = () => {};

    const addService = () => {};
    const removeService = () => {};

    const categories = ["antiques", "appliances", "arts+crafts", "cars/trucks/motorcycles", "beauty+health", "bikes", "books", "clothes+accessories", "electronics", "farm+garden", "furniture", "kids+babies", "materials", "music", "sports+equipment", "tech", "tickets", "tools", "toys+games" ]

    const taskTags = ["babysitting", "beauty+health", "caretaking", "cleaning", "cooking", "creative", "driving", "education", "finances", "fitness", "legal services", "medical services", "miscellaneous", "pets+pet care", "physical labor+moving", "real estate", "skilled trade: plumbing, electric, automotive", "tech help", "yardwork: farm+garden"]

    const renderCategories = () => {
        return categories.map(category => {
            return <><Link to={`/items/${category}`}><button>{category}</button></Link><br/></>
        })
    }


    const renderTaskTags = () => {
        return taskTags.map(tag => {
            return <><Link to={`/services/${tag}`}><button>{tag}</button></Link><br/></>
        })
    }


    return (
        <CatalogProvider value={{
            items: allItems,
            services: allServices,
            tags: tags,
            addItem: addItem,
            removeItem: removeItem,
            addService: addService,
            removeService: removeService
        }}>
        <Fragment>
            <br/>
            <h1 id='caption'>what they Have that you Want</h1>
            <div className='flex-row'>
                <div className='col-left'>
                    <a href="/items" className='big-btn' role="button"><h2>STUFF</h2></a><br/>
                    { /* list some categories */}
                    <small className='text-muted'>Or, click on a link below<br/> if you know what you're looking for.</small><br/><br/>
                    {renderCategories()}
                </div>
                
                <div className='col-rght'>
                    <a href='/services' className='big-btn' role="button"><h2>TASKS</h2></a><br/>
                    { /* list some categories */}
                    <small className='text-muted'>Or, click on a link below<br/> if you know what you're looking for:</small><br/><br/>
                    {renderTaskTags()}
                </div>
            </div>
        </Fragment>
        </CatalogProvider>
    )
}

export default Catalog;

/*
Categories:
STUFF:
-antiques
-appliances
-arts+crafts
-car,truck;motorcycle
-beauty+hlth
-bikes
-books
-tech
-clothes+acc
-electronics
-farm+garden
-furniture
-kids + babies
-materials
-music
-sports + equip
-tickets
-tools
-toys+games

TASKS:
-yardwork, farm+garden
-skilled trade: plumbing, electric, automotive
-physical labor / moving
-cleaning
-babysitting / caretaking
-cooking
-driving
-miscellaneous
-legal services
-medical services
-education
-beauty / personal care
-tech
-creative
-financial
-pets
-real estate
*/