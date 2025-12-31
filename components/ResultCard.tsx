'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

interface ResultCardProps {
    prediction: string;
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(({ prediction }, ref) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring', bounce: 0.4 }}
            className="relative w-full max-w-md mx-auto"
        >
            <div
                ref={ref}
                className="relative overflow-hidden rounded-3xl p-8 md:p-12 flex flex-col items-center justify-between text-center aspect-[9/16] shadow-2xl"
                style={{ 
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8DC 100%)',
                    border: '4px solid #F40009'
                }}
            >
                {/* Decorative corner ribbons - Coca-Cola style */}
                <div className="absolute top-0 left-0 w-20 h-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600 to-red-700 opacity-90" 
                         style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                </div>
                <div className="absolute top-0 right-0 w-20 h-20">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-red-600 to-red-700 opacity-90" 
                         style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
                </div>

                {/* Sparkle decorations */}
                <div className="absolute top-6 left-6">
                    <Star className="w-4 h-4 text-white fill-white sparkle" />
                </div>
                <div className="absolute top-6 right-6">
                    <Star className="w-4 h-4 text-white fill-white sparkle" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Top icon */}
                <motion.div 
                    className="mb-4 md:mb-6 bg-gradient-to-br from-red-600 to-red-700 p-3 md:p-4 rounded-full shadow-lg"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </motion.div>

                {/* Title with Coca-Cola style */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-red-600 tracking-wide uppercase font-sans shine-effect" 
                    style={{ 
                        textShadow: '2px 2px 4px rgba(244, 0, 9, 0.3)',
                        fontWeight: 900,
                        letterSpacing: '0.05em'
                    }}>
                    Передбачення 2026
                </h2>

                {/* Decorative wave line */}
                <svg className="w-28 md:w-32 h-2 mb-4 md:mb-6" viewBox="0 0 100 10">
                    <path 
                        d="M0 5 Q25 0 50 5 T100 5" 
                        stroke="#F40009" 
                        strokeWidth="2" 
                        fill="none"
                    />
                </svg>

                {/* Prediction text */}
                <div className="flex-1 flex items-center justify-center py-4 md:py-6 px-3 md:px-4">
                    <p className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-800 font-semibold leading-relaxed font-cormorant italic"
                       style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                        &ldquo;{prediction}&rdquo;
                    </p>
                </div>

                {/* Bottom decorative elements */}
                <svg className="w-28 md:w-32 h-2 mt-3 md:mt-4 mb-3 md:mb-4" viewBox="0 0 100 10">
                    <path 
                        d="M0 5 Q25 10 50 5 T100 5" 
                        stroke="#F40009" 
                        strokeWidth="2" 
                        fill="none"
                    />
                </svg>

                <div className="mt-2 md:mt-4 text-xs md:text-sm text-red-600 font-bold tracking-widest uppercase">
                    Скриня Майбутнього
                </div>

                {/* Coca-Cola style badge */}
                <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-red-600 text-white px-3 md:px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-md">
                        2026
                    </div>
                </div>

                {/* Background pattern - subtle bubbles */}
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div className="absolute top-20 left-10 w-16 h-16 rounded-full border-2 border-red-300" />
                    <div className="absolute top-40 right-12 w-12 h-12 rounded-full border-2 border-red-300" />
                    <div className="absolute bottom-32 left-16 w-10 h-10 rounded-full border-2 border-red-300" />
                    <div className="absolute bottom-20 right-20 w-14 h-14 rounded-full border-2 border-red-300" />
                </div>

                {/* Shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none rounded-3xl" />
            </div>
        </motion.div>
    );
});

ResultCard.displayName = 'ResultCard';

export default ResultCard;
