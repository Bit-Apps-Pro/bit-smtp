/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from 'react-router-dom'
import { useTheme } from '@config/themes/theme.provider'
import { Layout as AntLayout, theme } from 'antd'
import Header from './Header'

function Layout() {
  const { isDark } = useTheme()
  const { useToken } = theme
  const antConfig = useToken()
  return (
    <AntLayout
      color-scheme={isDark ? 'dark' : 'light'}
      style={{
        minHeight: '100vh',
        backgroundColor: antConfig.token.colorBgContainer,
        borderRadius: antConfig.token.borderRadius,
        border: `1px solid ${antConfig.token.controlOutline}`
      }}
    >
      <Header />
      <Outlet />
    </AntLayout>
  )
}

export default Layout
