'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { Download, RefreshCw, ArrowLeft } from 'lucide-react';

import PredictionChest from '@/components/PredictionChest';
import PhoneMockup from '@/components/PhoneMockup';
import { getRandomPrediction, PredictionData } from '@/lib/predictions';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [prediction, setPrediction] = useState<PredictionData>({ text: '', emoji: '✨' });
  const [mockupStyle, setMockupStyle] = useState<'modern' | 'classic' | 'gradient'>('modern');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.querySelector('main');
    if (!container) return;

    const bubbles = 15;
    const bubblesArray: HTMLDivElement[] = [];
    
    for (let i = 0; i < bubbles; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.width = `${Math.random() * 40 + 20}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.animationDuration = `${Math.random() * 10 + 15}s`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      const swayDuration = Math.random() * 3 + 4;
      bubble.style.setProperty('animation', `bubble-rise ${Math.random() * 10 + 15}s linear infinite, bubble-sway ${swayDuration}s ease-in-out infinite`);
      container.appendChild(bubble);
      bubblesArray.push(bubble);
    }

    const snowflakes = 25;
    const snowflakesArray: HTMLDivElement[] = [];
    const snowflakeSymbols = ['❄', '❅', '❆'];
    
    for (let i = 0; i < snowflakes; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.fontSize = `${Math.random() * 1 + 0.8}rem`;
      const duration = Math.random() * 10 + 10;
      snowflake.style.animationDuration = `${duration}s`;
      snowflake.style.animationDelay = `${Math.random() * 5}s`;
      snowflake.style.animationName = Math.random() > 0.5 ? 'snowfall' : 'snowfall-left';
      container.appendChild(snowflake);
      snowflakesArray.push(snowflake);
    }

    return () => {
      bubblesArray.forEach(b => b.remove());
      snowflakesArray.forEach(s => s.remove());
    };
  }, []);

  const handleOpen = useCallback(() => {
    const newPrediction = getRandomPrediction();
    setPrediction(newPrediction);
    setIsOpened(true);
    setMockupStyle('modern');

    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#F40009', '#FFFFFF', '#FFD700', '#FF6B6B'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#F40009', '#FFFFFF', '#FFD700', '#FF6B6B'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleReset = () => {
    setIsOpened(false);
    setPrediction({ text: '', emoji: '✨' });
  };

  const handleDownload = useCallback(async () => {
    if (cardRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'peredbachennya-2026.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image', err);
    }
  }, [cardRef]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-8 relative overflow-hidden">

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="main-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            {/* Title - Coca-Cola style */}
            <motion.div
              className="mb-16 md:mb-20 text-center z-10"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring' }}
            >
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 shine-effect"
                style={{ 
                  textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
                  fontFamily: 'Arial, sans-serif',
                  letterSpacing: '-0.02em'
                }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Скриня Передбачень
              </motion.h1>
              <motion.div 
                className="text-3xl md:text-5xl lg:text-6xl font-black text-white/95"
                style={{ 
                  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.4)',
                  fontFamily: 'Arial, sans-serif',
                  letterSpacing: '0.05em'
                }}
              >
                2026
              </motion.div>
              
              {/* Decorative wave under title */}
              <svg className="w-64 md:w-80 h-3 mx-auto mt-6" viewBox="0 0 200 10">
                <path 
                  d="M0 5 Q50 0 100 5 T200 5" 
                  stroke="#FFFFFF" 
                  strokeWidth="3" 
                  fill="none"
                  opacity="0.8"
                />
              </svg>
            </motion.div>

            {/* Chest Section */}
            <div style={{
              paddingTop: '20px',
            }} className="relative w-full max-w-4xl flex flex-col items-center justify-center z-10">
              <motion.div 
                className="mb-10 md:mb-12 text-center text-white text-xl md:text-2xl font-bold px-8 py-8 bg-white/10 rounded-full backdrop-blur-sm border-2 border-white/30 shadow-lg max-w-2xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                ✨ Торкнися скрині, щоб дізнатися свою долю ✨
              </motion.div>
              <PredictionChest isOpen={isOpened} onOpen={handleOpen} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result-view"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="w-full flex flex-col items-center justify-center min-h-screen py-8 md:py-12 px-4"
          >
            {/* Phone Mockup with Prediction */}
           <div style={{
            padding: '60px'
           }}>
             <div className="mb-6 md:mb-8">
              <PhoneMockup 
                ref={cardRef} 
                prediction={prediction.text} 
                emoji={prediction.emoji}
                mockupStyle={mockupStyle}
              />
            </div>
           </div>

            {/* Mockup Style Selector */}
            <motion.div
              className="flex flex-wrap gap-5 md:gap-3 justify-center mb-4 md:mb-5 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button
                onClick={() => setMockupStyle('modern')}
                className={`px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm transition-colors ${
                  mockupStyle === 'modern'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-purple-600 hover:bg-purple-50'
                }`}
              >
                Сучасний
              </button>
              <button
                onClick={() => setMockupStyle('classic')}
                className={`px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm transition-colors ${
                  mockupStyle === 'classic'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-red-600 hover:bg-red-50'
                }`}
              >
                Класичний
              </button>
              <button
                onClick={() => setMockupStyle('gradient')}
                className={`px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm transition-colors ${
                  mockupStyle === 'gradient'
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-pink-600 hover:bg-pink-50'
                }`}
              >
                Градієнт
              </button>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-2 md:gap-3 justify-center pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-white text-gray-700 font-semibold text-xs md:text-sm rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Назад
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-green-600 text-white font-semibold text-xs md:text-sm rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Зберегти
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-red-600 text-white font-semibold text-xs md:text-sm rounded-lg hover:bg-red-700 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Ще раз
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Decorative stars */}
      <div className="fixed top-10 left-10 text-white/20 text-4xl z-0 sparkle">✨</div>
      <div className="fixed top-20 right-20 text-white/20 text-3xl z-0 sparkle" style={{ animationDelay: '0.5s' }}>⭐</div>
      <div className="fixed bottom-32 left-20 text-white/20 text-3xl z-0 sparkle" style={{ animationDelay: '1s' }}>✨</div>
      <div className="fixed bottom-40 right-32 text-white/20 text-4xl z-0 sparkle" style={{ animationDelay: '1.5s' }}>⭐</div>
    </main>
  );
}
