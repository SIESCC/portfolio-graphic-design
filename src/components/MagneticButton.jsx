import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className = '', strength = 0.2, ...props }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * strength, y: middleY * strength });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className={`cursor-pointer ${className}`}
            {...props}
        >
            <motion.div
                animate={{ x, y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                className="w-full h-full flex items-center justify-center pointer-events-none"
            >
                {/* Re-enable pointer events on children so clicks bubble accurately if needed */}
                <div className="pointer-events-auto w-full h-full flex items-center justify-center">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
