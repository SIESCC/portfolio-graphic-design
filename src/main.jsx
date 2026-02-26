import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AnimatedRoutes from './components/AnimatedRoutes'
import { SiteProvider } from './context/SiteContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </SiteProvider>
  </StrictMode>
)
