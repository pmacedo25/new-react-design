import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { searchActions } from 'stores/slices/search'
import { useAppDispatch, useAppSelector } from './hooks'

const SearchBarHooks = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const [value] = useAppSelector(({ search }) => [
    search.value || ''
  ])

  const handleInputChange = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>, newInputValue: string) => {
      dispatch(searchActions.setInputValue(newInputValue))
    },
    [dispatch]
  )

  const handleChange = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
      if (newValue.trim().length > 1) {
        dispatch(searchActions.setTerm(newValue))
        history.replace({
          pathname: '/search',
          search: new URLSearchParams({ query: newValue }).toString(),
        })
      }
    },
    [dispatch]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (value.trim().length > 1) {
          dispatch(searchActions.hideWithTerm(value))
          history.replace({
            pathname: '/search',
            search: new URLSearchParams({ query: value }).toString(),
          })
        }
      }
    },
    [dispatch, value, history]
  )

  return [handleChange, handleInputChange, handleKeyDown]
}

export default SearchBarHooks
