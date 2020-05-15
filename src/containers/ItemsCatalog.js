import React, { useContext } from 'react'
import CatalogContext from '../context/CatalogContext'

const ItemsCatalog = props => {
    const context = useContext(CatalogContext)

    return (
        <div>All the Things People Will Give To You</div>
    )
}

export default ItemsCatalog;