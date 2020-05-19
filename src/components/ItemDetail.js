import React, { useContext, useEffect, useState } from "react";
import {CatalogContext} from '../context/CatalogContext'
import WriteMessage from '../forms/WriteMessage'

const ItemDetail = props => {
    const context = useContext(CatalogContext)
    const {type} = props
    const [msg, setMsg] = useState(false)
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
        <br/><br/>
        <span>Interested in learning more or making an offer?</span>
        <button className='btn btn-primary' onClick={()=>setMsg(true)}>Write Message</button>
            {!!msg ? <WriteMessage type='item' offering={thisItem}/> : null}

        <button onClick={() => this.props.history.push('/items')}>Back to All Items</button>
        </>
        <>
        {/* <img src={}></img> */}
        </>
    </div>
    );
}

export default ItemDetail