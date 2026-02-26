import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import Admin from './pages/Admin'
import Resume from './pages/Resume'
import ResumePDF from './pages/ResumePDF'
import Media from './pages/Media'
import { SiteProvider } from './context/SiteContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/resume-pdf" element={<ResumePDF />} />
          <Route path="/media" element={<Media />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  </StrictMode>
)

