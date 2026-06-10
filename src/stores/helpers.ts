import { RootState } from 'stores'

const STORAGE_KEY = 'react-architecture-template'

export const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState) as RootState
  } catch {
    return undefined
  }
}

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify({
      preferences: state.preferences,
    })
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch {
    // ignore write errors
  }
}
