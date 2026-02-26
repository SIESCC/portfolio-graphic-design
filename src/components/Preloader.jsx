import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '../context/SiteContext';

export default function Preloader({ onComplete }) {
    const { data } = useSite();
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let current = 0;
        const duration = 1200; // Sped up from 2000
        const intervalTime = 20;
        const step = 100 / (duration / intervalTime);

        const counter = setInterval(() => {
            current += step;
            if (current >= 100) {
                setProgress(100);
                clearInterval(counter);

                // Trigger exit animations
                setTimeout(() => {
                    setIsVisible(false);
                    setTimeout(onComplete, 800); // Wait for exit animation to slide up fully
                }, 200); // Short delay after 100%
            } else {
                setProgress(Math.round(current));
            }
        }, intervalTime);

        return () => clearInterval(counter);
    }, [onComplete]);

    // Split text for stagger
    const text = data.global.preloaderText || "Anurag Pandey";
    const letters = text.split('');

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-brand-bg)]"
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
                >
                    <div className="flex flex-col items-center gap-8 relative z-10 w-full px-6">
                        {/* Progress Number */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 overflow-hidden flex items-end">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="font-serif text-[var(--color-brand-red)] text-sm tracking-[0.3em] uppercase italic"
                            >
                                {progress < 10 ? `0${progress}` : progress}%
                            </motion.div>
                        </div>

                        {/* Split Text Animation */}
                        <div className="flex flex-wrap justify-center overflow-hidden max-w-full">
                            {letters.map((letter, index) => (
                                <motion.span
                                    key={index}
                                    className={`font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter ${letter === ' ' ? 'w-3 md:w-6' : ''} text-white mix-blend-difference`}
                                    initial={{ y: "150%", opacity: 0, rotateZ: 10 }}
                                    animate={{
                                        y: "0%",
                                        opacity: 1,
                                        rotateZ: 0,
                                        transition: { duration: 0.6, delay: index * 0.02, ease: [0.16, 1, 0.3, 1] }
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>

                        {/* Progress Bar Line */}
                        <motion.div
                            className="w-[200px] md:w-[300px] h-[1px] bg-white/20 mt-4 relative overflow-hidden"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <motion.div
                                className="absolute top-0 left-0 bottom-0 bg-[var(--color-brand-red)]"
                                style={{ width: `${progress}%` }}
                            />
                        </motion.div>
                    </div>

                    {/* Subtle Overlay Lines (grid illusion) */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.015]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                            backgroundSize: '2rem 2rem'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
