import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'

createRoot(document.querySelector("#root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      
    </Routes>
    <StrictMode>
      <App />
    </StrictMode>,
  </BrowserRouter>
)
