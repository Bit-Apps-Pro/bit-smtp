import config from '@config/config'

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */

type MethodType = 'POST' | 'GET'

interface OptionsType {
  method: MethodType
  headers: Record<string, string>
  body?: string | FormData
  signal?: AbortSignal
}
interface QueryParam {
  [key: string]: string | number
}

interface RequestOptionsType {
  action: string
  data?: Record<string, unknown> | FormData | null | any // eslint-disable-line @typescript-eslint/no-explicit-any
  queryParam?: QueryParam | null
  method?: MethodType
  signal?: AbortSignal
}

export interface DefaultResponse<T> {
  status: 'success' | 'error'
  data: T
  message: string
  code: 'SUCCESS' | 'ERROR'
}

export default async function request<T>({
  action,
  data,
  queryParam,
  method = 'POST',
  signal
}: RequestOptionsType): Promise<DefaultResponse<T>> {
  const { AJAX_URL, NONCE, ROUTE_PREFIX } = config
  const uri = new URL(AJAX_URL)
  uri.searchParams.append('action', `${ROUTE_PREFIX}${action}`)
  uri.searchParams.append('_ajax_nonce', NONCE)

  // append query params in url
  if (queryParam !== null) {
    for (const key in queryParam) {
      if (key) {
        uri.searchParams.append(key, queryParam[key as keyof QueryParam].toString())
      }
    }
  }

  const options: OptionsType = {
    method,
    headers: {}
  }

  options.signal = signal

  if (method.toLowerCase() === 'post') {
    options.body = data instanceof FormData ? data : JSON.stringify(data)
  }
  return (await fetch(uri, options).then((res: Response) => res.json())) as DefaultResponse<T>
}
