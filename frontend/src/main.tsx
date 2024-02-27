import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import '@resource/styles/global.css'
import '@resource/styles/utilities.sass'
import '@resource/styles/variables.css'
import '@resource/styles/wp-css-reset.css'
import 'antd/dist/reset.css'
import { enableMapSet } from 'immer'

import AppRoutes from './AppRoutes'

// to enable immer to work with Map and Set
enableMapSet()

// if (config.IS_DEV) window.appState = {}

const elm = document.getElementById('bit-apps-root')
if (elm) {
  const root = createRoot(elm)

  root.render(
    // <StrictMode>
    <HashRouter>
      <AppRoutes />
    </HashRouter>
    // </StrictMode>
  )
}
