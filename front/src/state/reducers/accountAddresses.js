import { createReducer } from '@reduxjs/toolkit'

import {
  setAccountAddresses,
} from '../actions'

// A reducer for the account address
const accountAddresses = createReducer(null,
  {
    [setAccountAddresses]: (_state, { payload }) => payload,
  },
)

export default accountAddresses
