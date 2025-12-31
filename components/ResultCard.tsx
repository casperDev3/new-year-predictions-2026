'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ResultCardProps {
    prediction: string;
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(({ prediction }, ref) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
            className="relative w-full max-w-sm mx-auto"
        >
            <div
                ref={ref}
                className="glass relative overflow-hidden rounded-2xl p-8 flex flex-col items-center justify-center text-center aspect-[9/16] border border-white/20 shadow-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' }}
            >
                {/* Decorative corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-yellow-400/50 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-yellow-400/50 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-yellow-400/50 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-yellow-400/50 rounded-br-lg" />

                {/* Content */}
                <div className="mb-6 bg-yellow-400/20 p-3 rounded-full">
                    <Sparkles className="w-8 h-8 text-yellow-300" />
                </div>

                <h2 className="text-xl md:text-2xl font-bold mb-2 text-yellow-100 tracking-wider uppercase font-serif">Передбачення 2026</h2>

                <div className="flex-grow flex items-center justify-center py-4 px-2">
                    <p className="text-2xl md:text-3xl font-serif text-white font-medium leading-relaxed drop-shadow-md font-cormorant italic">
                        &ldquo;{prediction}&rdquo;
                    </p>
                </div>

                <div className="mt-6 text-sm text-yellow-200/60 font-mono tracking-widest uppercase">
                    Скриня майбутнього
                </div>

                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent pointer-events-none" />
            </div>
        </motion.div>
    );
});

ResultCard.displayName = 'ResultCard';

export default ResultCard;
