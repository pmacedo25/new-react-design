import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ClubbiThemeProvider, Layout, themeClubbi } from 'clubbi-ui'
import { store } from 'stores'
import { saveState } from 'stores/helpers'
import { ApplicationRouter } from 'routes';

export const App = () => {
  store.subscribe(() => {
    saveState(store.getState())
  })

  return (
    <Provider store={store}>
      <ClubbiThemeProvider theme={themeClubbi}>
        <Layout>
          <BrowserRouter>
            <ApplicationRouter />
          </BrowserRouter>
        </Layout>
      </ClubbiThemeProvider>
    </Provider>
  )
}

