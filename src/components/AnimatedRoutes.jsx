import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from '../pages/Home';
import CaseStudy from '../pages/CaseStudy';
import Admin from '../pages/Admin';
import Resume from '../pages/Resume';
import ResumePDF from '../pages/ResumePDF';
import Media from '../pages/Media';
import PageTransition from './PageTransition';
import ScrollToHash from './ScrollToHash';

export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <>
            <ScrollToHash />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/case-study/:id" element={<PageTransition><CaseStudy /></PageTransition>} />
                    <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
                    <Route path="/resume-pdf" element={<ResumePDF />} />
                    <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}
