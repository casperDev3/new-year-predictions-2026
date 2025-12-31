'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

interface PredictionChestProps {
    onOpen: () => void;
    isOpen: boolean;
}

const chestVariants: Variants = {
    closed: { scale: 1, rotate: 0 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    shaking: {
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.5 },
    },
    open: { scale: 1.1, opacity: 0, transition: { duration: 0.5 } },
};

const lidVariants: Variants = {
    closed: { rotateX: 0, originY: 1 },
    open: { rotateX: -120, transition: { duration: 0.8, type: 'spring' } },
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
            className="relative cursor-pointer w-64 h-64 md:w-80 md:h-80 mx-auto"
            variants={chestVariants}
            initial="closed"
            animate={isOpen ? 'open' : isHovered ? 'hover' : 'closed'}
            whileTap="tap"
            onClick={handleClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full animate-pulse" />

            {/* Chest Body (SVG Representation) */}
            <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-2xl">
                {/* Base */}
                <path
                    d="M20 80 L180 80 L170 160 Q100 170 30 160 Z"
                    fill="url(#goldGradient)"
                    stroke="#4a3b18"
                    strokeWidth="3"
                />
                {/* Decorative bands */}
                <path d="M20 80 L180 80 L180 90 L20 90 Z" fill="#4a3b18" />
                <rect x="90" y="100" width="20" height="30" fill="#2a2010" rx="2" />

                {/* Lock */}
                <circle cx="100" cy="115" r="8" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />

                {/* Lid Group */}
                <motion.g
                    style={{ originY: "80px" }} // Pivot point for the lid
                    initial="closed"
                    animate={isOpen ? 'open' : 'closed'}
                    variants={lidVariants}
                >
                    <path
                        d="M20 80 Q100 20 180 80 L180 80 L20 80 Z"
                        fill="url(#lidGradient)"
                        stroke="#4a3b18"
                        strokeWidth="3"
                    />
                    <path d="M20 80 Q100 20 180 80" fill="none" stroke="#B8860B" strokeWidth="2" strokeDasharray="5 5" />
                </motion.g>

                {/* Gradients */}
                <defs>
                    <linearGradient id="goldGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#8B4513" />
                    </linearGradient>
                    <linearGradient id="lidGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#DAA520" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
    );
}
