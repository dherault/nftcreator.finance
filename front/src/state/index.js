import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import accountAddresses from './reducers/accountAddresses'

// Global non-server state on the application
const store = configureStore({
  reducer: combineReducers({
    accountAddresses,
  }),
})

export default store
