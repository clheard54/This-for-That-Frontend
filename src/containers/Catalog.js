import React, { Fragment, useState, useEffect } from 'react'
import { CatalogProvider } from '../context/CatalogContext'
import { api } from '../services/api'

const Catalog = props => {
    const [allItems, setAllItems] = useState([])
    const [allServices, setAllServices] = useState([])

    useEffect( ()=> {
        api.getRequests.getItems().then(data => {
            setAllItems(data)}
        )
        api.getRequests.getServices().then(data => {
            setAllServices(data)}
        )
    }, [])


    const addItem = () => {};
    const removeItem = () => {};

    const addService = () => {};
    const removeService = () => {};

    return (
        <CatalogProvider value={{
            allItems: allItems,
            allServices: allServices,
            addItem: addItem,
            removeItem: removeItem,
            addService: addService,
            removeService: removeService
        }}>
        <Fragment>
            <br/>
            <div className='flex-row'>
                <div className='col-left'>
                    <a href="/items" className='big-btn' role="button"><h2>STUFF</h2></a>
                    { /* list some categories */}
                </div>
                
                <div className='col-rght'>
                    <a href='/services' className='big-btn' role="button"><h2>TASKS</h2></a>
                    { /* list some categories */}
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