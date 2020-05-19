import React, { useContext, useState, useEffect } from 'react'
import CatalogContext from '../context/CatalogContext'

const ItemsFiltered = props => {
    const context = useContext(CatalogContext)
    const [filtered, setFiltered] = useState([])
    
    useEffect(() => getItems, [])

    const getItems = () => {
    const tag = this.props.match.params.tag;
    for (let item of context.items) {
        if (item.tags.includes(tag)) {
            setFiltered([...filtered, item])
        }
    }
    return filtered
    }

    return (   
        <>
        {/* <img className="card-img-top" src={image} />
        <div classNamer="card-body">
            <h3>{style}</h3>
            <h4>{maker}</h4>
        </div> */}
        <button onClick={() => this.props.history.push('/items')}>Back to All the Things</button>
        </>
    );
}

export default ItemsFiltered
