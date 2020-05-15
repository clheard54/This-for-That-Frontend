import React, { useContext } from 'react'
import CatalogContext from '../context/CatalogContext'

const ServicesCatalog = props => {
    const context = useContext(CatalogContext)

    /* ability to filter */
    return (
        <div>All the Things People Will Do For You</div>
    )
}

export default ServicesCatalog;

/*
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