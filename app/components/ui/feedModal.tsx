'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Feed } from '@/app/types/feed';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedModalProps {
    feed: Feed | null;
    onClose: () => void;
    onPrevious?: () => void; // Callback for previous feed
    onNext?: () => void; // Callback for next feed
}

const FeedModal = ({ feed, onClose, onPrevious, onNext }: FeedModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on ESC and manage focus
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = feed ? 'hidden' : 'auto';
        modalRef.current?.focus();
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [feed, onClose]);

    if (!feed) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="backdrop"
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <motion.div
                    key="modal"
                    className="relative bg-white rounded-2xl w-full max-w-md md:max-w-4xl max-h-[85vh] overflow-hidden shadow-xl flex flex-col md:flex-row"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    ref={modalRef}
                    tabIndex={-1}
                >
                    {/* Media Section */}
                    <div className="relative md:w-1/2 bg-gray-50 pl-4 py-4">
                        {feed.isVideo ? (
                            <div className="aspect-video w-full">
                                <video
                                    src={feed.media}
                                    className="w-full h-[400px] lg:h-[600px] object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                                    controls
                                    preload="metadata"
                                />
                            </div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                                className="w-full"
                            >
                                <Image
                                    src={feed.media}
                                    alt={feed.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-[400px] object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                                    loading="lazy"
                                />
                            </motion.div>
                        )}
                        {/* Navigation Buttons */}
                        {(onPrevious || onNext) && (
                            <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4 md:px-6 pointer-events-none">
                                <motion.button
                                    onClick={onPrevious}
                                    disabled={!onPrevious}
                                    className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-gray-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Previous feed"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </motion.button>
                                <motion.button
                                    onClick={onNext}
                                    disabled={!onNext}
                                    className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-gray-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Next feed"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </div>
                        )}
                    </div>
                    {/* Close Button (Floating) */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-gray-700 transition-all shadow-sm"
                        aria-label="Close modal"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </motion.button>
                    {/* Content Section */}
                    <div className="p-4 sm:p-6 md:w-1/2 flex flex-col overflow-y-auto bg-white">
                        <h2
                            id="modal-title"
                            className="text-xl sm:text-2xl font-medium text-gray-900 mb-2 truncate"
                        >
                            {feed.title}
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3 flex-1">
                            {feed.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {feed.category.map((category) => (
                                <motion.span
                                    key={`${feed.title}-${category}`}
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-150"
                                >
                                    {category}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FeedModal;