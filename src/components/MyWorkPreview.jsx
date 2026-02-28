import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import ImageLoader from './ImageLoader';

export default function MyWorkPreview() {
    const { data } = useSite();
    const { artwork } = data;
    const previewItems = React.useMemo(() => {
        const items = [];
        if (artwork && artwork.gallery) {
            artwork.gallery.forEach(item => {
                // Ensure mediaList exists and has at least one item
                if (item.mediaList && item.mediaList.length > 0) {
                    items.push({
                        title: item.title,
                        mediaList: item.mediaList.map(m => typeof m === 'object' && m !== null ? m.mediaUrl : m).filter(Boolean)
                    });
                } else if (item.mediaUrl) { // Fallback for old data structure
                    items.push({
                        title: item.title,
                        mediaList: [item.mediaUrl]
                    });
                }
            });
        }
        return items.slice(0, 4);
    }, [artwork]);

    // Modal State
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle slider navigation
    const goNext = (e) => {
        e.stopPropagation();
        if (!selectedItem) return;
        setCurrentIndex((prev) => (prev + 1) % selectedItem.mediaList.length);
    };

    const goPrev = (e) => {
        e.stopPropagation();
        if (!selectedItem) return;
        setCurrentIndex((prev) => (prev - 1 + selectedItem.mediaList.length) % selectedItem.mediaList.length);
    };

    const closePopup = () => {
        setSelectedItem(null);
        setCurrentIndex(0);
    };

    if (previewItems.length === 0) return null;

    return (
        <>
            <section className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-brand-bg)]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-gray-800 pb-8 gap-6">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif tracking-tight text-white leading-none">
                            {artwork?.title || "My Work"}
                        </h2>
                        <span className="text-[var(--color-brand-red)] uppercase tracking-widest text-xs md:text-sm font-bold">
                            Multimedia Gallery
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {previewItems.map((item, index) => {
                            const coverUrl = item.mediaList[0];
                            const isVideo = Boolean(String(coverUrl).match(/\.(mp4|webm|ogg)$/i));
                            return (
                                <motion.div
                                    key={index}
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setCurrentIndex(0);
                                    }}
                                    className="relative rounded-2xl overflow-hidden aspect-square group bg-gray-900 border border-gray-900 cursor-pointer"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {isVideo ? (
                                        <video
                                            src={coverUrl}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    ) : (
                                        <ImageLoader
                                            src={coverUrl}
                                            alt={item.title}
                                            className="transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                            containerClassName="w-full h-full"
                                        />
                                    )}
                                    {/* Indicator for multiple images */}
                                    {item.mediaList.length > 1 && (
                                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold font-sans uppercase tracking-widest">
                                            1/{item.mediaList.length}
                                        </div>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-white text-sm font-bold tracking-wider">{item.title}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="flex justify-center">
                        <MagneticButton strength={0.2}>
                            <Link
                                to="/media"
                                className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-[var(--color-brand-red)] text-white font-bold hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs rounded-full group"
                            >
                                View All Work
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </MagneticButton>
                    </div>
                </div>

            </section>
            {/* Popup Modal */}
            {
                selectedItem && (
                    <div
                        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
                        onClick={closePopup}
                    >
                        <button
                            className="absolute top-4 right-6 text-white text-3xl hover:text-red-500 z-[99999] cursor-pointer"
                            onClick={closePopup}
                        >
                            &times;
                        </button>

                        <div className="w-full h-full flex flex-col items-center justify-center relative pointer-events-auto" onClick={e => e.stopPropagation()}>
                            {/* Current Image/Video */}
                            <div className="w-full max-h-[80vh] flex items-center justify-center relative overflow-hidden rounded-md">
                                {selectedItem.mediaList.map((mediaUrl, idx) => {
                                    const isActive = idx === currentIndex;
                                    const isVideo = Boolean(String(mediaUrl).match(/\.(mp4|webm|ogg)$/i));

                                    return (
                                        <React.Fragment key={idx}>
                                            {isVideo ? (
                                                <video
                                                    src={mediaUrl}
                                                    autoPlay={isActive}
                                                    controls={isActive}
                                                    className={`max-w-full max-h-[80vh] object-contain ${isActive ? 'block' : 'hidden'}`}
                                                />
                                            ) : (
                                                <img
                                                    src={mediaUrl}
                                                    alt={`${selectedItem.title} - ${idx + 1}`}
                                                    className={`max-w-full max-h-[80vh] object-contain shadow-2xl ${isActive ? 'block' : 'hidden'}`}
                                                    loading={idx === 0 ? "eager" : "lazy"}
                                                />
                                            )}
                                        </React.Fragment>
                                    );
                                })}

                                {/* Navigation Arrows */}
                                {selectedItem.mediaList.length > 1 && (
                                    <>
                                        <button
                                            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer z-50"
                                            onClick={goPrev}
                                        >
                                            &#10094;
                                        </button>
                                        <button
                                            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer z-50"
                                            onClick={goNext}
                                        >
                                            &#10095;
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Title and Image Counter */}
                            <div className="mt-6 text-center">
                                <h3 className="text-white text-xl md:text-2xl font-serif tracking-widest uppercase mb-2">
                                    {selectedItem.title}
                                </h3>
                                {selectedItem.mediaList.length > 1 && (
                                    <p className="text-white/60 text-sm tracking-widest uppercase">
                                        {currentIndex + 1} / {selectedItem.mediaList.length}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
