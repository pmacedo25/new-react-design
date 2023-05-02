import { Middleware } from "@reduxjs/toolkit"
import { RootState } from "stores"

const localStorageValues = (state: RootState) => {
  const KEYS_IN_LOCAL_STORAGE = ['cart', 'session', 'algoliaEvent']
  const entries = Object.entries(state).filter(([key, _]) => KEYS_IN_LOCAL_STORAGE.includes(key))

  const { value: _, searchedTerm: __, ...remaining } = state.search
  entries.push(['search', remaining])

  return Object.fromEntries(entries)
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    const data = JSON.parse(serializedState)
    return localStorageValues(data)
  } catch (err) {
    return undefined
  }
}

// localStorage.js
//
export const saveState = (state: RootState) => {
  const sateToSave = localStorageValues(state)
  try {
    const serializedState = JSON.stringify(sateToSave)
    localStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}

export const developerMiddlewares = (): Middleware[] => {
  if (process.env.NODE_ENV == 'development') {
    return []
  }
  return []
}