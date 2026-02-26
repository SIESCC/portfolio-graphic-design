import React from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';

export default function About() {
    const { data } = useSite();
    const { about } = data;

    return (
        <section id="about" className="max-w-[1400px] mx-auto px-8 py-32 bg-[var(--color-brand-bg)] w-full relative z-20">
            {/* Main About Layout */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                {/* Left: Large Typography Title */}
                <div className="w-full lg:w-1/2">
                    <motion.h2
                        className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1] tracking-tight"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="block text-white/50 italic font-light">{about.title1}</span>
                        <span className="block mb-4">{about.title2}</span>
                        <span className="block text-[var(--color-brand-red)] italic font-light">{about.title3}</span>
                        <span className="block">{about.title4}</span>
                    </motion.h2>
                </div>

                {/* Right: Details & Resume Button */}
                <div className="w-full lg:w-1/2 flex flex-col pt-4 md:pt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-6 text-white/80 font-sans text-lg md:text-xl leading-relaxed max-w-[600px] mb-12"
                    >
                        <p>{about.bio1}</p>
                        <p>{about.bio2}</p>
                    </motion.div>

                    {/* Resume Buttons */}
                    <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link
                            to="/resume"
                            className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-[var(--color-brand-red)] text-white font-bold hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs rounded-none border border-[var(--color-brand-red)]"
                        >
                            View My Resume
                        </Link>
                        <Link
                            to="/resume-pdf"
                            className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-transparent text-white font-bold hover:bg-white/10 transition-all duration-300 uppercase tracking-widest text-xs rounded-none border border-white/20"
                        >
                            View PDF Resume
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
