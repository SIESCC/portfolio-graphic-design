import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSite } from '../context/SiteContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CaseStudy() {
    const { data } = useSite();
    const { id } = useParams();
    const project = React.useMemo(() => {
        return data.featuredWork?.projects?.find(p => p.id === id) || null;
    }, [id, data.featuredWork]);

    const { scrollYProgress } = useScroll();
    const headerY = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    useEffect(() => {
        // Scroll to top on load
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) return <div className="h-screen bg-[var(--color-brand-bg)] text-white flex items-center justify-center">Loading...</div>;

    return (
        <main className="bg-[var(--color-brand-bg)] min-h-screen text-[var(--color-brand-accent)]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full h-[80vh] md:h-screen flex items-end justify-start overflow-hidden pt-32 pb-16 px-6 md:px-12 lg:px-24">

                {/* Parallax Background */}
                <motion.div
                    className="absolute inset-0 z-0 origin-center"
                    style={{ y: headerY }}
                >
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-[120%] object-cover opacity-60"
                        style={{ scale: imageScale }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-bg)] via-[var(--color-brand-bg)]/40 to-transparent" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex flex-wrap gap-4 mb-8">
                            {project.categories.map((cat, i) => (
                                <span key={i} className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest backdrop-blur-md bg-black/20">
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-8 w-full md:w-3/4">
                            {project.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Info */}
            <section className="w-full py-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                {/* Left: Description */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="col-span-1 lg:col-span-8"
                >
                    <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed font-serif">
                        {project.description}
                    </p>
                </motion.div>

                {/* Right: Challenge and Metrics */}
                <div className="col-span-1 lg:col-span-4 flex flex-col gap-12 text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h3 className="text-white/40 uppercase tracking-[0.2em] text-sm mb-6">The Challenge</h3>
                        <p className="text-base leading-relaxed text-white/80">
                            {project.problem}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-white/40 uppercase tracking-[0.2em] text-sm mb-6">Impact / Metrics</h3>
                        <ul className="flex flex-col gap-4">
                            {project.metrics.map((metric, i) => (
                                <li key={i} className="text-lg font-bold tracking-tight border-b border-white/10 pb-4">
                                    {metric}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Design Visuals - Full Width */}
            <section className="w-full px-6 md:px-12 lg:px-24 pb-32 mx-auto max-w-[1600px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {(project.designVisuals || []).filter(v => typeof v === 'string' && v.trim() !== '').map((visual, idx) => {
                        return (
                            <motion.div
                                key={idx}
                                className="w-full relative overflow-hidden bg-gray-900 border border-gray-800 rounded-3xl group col-span-1 aspect-square md:aspect-[4/3]"
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {String(visual).match(/\.(mp4|webm|ogg)$/i) ? (
                                    <video
                                        src={visual}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                ) : (
                                    <img
                                        src={visual}
                                        alt={`Design Exploration ${idx + 1} `}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                        loading="lazy"
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Next Project Teaser */}
            <section className="w-full py-32 border-t border-white/10 mt-16 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-white/40 block mb-8">Ready for more?</span>
                    <Link to="/" className="text-4xl md:text-7xl font-black uppercase tracking-tighter hover:text-white/60 transition-colors inline-block relative group">
                        Back to Projects
                        <div className="absolute -bottom-4 left-0 w-0 right-0 h-1 bg-white transition-all duration-300 group-hover:w-full mx-auto" />
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
