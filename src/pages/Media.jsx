import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import Footer from '../components/Footer';

export default function Media() {
    const { data } = useSite();
    const { featuredWork, artwork } = data;
    const [mediaItems, setMediaItems] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Extract all media (images and design visuals) from all projects
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

        // Add standalone artwork from the Admin Panel
        if (artwork && artwork.gallery) {
            artwork.gallery.forEach(item => {
                if (item.mediaUrl) {
                    items.push({ url: item.mediaUrl, title: item.title });
                }
            });
        }

        setMediaItems(items);
    }, [featuredWork, artwork]);

    return (
        <main className="bg-[var(--color-brand-bg)] min-h-screen text-[var(--color-brand-accent)] flex flex-col pt-12">

            <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 flex-1">
                {/* Back Navigation */}
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-[var(--color-brand-red)] transition-colors uppercase tracking-widest text-xs font-bold">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </div>

                <motion.div
                    className="w-full pb-32"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Header */}
                    <div className="border-b border-gray-900 pb-12 mb-16 text-center lg:text-left">
                        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter mb-4 uppercase">My Work</h1>
                        <p className="max-w-3xl text-white/70 font-sans leading-relaxed text-base md:text-lg mx-auto lg:mx-0">
                            A complete archive of all visual assets, UI designs, and marketing creatives produced across all featured projects and campaigns.
                        </p>
                    </div>

                    {/* Media Masonry Grid */}
                    {mediaItems.length > 0 ? (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {mediaItems.map((item, index) => {
                                const isVideo = Boolean(String(item.url).match(/\.(mp4|webm|ogg)$/i));

                                return (
                                    <motion.div
                                        key={index}
                                        className="relative break-inside-avoid rounded-2xl overflow-hidden group bg-gray-900 border border-gray-900"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
                                    >
                                        {isVideo ? (
                                            <div className="relative">
                                                <video
                                                    src={item.url}
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                                                />
                                                <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full backdrop-blur-md">
                                                    <Play size={12} className="text-white fill-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={item.url}
                                                alt={item.title}
                                                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
                                            />
                                        )}
                                        {/* Hover Overlay Title */}
                                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-white font-serif tracking-wide text-lg">{item.title}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-white/40 font-serif text-xl border border-gray-900 rounded-3xl">
                            No media assets available.
                        </div>
                    )}

                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
