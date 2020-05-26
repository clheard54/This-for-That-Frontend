import React from 'react'
import UserContext from '../context/userContext'
import { api } from '../services/api'

const LoadUserHOC = WrappedComponent => {
    class LoadUserHOC extends React.Component {
        static contextType = UserContext;
        
        isReady = () => {
            return !!this.context.current_user.id
        }

        render() {
            return this.isReady() ? <WrappedComponent {...this.props} /> : <h3>Loading Data...</h3>
        }
    }
    return LoadUserHOC
}

export default LoadUserHOC