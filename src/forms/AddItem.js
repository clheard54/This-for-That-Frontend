import React, { Fragment, useState } from 'react'
import UserContext from '../userContext'

const AddItem = props => {
    const context = useContext(UserContext)
    const [item, setItem] = useState({})

    return (
        <Fragment>
            <form>
                <label>What do you have to offer?</label>
                <input type='checkbox'></input>
            </form>
        </Fragment>
    )
}

export default AddItem;