/* eslint-disable no-undef */
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import "core-js/stable"
import "regenerator-runtime/runtime"
import App from './App'

if (typeof bitsmtp !== 'undefined' && bitsmtp.baseURL && `${window.location.pathname + window.location.search}#` !== bitsmtp.baseURL) {
  bitsmtp.baseURL = `${window.location.pathname + window.location.search}#`
}
if (window.location.hash === '') {
  window.location = `${window.location.href}#/`
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('bit-smtp-root')
)

