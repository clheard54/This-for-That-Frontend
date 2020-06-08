import React, { useContext, useState } from 'react'
import UserContext from '../context/userContext'
import {Link} from 'react-router-dom'
import WriteMessage from '../forms/WriteMessage'
 

const ItemCard = props => {
    const context = useContext(UserContext)
    const {item} = props
    // const postedDate = new Date(item.created_at).toString().split(' ').slice(1, 3).join(' ')

    const viewDetails = () => {
        props.history.push(`/items/${item.id}`)
    }

    return (
        <div className="col-md-6">
        <div className="card">
            <div className="card-body">
            <div className={!!item.image ? 'col-md-7' : 'col-md-11'}>
                <h4 className="card-title">{item.title}</h4>
                    <p className="card-text">{item.description}.<br/><br/>
                    <b>Ideal Swap:</b> {item.seeking}<br/>
                    <small className='text-muted'><i>Location: {item.location}</i></small><br/>
                    <small className='text-muted'><i>Estimated Value: {item.value}</i></small></p>
                    {!!item.image ? null :
                    <Link to={{pathname: `/items/${item.id}`,
                        state: item}}><button className='btn btn-pink' onClick={()=> viewDetails}>See Details</button></Link>}
                    {/* <p className="card-text"><small className="text-muted">Posted {postedDate}</small></p> */}
            </div>
            {!!item.image ?
            <div className= 'col-md-4'>
                <br/>
                <p><img src={!!item.image.url ? `${item.image.url}` : "https://cultmtl.com/wp-content/uploads/2016/07/barter.jpg"} width="160" alt={`${item.title} - photo1`}/></p>
                <Link to={{pathname: `/items/${item.id}`,
                    state: item}}><button className='btn btn-pink-small' onClick={()=> viewDetails}>See Details</button></Link>
            </div> : null}
            </div>
        </div>
        <br/><br/>
        </div>
    )
}

export default ItemCard;


