import React from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const CatalogContext = React.createContext({
    items: [],
    services: [],
    itemTags: ["antiques", "appliances", "arts+crafts", "cars/trucks/motorcycles", "beauty+health", "bikes", "books", "clothes+accessories", "electronics", "farm+garden", "furniture", "kids+babies", "materials", "music", "sports+equipment", "tech", "tickets", "tools", "toys+games" ],
    taskTags: ["babysitting", "beauty+health", "caretaking", "cleaning", "cooking", "creative", "driving", "education", "finances", "fitness", "legal services", "medical services", "miscellaneous", "pets+pet care", "physical labor+moving", "real estate", "skilled trade: plumbing, electric, automotive", "tech services", "yardwork: farm+garden"]
});

const CatalogProvider = CatalogContext.Provider;
const CatalogConsumer = CatalogContext.Consumer;

export {CatalogProvider, CatalogConsumer}
export default CatalogContext;