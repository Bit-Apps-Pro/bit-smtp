import config from '@config/config'

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */

type MethodType = 'POST' | 'GET'

interface OptionsType {
  method: MethodType
  headers: Record<string, string>
  body?: string | FormData
}

interface QueryParam {
  [key: string]: string | number
}
export interface DefaultResponse<T> {
  status: 'success' | 'error'
  data: T
  code: 'SUCCESS' | 'ERROR'
}

export default async function request<T extends Partial<DefaultResponse<T>>>(
  action: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, unknown> | FormData | null | undefined | any,
  queryParam?: QueryParam | null | undefined,
  method: MethodType = 'POST'
): Promise<T> {
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

  if (method.toLowerCase() === 'post') {
    options.body = data instanceof FormData ? data : JSON.stringify(data)
  }
  return (await fetch(uri, options).then((res: Response) => res.json())) as T
}

type ProxyRequestFunction = <T extends Partial<DefaultResponse<T>>>(
  data: Record<string, unknown> | FormData | null | undefined,
  queryParam?: QueryParam | null
) => Promise<T>

export const proxyRequest: ProxyRequestFunction = (data, queryParam = null) =>
  request('proxy/route', data, queryParam)
