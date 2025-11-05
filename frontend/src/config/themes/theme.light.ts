import { type ThemeConfig } from 'antd'
import commonConfig from './common'

const lightTheme: ThemeConfig = {
  ...commonConfig,
  token: {
    ...commonConfig.token,
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBorder: '#e2e8f0'
  }
}

export default lightTheme
