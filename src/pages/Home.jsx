import React, { useState } from 'react';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedWork from '../components/FeaturedWork';
import MyWorkPreview from '../components/MyWorkPreview';
import SkillsMarquee from '../components/SkillsMarquee';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function Home() {
    const [loadingComplete, setLoadingComplete] = useState(false);

    return (
        <main className="bg-[var(--color-brand-bg)] min-h-screen text-[var(--color-brand-accent)]">
            {!loadingComplete && (
                <Preloader onComplete={() => setLoadingComplete(true)} />
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loadingComplete ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Navbar />
                <Hero />
                <About />
                <FeaturedWork />
                <MyWorkPreview />
                <SkillsMarquee />
                <Experience />
                <Contact />
                <Footer />
            </motion.div>
        </main>
    );
}
