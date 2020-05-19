import React, { useContext, useState, useEffect } from "react";
import {CatalogContext} from '../context/CatalogContext'
import WriteMessage from '../forms/WriteMessage'


const ServiceDetail = props => {
    const context = useContext(CatalogContext)
    const {type} = props
    const [msg, setMsg] = useState(false)
    const thisService = {
        title: '',
        description: '',
        location: '',
        value: '',
        seeking: ''
    }

    useEffect(() => {
        const id = this.props.match.params.id;
        thisService = context.services.find(id)
    }, [])
    
  return (
    <div className='flex-row'>
        <>
      <h3>{thisService.name}</h3>
        <div classNamer="card-body">
            <h5>{thisService.description}</h5>
            <small>Location: {thisService.location}</small>
            <small>Estimated Value: {thisService.value}</small><br/>
            <p><b>Seeking:</b> {thisService.seeking} </p>
        </div>
        <br/><br/>
        <span>Interested in learning more or making an offer?</span>
        <button className='btn btn-primary' onClick={()=>setMsg(true)}>Write Message</button>
            {!!msg ? <WriteMessage type="service" offering={thisService}/> : null}

        <button onClick={() => this.props.history.push('/items')}>Back to All Items</button>
        </>
        <>
        {/* <img src={image}></img> */}
        </>
    </div>
    );
}

export default ServiceDetail