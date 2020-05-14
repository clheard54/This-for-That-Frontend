import React, { Fragment, useState } from 'react'
import UserContext from '../userContext'

const AddService = props => {
    const context = useContext(UserContext)
    const [service, setService] = useState({})

    return (
        <Fragment>
            <form>
                <label>What do you have to offer?</label>
                <input type='checkbox'></input>
            </form>
        </Fragment>
    )
}

export default AddService;