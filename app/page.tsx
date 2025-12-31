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
            <div className="relative w-full max-w-4xl flex flex-col items-center justify-center z-10">
              <motion.div 
                className="mb-10 md:mb-12 text-center text-white text-xl md:text-2xl font-bold px-8 py-4 bg-white/10 rounded-full backdrop-blur-sm border-2 border-white/30 shadow-lg max-w-2xl"
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
            className="w-full flex flex-col items-center min-h-screen justify-center py-8"
          >
            {/* Back Button */}
            <motion.button
              onClick={handleReset}
              className="fixed top-6 left-6 z-50 flex items-center gap-2 px-6 py-3 bg-white/90 hover:bg-white text-red-600 font-bold rounded-full shadow-xl transition-all active:scale-95 hover:shadow-2xl border-2 border-red-600/20 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              style={{ 
                fontFamily: 'Arial, sans-serif',
                fontSize: '1rem',
                letterSpacing: '0.03em'
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              НАЗАД
            </motion.button>

            {/* Phone Mockup with Prediction */}
            <div className="flex-1 flex items-center justify-center w-full px-4">
              <PhoneMockup 
                ref={cardRef} 
                prediction={prediction.text} 
                emoji={prediction.emoji}
                mockupStyle={mockupStyle}
              />
            </div>

            {/* Mockup Style Selector */}
            <motion.div
              className="flex gap-4 mb-6 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <button
                onClick={() => setMockupStyle('modern')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  mockupStyle === 'modern'
                    ? 'bg-purple-600 text-white scale-110 shadow-xl'
                    : 'bg-white/80 text-purple-600 hover:bg-white'
                }`}
              >
                Сучасний
              </button>
              <button
                onClick={() => setMockupStyle('classic')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  mockupStyle === 'classic'
                    ? 'bg-red-600 text-white scale-110 shadow-xl'
                    : 'bg-white/80 text-red-600 hover:bg-white'
                }`}
              >
                Класичний
              </button>
              <button
                onClick={() => setMockupStyle('gradient')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  mockupStyle === 'gradient'
                    ? 'bg-pink-600 text-white scale-110 shadow-xl'
                    : 'bg-white/80 text-pink-600 hover:bg-white'
                }`}
              >
                Градієнт
              </button>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8 mb-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-3 px-10 py-4 bg-white hover:bg-gray-100 text-red-600 font-black rounded-full shadow-xl transition-all active:scale-95 hover:shadow-2xl border-2 border-white"
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '1.125rem',
                  letterSpacing: '0.05em',
                  minWidth: '200px'
                }}
              >
                <Download className="w-5 h-5" />
                ЗБЕРЕГТИ
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-3 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-full shadow-xl transition-all active:scale-95 hover:shadow-2xl border-2 border-white/20"
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '1.125rem',
                  letterSpacing: '0.05em',
                  minWidth: '200px'
                }}
              >
                <RefreshCw className="w-5 h-5" />
                ЩЕ РАЗ
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - Coca-Cola style */}
      <motion.div 
        className="fixed bottom-6 text-sm md:text-base text-white/80 z-10 font-bold tracking-wide text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        🎉 Новий Рік 2026 | Зроблено з любов'ю ❤️
      </motion.div>

      {/* Decorative stars */}
      <div className="fixed top-10 left-10 text-white/20 text-4xl z-0 sparkle">✨</div>
      <div className="fixed top-20 right-20 text-white/20 text-3xl z-0 sparkle" style={{ animationDelay: '0.5s' }}>⭐</div>
      <div className="fixed bottom-32 left-20 text-white/20 text-3xl z-0 sparkle" style={{ animationDelay: '1s' }}>✨</div>
      <div className="fixed bottom-40 right-32 text-white/20 text-4xl z-0 sparkle" style={{ animationDelay: '1.5s' }}>⭐</div>
    </main>
  );
}
