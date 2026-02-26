import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';

export default function MyWorkPreview() {
    const { data } = useSite();
    const { featuredWork, artwork } = data;
    const [previewItems, setPreviewItems] = useState([]);

    useEffect(() => {
        const items = [];
        if (featuredWork && featuredWork.projects) {
            featuredWork.projects.forEach(project => {
                if (project.image) items.push({ url: project.image, title: project.title });
                if (project.designVisuals && project.designVisuals.length > 0) {
                    project.designVisuals.forEach(visual => {
                        items.push({ url: visual, title: `${project.title} Visual` });
                    });
                }
            });
        }

        if (artwork && artwork.gallery) {
            artwork.gallery.forEach(item => {
                if (item.mediaUrl) {
                    items.push({ url: item.mediaUrl, title: item.title });
                }
            });
        }

        // Limit to 4 items for preview
        setPreviewItems(items.slice(0, 4));
    }, [featuredWork, artwork]);

    if (previewItems.length === 0) return null;

    return (
        <section className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-brand-bg)]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-gray-800 pb-8 gap-6">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif tracking-tight text-white leading-none">
                        My Work
                    </h2>
                    <span className="text-[var(--color-brand-red)] uppercase tracking-widest text-xs md:text-sm font-bold">
                        Multimedia Gallery
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {previewItems.map((item, index) => {
                        const isVideo = Boolean(String(item.url).match(/\.(mp4|webm|ogg)$/i));
                        return (
                            <motion.div
                                key={index}
                                className="relative rounded-2xl overflow-hidden aspect-square group bg-gray-900 border border-gray-900"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {isVideo ? (
                                    <video
                                        src={item.url}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                ) : (
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="flex justify-center">
                    <Link
                        to="/media"
                        className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-[var(--color-brand-red)] text-white font-bold hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs rounded-full group"
                    >
                        View All Media
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
