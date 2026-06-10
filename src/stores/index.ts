import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import { loadState } from 'stores/helpers'
import { preferencesReducer } from 'stores/slices/preferences'

const reducers = combineReducers({
  preferences: preferencesReducer,
})

export type RootState = ReturnType<typeof reducers>
export type AppStore = ReturnType<typeof setupStore>

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    preloadedState,
    reducer: reducers,
  })
}

export const store = setupStore(loadState())
export type AppDispatch = typeof store.dispatch
