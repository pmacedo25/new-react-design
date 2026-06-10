import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppRoutes } from 'routes'
import { saveState } from 'stores/helpers'
import { store } from 'stores'

export const App = () => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      saveState(store.getState())
    })

    return unsubscribe
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  )
}
