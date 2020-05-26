import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import UserContext from '../context/userContext'
import {Link} from 'react-router-dom'
import { api } from '../services/api'

const FavoriteCard = props => {
    const context = useContext(UserContext)
    const {fave} = props
    const [path, setPath] = useState('')
    const [offering, setOffering] = useState({})
    
    // const postedDate = new Date(item.created_at).toString().split(' ').slice(1, 3).join(' ')

    useEffect( ()=> {
        if (fave.offering_type == "Item"){
            api.getRequests.getItems().then(data => {
                let offering = data.find(x => x.id == fave.offering_id);
                setOffering(offering)})
        } else {
            api.getRequests.getServices().then(data => {
                let offering = data.find(x => x.id == fave.offering_id);
            setOffering(offering)})
        } 
    }, [])

    
    return (
        <div className="card">
            <div className="card-body-2">
            <div className={!!offering.images ? 'col-md-7' : 'col-md-11'}>
                <h5 className="card-title">{offering.title}</h5>
                    <small className="card-text">{offering.description}.<br/><br/>
                    <Link to={{pathname: offering.type == "Item" ? `/items/${offering.id}` : `/services/${offering.id}`, state: offering}}><button className='btn-pink small'>See More</button></Link>
                    {/* <p className="card-text"><small className="text-muted">Posted {postedDate}</small></p> */}
                    </small>
            </div>
            {!!offering.images ?
            <div className= 'col-md-4'>
                <br/><br/>
                <img id='fave-pic' src={!!offering.images[0] ? `${offering.images[0].url}` : "https://fbcd.co/product-lg/7a269ac12e3c7f9704931a6ca97cdaa8_resize.jpg"} alt={`${offering.title} - photo1`}/>
                <br/>
            </div> : null}
            </div>
        <br/><br/>
        </div>
    )
}

export default FavoriteCard;


