import React, { useContext, useState } from 'react'
import UserContext from '../context/userContext'
import {Link} from 'react-router-dom'
import WriteMessage from '../forms/WriteMessage'
 

const ServiceCard = props => {
    const context = useContext(UserContext)
    const {service} = props
    // const postedDate = new Date(service.created_at).toString().split(' ').slice(1, 3).join(' ')

    const viewDetails = () => {
        props.history.push(`/services/${service.id}`)
    }

    return (
        <div className="col-md-6">
        <div className="card">
            <div className="card-body">
            <div className={!!service.images ? 'col-md-7' : 'col-md-11'}>
                <h4 className="card-title">{service.title}</h4>
                    <p className="card-text">{service.description}.<br/><br/>
                    <b>Ideal Swap:</b> {service.seeking}</p>
                    <Link to={{pathname: `/services/${service.id}`,
                        state: service}}><button className='btn-pink' onClick={()=> viewDetails}>See Details</button></Link>
                    {/* <p className="card-text"><small className="text-muted">Posted {postedDate}</small></p> */}
            </div>
            {!!service.images ?
            <div className= 'col-md-4'>
                <br/><br/>
                <p><img src={!!service.images[0] ? `${service.images[0].url}` : "https://cultmtl.com/wp-content/uploads/2016/07/barter.jpg"} width="160" alt={`${service.title} - photo1`}/></p>
                    <br/>
                Location: {service.location}<br/>
            </div> : null}
            </div>
        </div>
        <br/><br/>
        </div>
    )
}

export default ServiceCard;


