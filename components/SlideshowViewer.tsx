'use client';

import { useState } from 'react';
import { Media } from '@/types/project';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideshowViewerProps {
  media: Media[];
}

const SlideshowViewer = ({ media }: SlideshowViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const next = () => setCurrentIndex((prev) => (prev + 1) % media.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);

  const currentMedia = media[currentIndex];

  if (!media || media.length === 0) return null;

  return (
    <div className="relative group">
      <div className="relative aspect-video sm:aspect-[16/9] bg-black rounded-3xl overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center"
          >
            {currentMedia.type === 'image' ? (
              <Image
                src={currentMedia.url}
                alt={`Slide ${currentIndex}`}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <video
                src={currentMedia.url}
                controls
                autoPlay
                muted
                className="w-full h-full object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
        >
          <ChevronRight size={24} />
        </button>

        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-md text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
        >
          <Maximize2 size={20} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {media.map((m, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`relative w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0 transition-all ${
              currentIndex === i ? 'ring-2 ring-red-600 scale-105' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {m.type === 'image' ? (
              <Image src={m.url} alt="" fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <ChevronRight size={16} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-8 right-8 text-white hover:text-gray-400"
            >
              <X size={32} />
            </button>
            
            <div className="w-full h-full p-4 md:p-12 flex items-center justify-center">
               {currentMedia.type === 'image' ? (
                <div className="relative w-full h-full">
                   <Image src={currentMedia.url} alt="" fill className="object-contain" />
                </div>
              ) : (
                <video src={currentMedia.url} controls autoPlay className="max-w-full max-h-full" />
              )}
            </div>

            <button onClick={prev} className="absolute left-8 text-white p-4"><ChevronLeft size={48} /></button>
            <button onClick={next} className="absolute right-8 text-white p-4"><ChevronRight size={48} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlideshowViewer;
