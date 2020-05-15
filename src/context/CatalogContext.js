import React from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const CatalogContext = React.createContext({
    items: [],
    services: []
});

const CatalogProvider = CatalogContext.Provider;
const CatalogConsumer = CatalogContext.Consumer;

export {CatalogProvider, CatalogConsumer}
export default CatalogContext;