'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

interface PredictionChestProps {
    onOpen: () => void;
    isOpen: boolean;
}

const chestVariants: Variants = {
    closed: { scale: 1, rotate: 0 },
    hover: { scale: 1.08, y: -10 },
    tap: { scale: 0.95 },
    shaking: {
        x: [0, -8, 8, -8, 8, 0],
        transition: { duration: 0.6 },
    },
    open: { scale: 1.2, opacity: 0, transition: { duration: 0.6 } },
};

const lidVariants: Variants = {
    closed: { rotateX: 0, originY: 1 },
    open: { rotateX: -130, transition: { duration: 0.9, type: 'spring', bounce: 0.3 } },
};

export default function PredictionChest({ onOpen, isOpen }: PredictionChestProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        if (!isOpen) {
            onOpen();
        }
    };

    return (
        <motion.div
            className="relative cursor-pointer w-72 h-72 md:w-96 md:h-96 mx-auto"
            variants={chestVariants}
            initial="closed"
            animate={isOpen ? 'open' : isHovered ? 'hover' : 'closed'}
            whileTap="tap"
            onClick={handleClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Glow Effect - Coca-Cola style */}
            <div className="absolute inset-0 bg-white/30 blur-3xl rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />

            {/* Chest Body (SVG Representation) */}
            <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-2xl">
                {/* Base - Coca-Cola Red */}
                <path
                    d="M20 80 L180 80 L170 160 Q100 172 30 160 Z"
                    fill="url(#cokeRedGradient)"
                    stroke="#8B0000"
                    strokeWidth="4"
                />
                
                {/* White decorative bands - Coca-Cola style */}
                <path d="M20 80 L180 80 L180 88 L20 88 Z" fill="#FFFFFF" opacity="0.9" />
                <path d="M25 95 L175 95 L175 98 L25 98 Z" fill="#FFFFFF" opacity="0.7" />
                <path d="M25 145 L175 145 L175 148 L25 148 Z" fill="#FFFFFF" opacity="0.7" />
                
                {/* Center keyhole */}
                <rect x="88" y="100" width="24" height="35" fill="#8B0000" rx="3" />
                
                {/* Lock - White/Silver style */}
                <circle cx="100" cy="115" r="10" fill="url(#silverGradient)" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="100" cy="115" r="4" fill="#8B0000" />

                {/* Coca-Cola wave pattern on base */}
                <path 
                    d="M30 120 Q50 115 70 120 T110 120 T150 120 T170 120" 
                    fill="none" 
                    stroke="#FFFFFF" 
                    strokeWidth="2" 
                    opacity="0.4"
                    strokeDasharray="3 3"
                />

                {/* Lid Group - Coca-Cola Red */}
                <motion.g
                    style={{ originY: "80px" }}
                    initial="closed"
                    animate={isOpen ? 'open' : 'closed'}
                    variants={lidVariants}
                >
                    <path
                        d="M20 80 Q100 15 180 80 L180 80 L20 80 Z"
                        fill="url(#lidRedGradient)"
                        stroke="#8B0000"
                        strokeWidth="4"
                    />
                    {/* White highlight on lid */}
                    <path 
                        d="M40 75 Q100 25 160 75" 
                        fill="none" 
                        stroke="#FFFFFF" 
                        strokeWidth="3" 
                        opacity="0.6"
                    />
                    {/* Decorative white curve */}
                    <path 
                        d="M50 70 Q100 30 150 70" 
                        fill="none" 
                        stroke="#FFFFFF" 
                        strokeWidth="1.5" 
                        strokeDasharray="5 5" 
                        opacity="0.4"
                    />
                </motion.g>

                {/* Sparkle effects */}
                <circle cx="45" cy="100" r="2" fill="#FFFFFF" opacity="0.8">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="155" cy="110" r="2" fill="#FFFFFF" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="100" cy="50" r="1.5" fill="#FFFFFF" opacity="0.9">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
                </circle>

                {/* Gradients */}
                <defs>
                    <linearGradient id="cokeRedGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#F40009" />
                        <stop offset="50%" stopColor="#C40005" />
                        <stop offset="100%" stopColor="#8B0000" />
                    </linearGradient>
                    <linearGradient id="lidRedGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#FF0000" />
                        <stop offset="40%" stopColor="#F40009" />
                        <stop offset="100%" stopColor="#C40005" />
                    </linearGradient>
                    <radialGradient id="silverGradient">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#E8E8E8" />
                        <stop offset="100%" stopColor="#C0C0C0" />
                    </radialGradient>
                </defs>
            </svg>
        </motion.div>
    );
}
