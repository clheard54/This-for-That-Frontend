import React, { useContext, useEffect, useState } from "react";
import WriteMessage from '../forms/WriteMessage'
import LoaderHOC_ from '../HOCs/LoaderHOC'
import LoadUserHOC from '../HOCs/LoadUserHOC'
import UserContext from "../context/userContext";
import TimerMixin from 'react-timer-mixin'
import { api } from '../services/api'

const ServiceDetail = props => {
    const context = useContext(UserContext)
    const [msg, setMsg] = useState(false)
    const [favorite, setFavorite] = useState({})
    const [error, setError] = useState(false)
    const service = props.services.find(x => x.id == props.match.params.id)

    useEffect(() => {
      api.getRequests.getFavorites().then(data => {
        let isFavorite = data.filter(fave => fave.user_id == context.current_user.id).filter(fave => fave.offering_type == 'Service').filter(fave => fave.offering_id == service.id)
        if (isFavorite.length>0){
          setFavorite(isFavorite[0])
        }
      })
    }, [])

    const addFavorite = () => {
      if (!favorite){
        let newFave = {
          favorite: {
            user_id: context.current_user.id,
            offering_type: 'Service',
            offering_id: service.id
          }
        }
        api.posts.postFavorite(newFave).then(data => {
          if (!data.error){
            setFavorite(data)
            setMsg(true)
            TimerMixin.setTimeout(
              () => setMsg(false),
                  3000)
          } else {
            setError(true)
          }
        })
      } else {
        api.delete.deleteFavorite(favorite.id)
        setFavorite(false)
      }
    }


     const renderDetail = () => {
        return (
          <>
          <br/>
          <h2>{service.title}<span onClick={addFavorite}id='star-five'></span>{!!favorite ? <span id='star-border'></span>:null} 
          {msg ? <span style={{'fontSize': '1rem', 'fontWeight': 'normal', 'color': 'rgb(42, 212, 147)', 'position': 'relative', 'right': '34px'}}>Added to Favorites!</span> : (!!favorite ? <span style={{'fontSize': '1rem', 'fontWeight': 'normal', 'color': 'rgb(42, 212, 147)', 'position': 'relative', 'right': '34px'}}>In Favorites!</span> : <><br/><hr style={{'width': '20%', 'border': '0', 'border': "1px solid rgb(243, 46, 250)", 'marginTop': '25px'}}></hr></>)}</h2>
          
          <br/>
            <div >
              <img className='image-detail' src={!!service.image ? `${service.image.url}` : "https://cultmtl.com/wp-content/uploads/2016/07/barter.jpg"} alt={!!service.image ? `${service.title} - photo1` : "Generic bartering image"}/>
            </div> 
            <div className='align-left'>
                <p style={{'fontSize': 'large'}}>{service.description}</p>
            <p><b>Ideal Exchange:</b> {service.seeking} </p>
                <small>Location: {service.location}</small><br/>
                <small>Estimated Value: {!!service.value ? service.value : "None listed"}</small><br/><br/>
            </div>
            <br/>
            <span>Interested in learning more or making an offer?</span><br/>
            {!msg ? <><br/><button className='btn btn-primary' onClick={()=>setMsg(true)}>Write Message</button></> : <WriteMessage type='service' offering={service}/> }
                

            </> )
        }
    
    return (
        <>
          <div id='detail'>
            {renderDetail()}
          </div>
          <br/><br/>
          <button className='btn' id='detail-back' onClick={() => props.history.push('/services')}>Back to All Services</button>
        </>
    )
}

export default LoadUserHOC(LoaderHOC_(ServiceDetail))