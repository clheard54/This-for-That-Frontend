import React, { Fragment, useContext, useState } from 'react';
import Item from "../components/Item";
import CatalogContext from '../context/CatalogContext'
import Select from "react-dropdown-select";


const ItemsCatalog = props => {
    const context = useContext(CatalogContext)
    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState([])

    useEffect(setCategories(context.itemTags), [])

    const renderItems = () => {
        return context.items.map(item => {
            return <Item {...props} item={item} />
        })
    }

    const handleFilter = (e) => {
        e.preventDefault();

    }

    return (
        <div className='container'>
            <h1 id='caption'>All the Things.</h1>
            <div className='row-filter'>
            Filter by Category:&ensp;
            <Select  style={{'minWidth':'200px'}} multi={true} options={context.itemTags} onChange={(values) => this.setFilters(values)} /></div>
            <div className='row'> 
            {renderItems()}
            </div>
        </div>
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