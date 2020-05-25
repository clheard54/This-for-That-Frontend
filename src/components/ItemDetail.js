import React, { useContext, useEffect, useState } from "react";
import WriteMessage from '../forms/WriteMessage'
import LoaderHOC_ from '../HOCs/LoaderHOC'
import UserContext from "../context/userContext";
import { api } from '../services/api'

const ItemDetail = props => {
    const context = useContext(UserContext)
    const item = props.location.state
    const [msg, setMsg] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
      api.getRequests.getFavorites().then(data => {
        let isFavorite = data.filter(fave => fave.user_id == context.current_user.id).filter(fave => fave.offering_type == 'Item').filter(fave => fave.offering_id == item.id)
        if (isFavorite.length>0){
          setFavorite(true)
        }
      })
    }, [])

    const addFavorite = () => {
      if (!favorite){
        let newFave = {
          favorite: {
            user_id: context.current_user.id,
            offering_type: 'Item',
            offering_id: item.id
          }
        }
        debugger
        console.log(newFave)
        api.posts.postFavorite(newFave).then(data => {
          if (!data.error){
            setFavorite(data)
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
          <h2>Offering: {item.title}<span onClick={addFavorite}id='star-five'></span>{!!favorite ? <span id='star-border'></span>:null}</h2>
          {favorite ? <span style={{'color': 'rgb(245, 88, 232)'}}>In Your Favorites</span> : null}
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
                {!!msg ? <WriteMessage type='Item' offering={item}/> : null}

            </> )
        }
    
    return (
        <>
          <div id='detail'>
            {renderDetail()}
          </div>
          <br/><br/>
          <button id='detail-back' onClick={() => props.history.push('/items')}>Back to All Items</button>
        </>
    )
}

export default LoaderHOC_(ItemDetail)