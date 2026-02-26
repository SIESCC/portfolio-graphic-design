import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSite } from '../context/SiteContext';

export default function Experience() {
    const { data } = useSite();
    const { experience } = data;

    const experiences = experience.list || [];

    const renderTimelineItem = (exp, index) => {
        return (
            <div key={index} className="relative pl-8 md:pl-24 py-12 border-l border-white/20 group">

                {/* Animated Line Marker */}
                <motion.div
                    className="absolute -left-[6px] top-14 md:top-20 w-3 h-3 rounded-none bg-[var(--color-brand-red)] scale-75 group-hover:scale-125 transition-all duration-300"
                />

                <div className="flex flex-col md:flex-row gap-8 md:gap-24 relative overflow-hidden">

                    <motion.div
                        className="md:w-1/4 text-sm md:text-base uppercase tracking-[0.2em] text-[var(--color-brand-red)] font-bold md:mt-3 xl:mt-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {exp.year}
                    </motion.div>

                    <motion.div
                        className="md:w-3/4 flex flex-col gap-4"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-none mb-2">
                            {exp.role}
                        </h3>
                        <h4 className="text-xl md:text-2xl text-gray-500 font-sans">{exp.company}</h4>
                        <p className="max-w-xl text-white/70 leading-relaxed mt-2 font-sans">
                            {exp.description}
                        </p>
                    </motion.div>

                </div>
            </div>
        );
    };

    return (
        <section className="w-full py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto md:px-8">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-white leading-none">
                        {experience.title}
                    </h2>
                </div>

                <div className="relative">
                    {/* Main Timeline Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-red-900/40" />

                    {experiences.map((exp, index) => renderTimelineItem(exp, index))}
                </div>
            </div>
        </section>
    );
}
