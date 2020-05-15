import React, {useState} from 'react';
import { api } from '../services/api'

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const UserContext = React.createContext();

const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

export {UserProvider, UserConsumer}
export default UserContext;