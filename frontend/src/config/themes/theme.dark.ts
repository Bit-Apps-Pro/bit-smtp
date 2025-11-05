import { type ThemeConfig } from 'antd'
import commonConfig from './common'

const darkTheme: ThemeConfig = {
  ...commonConfig,
  token: {
    ...commonConfig.token,
    colorBgContainer: '#1e293b',
    colorBgElevated: '#0f172a',
    colorTextBase: '#f8fafc',
    colorBorder: '#334155'
  }
}

export default darkTheme
