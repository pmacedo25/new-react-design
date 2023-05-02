import { fetchGET, postJSON, putJSON } from './request'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

const productApiURL = process.env.REACT_APP_PRODUCT_API_URL
const orderApiURL = process.env.REACT_APP_ORDER_API_URL

export const getURL = (x = ''): string => `${productApiURL}${x}`
export const getOrderURL = (x = ''): string => `${orderApiURL}${x}`

export class FetchGetException {
  constructor(readonly response: Response) {}
}

export const apiGet = async (
  endpoint: string,
  orderApi = false,
  token = '',
  headers?: { [k: string]: string },
  controllerRef?: { controller?: AbortController }
): Promise<any> => {
  const url = orderApi ? getOrderURL(endpoint) : getURL(endpoint)

  const response = await fetchGET(url, 0, [100, 250, 500], token, headers, {
    controller: controllerRef?.controller,
  })
  if (!response.ok) {
    throw new FetchGetException(response)
  }
  const data = await response.json()

  return camelcaseKeys(data, { deep: true })
}

export const apiPost = async <P>(
  url: string,
  data: { [A in keyof P]: P[A] },
  translateToSnakeCase = true
): Promise<Response> => {
  const _data = translateToSnakeCase ? snakecaseKeys(data, { deep: true }) : data
  return postJSON(getURL(url), _data)
}

export const apiPut = async (
  endpoint: string,
  data: Record<string, unknown>,
  orderApi = false
): Promise<Response> => {
  const url = orderApi ? getOrderURL(endpoint) : getURL(endpoint)
  const _data = snakecaseKeys(data, { deep: true })
  return putJSON(url, _data)
}

export const loadBody = async (
  response: Response,
  camelize = true
): Promise<Record<string, unknown> | null> => {
  if (response.headers.get('Content-Type')?.includes('json')) {
    const responseJson = await response.json()

    if (camelize) {
      return (async () => camelcaseKeys(responseJson, { deep: true }))()
    }

    return (async () => responseJson)()
  }

  return null
}

export const apiOrdersPut = async (
  url: string,
  data: Record<string, unknown>,
  orderApi = false,
  headers?: { [k: string]: string }
): Promise<Response> => {
  const _data = snakecaseKeys(data, { deep: true })
  return putJSON(orderApi ? getOrderURL(url) : getURL(url), _data)
}
