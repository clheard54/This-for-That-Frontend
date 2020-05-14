import React, { Fragment } from 'react'

const Catalog = props => {

    return (
        <Fragment>
            <br/>
            <div className='flex-row'>
                <div className='col-left'>
                    <a href="/items" className='big-btn' role="button"><h2>STUFF</h2></a>
                    { /* list some categories */}
                </div>
                
                <div className='col-rght'>
                    <a href='/services' className='big-btn' role="button"><h2>TASKS</h2></a>
                    { /* list some categories */}
                </div>
            </div>
        </Fragment>
    )
}

export default Catalog;