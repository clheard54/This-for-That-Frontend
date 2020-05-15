import React, { useContext } from 'react'
import UserContext from '../context/userContext'
 

const Item = props => {
    const context = useContext(UserContext)
    const {item} = props

    return (
        <div className="card">
            {/*image somewhere*/}
            <div className="card-body">
            <div className='column'>
                <h4 className="card-title">{item.name}</h4>
                    <p className="card-text">{item.description}.<br/>
                    Location: {item.location}<br/>
                    Estimated Value: {item.value}</p>
                    <p className="card-text"><small className="text-muted">Posted {item.created_at}</small></p>
            </div>
            <div className='column'>
                <img className="card-img-right" src="..." alt="Photo1 {item.name}"></img>
            </div>
            </div>
        </div>
    )
}

export default Item;