import React, { useContext } from 'react'
import CatalogContext from '../context/CatalogContext'

const ServicesCatalog = props => {
    const context = useContext(CatalogContext)

    return (
        <div>All the Things People Will Do For You</div>
    )
}

export default ServicesCatalog;