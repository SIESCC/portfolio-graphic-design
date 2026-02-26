import React from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';

export default function Footer() {
    const { data } = useSite();
    const { global } = data;

    return (
        <footer className="w-full bg-[#0a0a0a] py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between border-t border-gray-900 pb-24 md:pb-8">

            <div className="text-white/50 text-sm uppercase tracking-widest mb-4 md:mb-0">
                © {new Date().getFullYear()} {global.copyrightName}
            </div>

            <motion.div
                className="flex gap-4 items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
                <span className="text-white/70 text-sm tracking-widest uppercase">{global.freelanceStatus}</span>
            </motion.div>

            <div className="hidden md:flex gap-6 text-sm text-white/50 uppercase tracking-widest">
                <a href="#work" className="hover:text-white transition-colors">{global.navLink1}</a>
                <a href="#about" className="hover:text-white transition-colors">{global.navLink2}</a>
                <a href="#contact" className="hover:text-white transition-colors">{global.navLink3}</a>
            </div>

        </footer>
    );
}
