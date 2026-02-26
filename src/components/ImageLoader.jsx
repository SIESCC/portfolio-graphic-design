import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ImageLoader({ src, alt, className = '', containerClassName = '' }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${containerClassName}`}>
            {/* Soft Gray pulse while loading */}
            <motion.div
                className="absolute inset-0 bg-gray-900 animate-pulse"
                initial={{ opacity: 1 }}
                animate={{ opacity: isLoaded ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            />
            <motion.img
                src={src}
                alt={alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.05
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover ${className}`}
                loading="lazy"
            />
        </div>
    );
}
