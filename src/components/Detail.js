import React, { useContext, useEffect } from "react";
import CatalogContext from '../context/CatalogContext'

const Detail = props => {
    const context = useContext(CatalogContext)
    const thisItem = {
        title: '',
        description: '',
        location: '',
        value: '',
        seeking: ''
    }

    useEffect(() => {
        const id = this.props.match.params.id;
        thisItem = context.items.find(id)
    }, [])
    
  return (
    <div className='flex-row'>
        <>
      <h3>{thisItem.name}</h3>
        <div classNamer="card-body">
            <h5>{thisItem.description}</h5>
            <small>Location: {thisItem.location}</small>
            <small>Estimated Value: {thisItem.value}</small><br/>
            <p><b>Seeking:</b> {thisItem.seeking} </p>
        </div>
        <button onClick={() => this.props.history.push('/items')}>Back to All Items</button>
        </>
        <>
        <img src={image}></img>
        </>
    </div>
    );
}

export default Detail