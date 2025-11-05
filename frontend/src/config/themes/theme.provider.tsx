import type React from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { type ThemeConfig } from 'antd'
import { ConfigProvider, theme } from 'antd'
import darkTheme from './theme.dark'
import lightTheme from './theme.light'

type ThemeContextType = {
  isDark: boolean
  toggleTheme: () => void
}

const defaultContext: ThemeContextType = {
  isDark: false,
  toggleTheme: () => {}
}

const ThemeContext = createContext<ThemeContextType>(defaultContext)

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // prefer stored user preference
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem('bit_smtp_theme')
      return v === 'dark'
    } catch (e) {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('bit_smtp_theme', isDark ? 'dark' : 'light')
      // update html data-attribute for global css overrides
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    } catch (e) {
      // ignore
    }
  }, [isDark])

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), [])

  const appliedTheme = isDark ? darkTheme : lightTheme

  const contextValue = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme])

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        theme={{
          ...(appliedTheme as ThemeConfig),
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
