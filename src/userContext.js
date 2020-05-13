import React, {useState} from 'react';
import { api } from './services/api'

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const userContext = React.createContext([{}, ()=> {}]);

export default userContext

