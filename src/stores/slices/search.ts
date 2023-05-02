import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { debounce } from 'ts-debounce'
import { getTags } from 'services/productApi'
import { Tag } from 'models/types'

type SearchState = {
    value: string
    inputValue: string
    searchedTerm: string | null
    tags: Tag[]
    recent: string[]
}

const initialState: SearchState = {
    value: '',
    inputValue: '',
    searchedTerm: null,
    recent: [] as string[],
    tags: [] as Tag[],
}

const waitMilliseconds = 400

const searchTypeaheadDebounce = debounce(
    async (value: string) => (value.length > 3 ? await getTags(value) : []),
    waitMilliseconds,
    {}
)

export const searchTypeahead = createAsyncThunk(
    'search/typeahead',
    async (value: string) => await searchTypeaheadDebounce(value.trim())
)

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: '',
        inputValue: '',
        searchedTerm: null,
        recent: [] as string[],
        tags: [] as Tag[],
    } as SearchState,
    reducers: {
        setTerm: (state: SearchState, action: PayloadAction<string>) => {
            const value = action.payload
            return { ...state, value }
        },
        setInputValue: (state: SearchState, action: PayloadAction<string>) => {
            const inputValue = action.payload
            return { ...state, inputValue }
        },
        hideWithTerm: (state: SearchState, action: PayloadAction<string | null>) => {
            const value = action.payload
            const recent = state.recent.slice(0, 99).filter((e) => e != value)

            return {
                ...state,
                searchedTerm: value,
                value: '',
                inputValue: '',
                recent: value ? [value, ...recent] : state.recent,
                tags: value ? state.tags : [],
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchTypeahead.fulfilled, (state, action) => {
            const tags = action.payload
            return { ...state, tags: tags || [] }
        })
    },
})

export const searchReducer = searchSlice.reducer
export const searchActions = searchSlice.actions
