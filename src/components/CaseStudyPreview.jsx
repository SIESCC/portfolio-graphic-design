import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CaseStudyPreview({ project, index }) {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16 mb-40 last:mb-0 relative py-10">
            {/* Left: Sticky Text Content */}
            <div className="w-full lg:w-1/3 flex flex-col">
                <div className="sticky top-32">
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block text-xs uppercase tracking-[0.3em] text-[var(--color-brand-red)] font-bold border border-[var(--color-brand-red)] px-4 py-2 rounded-full">
                            0{index + 1} / {project.categories[0]}
                        </span>
                    </motion.div>

                    <motion.h3
                        className="text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1] mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {project.title}
                    </motion.h3>

                    <motion.p
                        className="text-white/70 text-base md:text-lg mb-10 leading-relaxed font-sans"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {project.description}
                    </motion.p>

                    <motion.div
                        className="flex flex-col gap-4 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <span className="text-white/30 uppercase tracking-[0.2em] text-xs font-bold border-b border-gray-900 pb-2 w-full">Impact & Metrics</span>
                        <div className="flex flex-col gap-2 font-serif text-white/90 text-sm md:text-base italic">
                            {project.metrics?.map((m, i) => (
                                <span key={i} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-red)]" />
                                    {m}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link
                            to={`/case-study/${project.id}`}
                            className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-[var(--color-brand-red)] text-white font-bold hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs rounded-full group"
                        >
                            View Case Study
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Right: Bento Masonry Grid for Images */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[200px] md:auto-rows-[300px]">

                {/* Main Large Image (Spans full height of grid on left) */}
                <motion.div
                    className="col-span-1 md:col-span-7 row-span-2 rounded-[2rem] overflow-hidden relative group bg-gray-900"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                >
                    {project.image && String(project.image).match(/\.(mp4|webm|ogg)$/i) ? (
                        <video src={project.image} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    ) : (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                    )}
                </motion.div>

                {/* Top Right Extra Image */}
                {project.designVisuals?.[0] && (
                    <motion.div
                        className="col-span-1 md:col-span-5 row-span-1 rounded-[2rem] overflow-hidden relative group bg-gray-900"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <img
                            src={project.designVisuals[0]}
                            alt={`${project.title} detail`}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                    </motion.div>
                )}

                {/* Bottom Right Extra Image */}
                {project.designVisuals?.[1] && (
                    <motion.div
                        className="col-span-1 md:col-span-5 row-span-1 rounded-[2rem] overflow-hidden relative group bg-gray-900"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <img
                            src={project.designVisuals[1]}
                            alt={`${project.title} detail`}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
