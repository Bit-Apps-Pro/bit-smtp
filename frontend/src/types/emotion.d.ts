/* eslint-disable @typescript-eslint/consistent-type-imports */
import '@emotion/react'
import { type GlobalToken } from 'antd'

declare module '@emotion/react' {
  export interface Theme {
    theme: import('@ant-design/cssinjs').Theme<
      import('./internal').SeedToken,
      import('./interface').MapToken
    >
    token: GlobalToken
    hashId: string
  }
}
