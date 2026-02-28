import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import Footer from '../components/Footer';
import ImageLoader from '../components/ImageLoader';

export default function Media() {
    const { data } = useSite();
    const { artwork } = data;
    const [mediaItems, setMediaItems] = useState([]);

    // Modal State
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        const items = [];
        if (artwork && artwork.gallery) {
            artwork.gallery.forEach(item => {
                if (item.mediaList && item.mediaList.length > 0) {
                    items.push({
                        title: item.title,
                        mediaList: item.mediaList.map(m => typeof m === 'object' && m !== null ? m.mediaUrl : m).filter(Boolean)
                    });
                } else if (item.mediaUrl) {
                    items.push({
                        title: item.title,
                        mediaList: [item.mediaUrl]
                    });
                }
            });
        }
        setMediaItems(items);
    }, [artwork]);

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

    return (
        <>
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
                            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter mb-4 uppercase">{artwork?.title || "My Work"}</h1>
                            <p className="max-w-3xl text-white/70 font-sans leading-relaxed text-base md:text-lg mx-auto lg:mx-0">
                                A complete archive of all visual assets and marketing creatives.
                            </p>
                        </div>

                        {/* Media Masonry Grid */}
                        {mediaItems.length > 0 ? (
                            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                                {mediaItems.map((item, index) => {
                                    const coverUrl = item.mediaList[0];
                                    const isVideo = Boolean(String(coverUrl).match(/\.(mp4|webm|ogg)$/i));

                                    return (
                                        <motion.div
                                            key={index}
                                            onClick={() => {
                                                setSelectedItem(item);
                                                setCurrentIndex(0);
                                            }}
                                            className="relative break-inside-avoid rounded-2xl overflow-hidden group bg-gray-900 border border-gray-900 cursor-pointer"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
                                        >
                                            {isVideo ? (
                                                <div className="relative">
                                                    <video
                                                        src={coverUrl}
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
                                                <ImageLoader
                                                    src={coverUrl}
                                                    alt={item.title}
                                                    className="transition-transform duration-1000 group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
                                                    containerClassName="w-full h-auto"
                                                />
                                            )}
                                            {/* Indicator for multiple images */}
                                            {item.mediaList.length > 1 && (
                                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold font-sans uppercase tracking-widest z-10">
                                                    1/{item.mediaList.length}
                                                </div>
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

            {/* Popup Modal */}
            {selectedItem && (
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
            )}
        </>
    );
}
