import React, { Fragment, useContext } from 'react';
import Item from "../components/Item";
import CatalogContext from '../context/CatalogContext'

const ItemsCatalog = props => {
    const context = useContext(CatalogContext)

    const renderItems = () => {
        return context.items.map(item => {
            return <Item {...props} item={item} />
        })
    }

    return (
        <Fragment className='container'>
        <h1 id='caption'>All the Things.</h1>
        <div className='row'> 
        {renderItems()}
        </div>
        </Fragment>
    )
}

export default ItemsCatalog;

/*
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
*/