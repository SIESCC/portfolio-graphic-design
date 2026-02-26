import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';
import { Play } from 'lucide-react';

export default function Hero() {
    const { data } = useSite();
    const { hero, global } = data;

    // Use the actual user data from the context, no templates.
    const headline = hero.headline || "CREATIVE\nDEVELOPER\n& VISUAL DESIGNER";

    // Create the background letters dynamically based on their firstName or Logo
    const bgName = global.navbarLogo ? global.navbarLogo.split(' ')[0].toUpperCase() : "ANURAG";
    const bgLetters = bgName.split('');

    return (
        <section className="relative w-full h-[100vh] min-h-[800px] bg-[var(--color-brand-bg)] flex flex-col overflow-hidden">
            {/* Dark elegant animated gradient background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[var(--color-brand-red)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15]"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3, delay: 1, ease: "easeOut" }}
                    className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-red-900 rounded-full mix-blend-screen filter blur-[150px] opacity-[0.2]"
                />
            </div>
            {/* Dark abstract grain overlay for texture instead of heavily cliché styles */}
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
            </div>

            {/* Hero Content */}
            <div className="relative flex-1 flex flex-col justify-end max-w-[1600px] mx-auto w-full px-8 pb-24 md:pb-32 z-20">
                <div className="flex flex-col items-center text-center justify-end w-full h-full pb-8">
                    <div className="flex flex-col items-center max-w-[800px] z-30">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 relative text-white drop-shadow-lg"
                        >
                            {headline.split('\n').join(' ')}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-white/80 font-sans text-sm md:text-lg mb-10 max-w-[500px]"
                        >
                            {hero.subtext}
                        </motion.p>
                        <motion.button
                            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="bg-[var(--color-brand-red)] text-white rounded-full px-8 py-4 flex items-center justify-center gap-3 w-fit hover:bg-white hover:text-black transition-colors z-20 font-bold tracking-widest uppercase text-xs"
                        >
                            <Play size={14} className="fill-current" />
                            View Projects
                        </motion.button>
                    </div>
                    {/* The giant user text in the background */}
                    <div className="absolute top-[40%] md:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 select-none flex justify-center gap-2 md:gap-4 lg:gap-8 px-2 md:px-10 pointer-events-none opacity-20 overflow-hidden">
                        {bgLetters.map((ltr, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="font-serif text-[25vw] xl:text-[300px] leading-none tracking-tighter text-transparent"
                                style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)' }}
                            >
                                {ltr}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid overlay to give it a digital/design structure */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '4rem 4rem'
                }}
            />
            {/* Minimal line accents */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "30vh" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-0 left-[10%] w-[1px] bg-white/20 z-20 pointer-events-none"
            />
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "20vh" }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute top-0 right-[10%] w-[1px] bg-white/20 z-20 pointer-events-none"
            />

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-6 flex flex-col items-center gap-2 z-20 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40">Scroll</span>
                <motion.div
                    className="w-[1px] h-12 bg-white/10 relative overflow-hidden mt-2"
                >
                    <motion.div
                        className="w-full h-full bg-[var(--color-brand-red)] origin-top"
                        animate={{ scaleY: [0, 1, 0], translateY: ['-100%', '0%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
