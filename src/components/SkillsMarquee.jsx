import React from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';

export default function SkillsMarquee() {
    const { data } = useSite();
    const { skills } = data;

    // Split CSV strings into arrays
    const skillsRow1 = skills.row1 ? skills.row1.split(',').map(s => s.trim()) : [];
    const skillsRow2 = skills.row2 ? skills.row2.split(',').map(s => s.trim()) : [];

    const renderMarquee = (items, direction = 1) => {
        return (
            <div className="flex whitespace-nowrap overflow-hidden py-4 border-y border-white/5">
                <motion.div
                    className="flex gap-16 pr-16"
                    animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {/* Duplicate items for seamless loop */}
                    {[...items, ...items, ...items, ...items].map((skill, index) => (
                        <span
                            key={`${skill}-${index}`}
                            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-transparent tracking-tighter"
                            style={{
                                WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                                color: index % 3 === 0 ? 'var(--color-brand-red)' : 'transparent'
                            }}
                        >
                            {skill}
                        </span>
                    ))}
                </motion.div>
            </div>
        );
    };

    return (
        <section className="w-full py-32 overflow-hidden flex flex-col justify-center min-h-[50vh]">
            <div className="mb-16 px-6 md:px-12 lg:px-24">
                <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-[var(--color-brand-red)]">{skills.title}</h3>
            </div>

            <div className="-rotate-2 scale-110">
                {renderMarquee(skillsRow1, 1)}
                {renderMarquee(skillsRow2, -1)}
            </div>
        </section>
    );
}
