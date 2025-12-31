'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface PhoneMockupProps {
    prediction: string;
    emoji: string;
    mockupStyle?: 'modern' | 'classic' | 'gradient';
}

const PhoneMockup = forwardRef<HTMLDivElement, PhoneMockupProps>(
    ({ prediction, emoji, mockupStyle = 'modern' }, ref) => {
        const getMockupStyles = () => {
            switch (mockupStyle) {
                case 'modern':
                    return {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: '12px solid #1a1a2e',
                    };
                case 'classic':
                    return {
                        background: 'linear-gradient(135deg, #F40009 0%, #8B0000 100%)',
                        border: '12px solid #2d2d2d',
                    };
                case 'gradient':
                    return {
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        border: '12px solid #ffffff',
                    };
                default:
                    return {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: '12px solid #1a1a2e',
                    };
            }
        };

        const styles = getMockupStyles();

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, type: 'spring', bounce: 0.4 }}
                className="relative mx-auto"
                style={{ height: '60vh', maxHeight: '800px' }}
            >
                {/* Phone Frame */}
                <div
                    ref={ref}
                    className="relative rounded-[3rem] shadow-2xl overflow-hidden"
                    style={{
                        ...styles,
                        height: '100%',
                        width: 'auto',
                        aspectRatio: '9/19.5',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20 flex items-center justify-center gap-2">
                        <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                    </div>

                    {/* Screen Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pt-12">
                        {/* Emoji */}
                        <motion.div
                            className="text-8xl mb-8"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            {emoji}
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold mb-6 text-white text-center tracking-wide uppercase">
                            Передбачення 2026
                        </h2>

                        {/* Decorative line */}
                        <div className="w-24 h-1 bg-white/50 rounded-full mb-8"></div>

                        {/* Prediction Text */}
                        <div className="flex-1 flex items-center justify-center px-4">
                            <p className="text-xl md:text-2xl font-serif text-white text-center leading-relaxed font-semibold italic">
                                &ldquo;{prediction}&rdquo;
                            </p>
                        </div>

                        {/* Bottom decoration */}
                        <div className="w-24 h-1 bg-white/50 rounded-full mt-8 mb-4"></div>

                        {/* Year badge */}
                        <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest">
                            2026
                        </div>
                    </div>

                    {/* Screen shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Phone shadow */}
                <div className="absolute inset-0 -z-10 blur-3xl opacity-50" style={{ background: styles.background }}></div>
            </motion.div>
        );
    }
);

PhoneMockup.displayName = 'PhoneMockup';

export default PhoneMockup;
