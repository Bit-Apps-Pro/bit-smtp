/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "core-js/stable";
import "regenerator-runtime/runtime";

if (typeof bitsmtp !== 'undefined' && bitsmtp.baseURL && `${window.location.pathname + window.location.search}#` !== bitsmtp.baseURL) {
  bitsmtp.baseURL = `${window.location.pathname + window.location.search}#`
}
if (window.location.hash === '') {
  window.location = `${window.location.href}#/`
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('bit-smtp-root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
