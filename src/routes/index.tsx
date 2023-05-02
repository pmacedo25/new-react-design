import { Route, Switch } from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import Header from 'components/Header/Header'

interface Props {
  data?: any
}

const MainSwitch = ({ data: _data, ...originalProps }: Props) => {
  const dataGenerator = useMemo(() => {
    return consumeData(_data)
  }, [])
  const getInitialData = useCallback(() => dataGenerator.next().value || null, [])
  const props = { ...originalProps, getInitialData }
  return (
    <Switch>
      <Route path={'/'}>
      </Route>
    </Switch>
  )
}

function* consumeData<T>(data: T) {
  yield data
  while (true) {
    yield undefined
  }
}

export const ApplicationRouter = ({ ...props }: Props) => {

  return (
    <>
      <Switch>
        <Route exact={false} path={'/'}>
          <Header />
        </Route>
      </Switch>
      <MainSwitch {...props} />
    </>
  )
}
