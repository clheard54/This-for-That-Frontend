import React, { Fragment, useState } from 'react'
import UserContext from '../context/userContext'

const WriteMessage = props => {
    const context = useContext(UserContext)
    const [message, setMessage] = useState({})

    return (
        <Fragment>
            <form>
                <label>What do you have to offer?</label>
                <input type='checkbox'></input>
            </form>
        </Fragment>
    )
}

export default WriteMessage;