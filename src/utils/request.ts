export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchGET(
  url: string,
  attempt = 0,
  attemptsTimeouts: number[] = [100, 250, 500],
  token = '',
  headers?: { [k: string]: string },
  controllerRef?: { controller?: AbortController }
): Promise<Response> {
  if (attempt > 0) {
    await sleep(attemptsTimeouts[attempt - 1])
  }
  token = `bearer ${token}`
  const _headers = headers ? { Authorization: token, ...headers } : { Authorization: token }
  const { signal } = controllerRef?.controller || {}

  const response = await fetch(url, {
    method: 'GET',
    headers: _headers,
    signal,
  })

  if (response.status >= 500) {
    return attempt > attemptsTimeouts.length
      ? response
      : await fetchGET(url, attempt + 1, attemptsTimeouts, token, headers)
  }
  return response
}

export async function postJSON<T extends Record<string, unknown>>(
  url: string,
  data: T
): Promise<Response> {
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function putJSON<T extends Record<string, unknown>>(
  url: string,
  data: T,
  token = '',
  headers?: { [k: string]: string }
): Promise<Response> {
  const _headers = headers ? { Authorization: token, ...headers } : { Authorization: token }

  return fetch(url, {
    method: 'PUT',
    headers: _headers,
    body: JSON.stringify(data),
  })
}
