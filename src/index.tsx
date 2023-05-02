import { App } from './App'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
