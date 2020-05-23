import React, { useContext, useEffect, useState } from "react";
import {CatalogContext} from '../context/CatalogContext'
import WriteMessage from '../forms/WriteMessage'
import LoaderHOC_ from '../HOCs/LoaderHOC'

const ItemDetail = props => {
    const item = props.location.state
    const [msg, setMsg] = useState(false)


     const renderDetail = () => {
        return (
          <>
          <br/>
          <div id='star-five'></div>
          <h2>Offering: {item.title}</h2>
            <div>
                <p style={{'fontSize': 'large'}}>{item.description}</p><br/>
                {/* IMAGES: <img src={}></img> */}
            <p><b>Seeking:</b> {item.seeking} </p>
                <small>Location: {item.location}</small><br/>
                <small>Estimated Value: {item.value}</small><br/><br/>
            </div>
            <br/>
            <span>Interested in learning more or making an offer?</span><br/><br/>
            <button className='btn btn-primary' onClick={()=>setMsg(true)}>Write Message</button>
                {!!msg ? <WriteMessage type='item' offering={item}/> : null}

            </> )
        }
    
    return (
        <>
          <div id='detail'>
            {renderDetail()}
          </div>
          <br/><br/>
          <button id='detail-back' onClick={() => this.props.history.push('/items')}>Back to All Items</button>
        </>
    )
}

export default LoaderHOC_(ItemDetail)