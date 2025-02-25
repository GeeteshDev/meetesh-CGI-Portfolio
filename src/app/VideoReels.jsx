"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play } from "lucide-react";

const videos = [
    "/videos/video-1.mp4",
    "/videos/video-2.mp4",
    "/videos/video-3.mp4",
    "/videos/video-4.mp4",
    "/videos/video-5.mp4",
    "/videos/video-6.mp4",
];

const VideoReels = () => {
    const videoRefs = useRef([]);
    const [playingIndex, setPlayingIndex] = useState(null);
    const [showPlayButton, setShowPlayButton] = useState(Array(videos.length).fill(true));

    useEffect(() => {
        const handleScroll = () => {
            let foundIndex = null;
            videoRefs.current.forEach((video, index) => {
                if (video) {
                    const rect = video.getBoundingClientRect();
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight && foundIndex === null) {
                        foundIndex = index;
                    }
                }
            });
            if (foundIndex !== null) {
                setPlayingIndex(foundIndex);
                videoRefs.current.forEach((video, index) => {
                    if (index === foundIndex) {
                        video.play();
                        setShowPlayButton((prev) => prev.map((_, i) => i !== index));
                    } else {
                        video.pause();
                        setShowPlayButton((prev) => prev.map((_, i) => i === index));
                    }
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handlePlayClick = (index) => {
        const video = videoRefs.current[index];
        if (video.paused) {
            video.play();
            setPlayingIndex(index);
            setShowPlayButton((prev) => prev.map((_, i) => i !== index));
        }
    };

    const handleVideoClick = (index) => {
        const video = videoRefs.current[index];
        if (!video.paused) {
            video.pause();
            setShowPlayButton((prev) => prev.map((_, i) => i === index));
        }
    };

    return (
        <div className="flex flex-col items-center h-screen overflow-y-auto snap-y snap-mandatory bg-black">
            {videos.map((videoSrc, index) => (
                <div key={index} className="relative w-full h-screen flex justify-center items-center snap-center p-2">
                    <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={videoSrc}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                        loop
                        muted
                        onClick={() => handleVideoClick(index)}
                    />
                    {showPlayButton[index] && (
                        <button
                            className="absolute flex justify-center items-center bg-white bg-opacity-20 text-white p-6 rounded-full backdrop-blur-md hover:bg-opacity-40 transition"
                            onClick={() => handlePlayClick(index)}
                        >
                            <Play size={48} />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default VideoReels;
