import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Providers from './components/Providers'
import Router from './components/Router'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <React.StrictMode>
    <Providers>
      <Router />
    </Providers>
  </React.StrictMode>,
)

reportWebVitals()
