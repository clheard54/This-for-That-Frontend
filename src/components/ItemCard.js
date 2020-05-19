import React, { useContext, useState } from 'react'
import UserContext from '../context/userContext'
import {Link} from 'react-router-dom'
import WriteMessage from '../forms/WriteMessage'
 

const ItemCard = props => {
    const context = useContext(UserContext)
    const {item} = props

    const viewDetails = () => {
        props.history.push(`/items/${item.id}`)
    }

    return (
        <div className="col col-md-3">
        <div className="card">
            {/*image somewhere*/}
            <div className="card-body">
            <div className='column'>
                <h4 className="card-title">{item.name}</h4>
                    <p className="card-text">{item.description}.<br/>
                    Location: {item.location}<br/>
                    Estimated Value: {item.value}</p>
                    <Link to={`/items/${item.id}`}><button>Detail</button></Link>
                    <p className="card-text"><small className="text-muted">Posted {item.created_at}</small></p>
            </div>
            <div className='column'>
                <img className="card-img-right" src="..." alt="Photo1 {item.name}"></img>
            </div>
            </div>
        </div>
        <br/><br/>
        <button className='btn btn-primary' onClick={()=> viewDetails}>See Details</button>
        </div>
    )
}

export default ItemCard;


