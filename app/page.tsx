'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { Download, Share2, RefreshCw } from 'lucide-react';

import PredictionChest from '@/components/PredictionChest';
import ResultCard from '@/components/ResultCard';
import { getRandomPrediction } from '@/lib/predictions';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [prediction, setPrediction] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(() => {
    // 1. Set Random Prediction
    const newPrediction = getRandomPrediction();
    setPrediction(newPrediction);

    // 2. Trigger Chest Open State
    setIsOpened(true);

    // 3. Launch Fireworks
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFA500', '#FF4500', '#800080'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FFA500', '#FF4500', '#800080'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleReset = () => {
    setIsOpened(false);
    setPrediction('');
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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 mb-8 text-center drop-shadow-lg z-10 font-cormorant"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Скриня Передбачень 2026
      </motion.h1>

      <div className="relative w-full max-w-4xl min-h-[500px] flex flex-col items-center justify-center z-10">

        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="chest"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.5 } }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 text-center text-yellow-200/80 animate-pulse font-cormorant text-xl">
                Торкнися скрині, щоб дізнатися свою долю
              </div>
              <PredictionChest isOpen={isOpened} onOpen={handleOpen} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              <ResultCard ref={cardRef} prediction={prediction} />

              <motion.div
                className="flex gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full shadow-lg transition-transform active:scale-95 font-cormorant text-lg"
                >
                  <Download className="w-5 h-5" />
                  Зберегти
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full backdrop-blur-md transition-colors border border-white/20 font-cormorant text-lg"
                >
                  <RefreshCw className="w-5 h-5" />
                  Ще раз
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer / Copyright */}
      <div className="fixed bottom-4 text-xs text-white/20 z-0">
        © 2026 Universe Predictions Ltd. | Зроблено з любов'ю
      </div>
    </main>
  );
}
