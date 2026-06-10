import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PreferencesState, ViewMode } from 'models/blueprint'

const initialState: PreferencesState = {
  highlightedSection: 'pages',
  showImplementationTips: true,
  viewMode: 'comfortable',
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setHighlightedSection: (state, action: PayloadAction<string>) => {
      state.highlightedSection = action.payload
    },
    toggleImplementationTips: (state) => {
      state.showImplementationTips = !state.showImplementationTips
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload
    },
  },
})

export const preferencesReducer = preferencesSlice.reducer
export const preferencesActions = preferencesSlice.actions
