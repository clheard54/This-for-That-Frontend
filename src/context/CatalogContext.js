import React from 'react';
import { api } from '../services/api'
// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

export const CatalogContext = React.createContext();
export const CatalogConsumer = CatalogContext.Consumer


class CatalogProvider extends React.Component{
    state = {
        items: [],
        services: [],
        messages: [],
        itemTags: ["antiques", "appliances", "arts+crafts", "cars/trucks/motorcycles", "beauty+health", "bikes", "books", "clothes+accessories", "electronics", "farm+garden", "furniture", "kids+babies", "materials", "music", "sports+equipment", "tech", "tickets", "tools", "toys+games" ],
        taskTags: ["babysitting", "beauty+health", "caretaking", "cleaning", "cooking", "creative", "driving", "education", "finances", "fitness", "legal services", "medical services", "miscellaneous", "pets+pet care", "physical labor+moving", "real estate", "skilled trade: plumbing, electric, automotive", "tech services", "yardwork: farm+garden"],
        populateContext: this.populateContext
    }

      populateContext = () => {
        api.getRequests.getItems().then(data => {
          this.setState({
            items: data
          })
        });
        api.getRequests.getServices().then(data => {
          this.setState({
            services: data
          })
        });
        api.getRequests.getTags().then(data => {
          this.setState({
            tags: data
          })
        })
      }

      componentDidMount() {
        this.populateContext()
        console.log('populating')
      }

      render() {
          return (
            <CatalogContext.Provider value={{...this.state, populateContext:this.populateContext}}>
            {this.props.children}
            </CatalogContext.Provider>
          )
      }
}


export default CatalogProvider;