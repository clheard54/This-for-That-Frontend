import React, { useContext, useState, useEffect } from "react";
import UserContext from '../context/userContext'
import WriteMessage from '../forms/WriteMessage'
import { api } from '../services/api'

const ServiceDetail = props => {
    const context = useContext(UserContext)
    const item = props.location.state
    const [msg, setMsg] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [error, setError] = useState(false)
    const thisService = {
        title: '',
        description: '',
        location: '',
        value: '',
        seeking: ''
    }

    useEffect(() => {
      api.getRequests.getFavorites().then(data => {
        let isFavorite = data.filter(fave => fave.user_id == context.current_user.id).filter(fave => fave.offering_type == 'Service').filter(fave => fave.offering_id == item.id)
        if (isFavorite.length>0){
          setFavorite(true)
        }
      })
    }, [])

    
    // useEffect(() => {
    //     const id = props.match.params.id;
    //     thisService = context.services.find(id)
    // }, [])
    
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