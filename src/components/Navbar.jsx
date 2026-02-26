import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

export default function Navbar() {
    const { data } = useSite();
    const { global } = data;

    return (
        <motion.nav
            className="fixed top-0 left-0 w-full z-40 flex flex-col md:flex-row items-center justify-between px-6 py-4 md:py-6 md:px-16 gap-3"
            style={{
                background: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link to="/" className="text-[var(--color-brand-accent)] text-lg font-bold tracking-tight uppercase hover:opacity-75 transition-opacity">
                {global.navbarLogo}
            </Link>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-[10px] md:text-sm font-medium uppercase tracking-widest text-[var(--color-brand-accent)] items-center">
                <a href="/#work" className="hover:opacity-75 transition-opacity">{global.navLink1}</a>
                <a href="/#about" className="hover:opacity-75 transition-opacity">{global.navLink2}</a>
                <a href="/#contact" className="hover:opacity-75 transition-opacity">{global.navLink3}</a>
                <Link to="/media" className="whitespace-nowrap hover:opacity-75 transition-opacity">
                    My Work
                </Link>
            </div>
        </motion.nav>
    );
}
