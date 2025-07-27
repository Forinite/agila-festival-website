'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Pause, Play, Maximize } from 'lucide-react';
import clsx from 'clsx';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    className?: string;
}

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, className }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showCenterIcon, setShowCenterIcon] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Load video metadata
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleLoadedMetadata = () => {
                setDuration(video.duration);
            };
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            return () => {
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, []);

    // Toggle play/pause
    const togglePlay = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }

        setShowCenterIcon(true);
        setTimeout(() => setShowCenterIcon(false), 800);
    };

    // Update progress bar
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        setCurrentTime(current);
        setProgress((current / total) * 100);
    };

    // Handle manual seeking
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;
        const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
    };

    // Toggle fullscreen
    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);

        } else {
            container.requestFullscreen();
            setIsFullscreen(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className={clsx(
                'relative w-full bg-black rounded-lg overflow-hidden group',
                 `${isFullscreen? '' : className}`
            )}
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-auto"
                // 👇 DO NOT add onClick here — only container handles click
            />

            {/* Center play/pause icon */}
            {showCenterIcon && (
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-200 opacity-100">
                    <div className="text-white text-6xl bg-white/10 opacity-90 rounded-full p-4">
                        {isPlaying ? <Pause size={40} /> : <Play size={40} />}
                    </div>
                </div>
            )}

            {/* Bottom controls */}
            <div
                className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-4 pt-2 pb-3 text-sm"
                onClick={(e) => e.stopPropagation()} // 👈 Prevent togglePlay from firing
            >
                {/* Progress bar */}
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={progress}
                    onChange={handleSeek}
                    onClick={(e) => e.stopPropagation()} // 👈 Also prevent togglePlay
                    className="w-full h-1 accent-red-500 rounded-md"
                />

                <div className="flex items-center justify-between mt-2">
                    {/* Play/Pause button */}
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                        }}
                        className="cursor-pointer hover:scale-110 transition-transform"
                    >
                        {isPlaying ? (
                            <Pause size={18} className="text-white" />
                        ) : (
                            <Play size={18} className="text-white" />
                        )}
                    </div>

                    {/* Timestamp */}
                    <span className="text-xs text-gray-300">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

                    {/* Fullscreen button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFullscreen();
                        }}
                        className="hover:scale-110 transition-transform"
                    >
                        <Maximize size={18} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;


