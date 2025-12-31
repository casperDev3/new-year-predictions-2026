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
                transition={{ duration: 0.8, delay: 0.3, type: 'spring', bounce: 0.3 }}
                className="relative mx-auto"
                style={{ height: '60vh', maxHeight: '800px', minHeight: '500px' }}
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-12">
                        {/* Floating decorative elements */}
                        <motion.div
                            className="absolute top-20 left-8 text-3xl opacity-30"
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            ✨
                        </motion.div>
                        <motion.div
                            className="absolute top-32 right-10 text-2xl opacity-30"
                            animate={{
                                y: [0, 10, 0],
                                rotate: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0.5,
                            }}
                        >
                            ⭐
                        </motion.div>
                        <motion.div
                            className="absolute bottom-40 left-6 text-2xl opacity-30"
                            animate={{
                                y: [0, -8, 0],
                                x: [0, 5, 0],
                            }}
                            transition={{
                                duration: 2.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1,
                            }}
                        >
                            💫
                        </motion.div>
                        <motion.div
                            className="absolute bottom-32 right-8 text-2xl opacity-30"
                            animate={{
                                y: [0, 8, 0],
                                rotate: [0, 15, 0],
                            }}
                            transition={{
                                duration: 3.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1.5,
                            }}
                        >
                            🌟
                        </motion.div>

                        {/* Decorative circles */}
                        <div className="absolute top-24 right-6 w-16 h-16 rounded-full border-2 border-white/20"></div>
                        <div className="absolute bottom-28 left-8 w-12 h-12 rounded-full border-2 border-white/20"></div>
                        <div className="absolute top-1/2 left-4 w-8 h-8 rounded-full bg-white/10"></div>
                        <div className="absolute top-1/3 right-5 w-10 h-10 rounded-full bg-white/10"></div>

                        {/* Emoji with glow effect */}
                        <motion.div
                            className="relative text-7xl mb-4 z-10"
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
                            <div className="absolute inset-0 blur-2xl opacity-50" style={{ fontSize: '8rem' }}>
                                {emoji}
                            </div>
                            <div className="relative">{emoji}</div>
                        </motion.div>

                        {/* Title with decorative elements */}
                        <div className="relative mb-4">
                            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-white/30">✦</div>
                            <h2 className="text-xl font-bold text-white text-center tracking-wide uppercase">
                                Передбачення 2026
                            </h2>
                            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-white/30">✦</div>
                        </div>

                        {/* Decorative wave line */}
                        <svg className="w-28 h-3 mb-5" viewBox="0 0 100 10">
                            <path
                                d="M0 5 Q25 0 50 5 T100 5"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                                opacity="0.5"
                            />
                        </svg>

                        {/* Prediction Text with background */}
                        <div className="w-full flex items-center justify-center px-2 py-8 relative">
                            <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-sm mx-2"></div>
                            <p className="text-lg font-serif text-white text-center leading-relaxed font-semibold italic relative z-10 px-6">
                                &ldquo;{prediction}&rdquo;
                            </p>
                        </div>

                        {/* Bottom decorative wave */}
                        <svg className="w-28 h-3 mt-5" viewBox="0 0 100 10">
                            <path
                                d="M0 5 Q25 10 50 5 T100 5"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                                opacity="0.5"
                            />
                        </svg>

                        {/* Corner decorations */}
                        <div className="absolute top-16 left-4 w-3 h-3 border-l-2 border-t-2 border-white/30"></div>
                        <div className="absolute top-16 right-4 w-3 h-3 border-r-2 border-t-2 border-white/30"></div>
                        <div className="absolute bottom-16 left-4 w-3 h-3 border-l-2 border-b-2 border-white/30"></div>
                        <div className="absolute bottom-16 right-4 w-3 h-3 border-r-2 border-b-2 border-white/30"></div>
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
