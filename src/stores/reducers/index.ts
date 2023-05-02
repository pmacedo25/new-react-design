import { combineReducers } from '@reduxjs/toolkit'
import { searchReducer } from '../slices/search'

export const createRootReducer = () =>
  combineReducers({
    search: searchReducer,
  })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>
