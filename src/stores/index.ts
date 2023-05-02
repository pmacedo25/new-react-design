import { configureStore, PreloadedState, combineReducers } from '@reduxjs/toolkit'
import { developerMiddlewares, loadState } from 'stores/helpers'
import { searchReducer } from 'stores/slices/search'

const reducers = combineReducers({
  search: searchReducer,
});

export type RootState = ReturnType<typeof reducers>

export type AppStore = ReturnType<typeof setupStore>

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    preloadedState,
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(developerMiddlewares()),
  })
}

export const store = setupStore(loadState())

export const { dispatch } = store
export type AppDispatch = typeof store.dispatch
