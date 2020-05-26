import React from 'react'
import { CatalogContext } from '../context/CatalogContext'
import { api } from '../services/api'

const LoaderHOC_ = WrappedComponent => {
    class LoaderHOC extends React.Component {
        static contextType = CatalogContext;

        isReady = () => {
            return !!(this.context.items.length > 0)
        }

        render() {
            return this.isReady() ? <WrappedComponent {...this.props} items={this.context.items}/> : <h3>Loading Data...</h3>
        }
    }
    return LoaderHOC
}

export default LoaderHOC_