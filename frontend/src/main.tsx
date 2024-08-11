import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import Pre_login_homepage from './pages/Pre_login_homepage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Pre_login_homepage/>
  </StrictMode>,
)
