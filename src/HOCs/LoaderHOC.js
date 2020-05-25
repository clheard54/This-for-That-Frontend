import React from 'react'
import { CatalogContext } from '../context/CatalogContext'
import { api } from '../services/api'

const LoaderHOC_ = WrappedComponent => {
    class LoaderHOC extends React.Component {
        static contextType = CatalogContext;
        state = {
            ready: false
        }

        isReady = () => {
            console.log("hitting loader")
            this.setState({
                ready: !!(this.context.receivedItems)
            }, () => {return this.state.ready})
        }

        render() {
            return this.isReady ? <WrappedComponent {...this.props} /> : <h3>Loading Data...</h3>
        }
    }
    return LoaderHOC
}

export default LoaderHOC_