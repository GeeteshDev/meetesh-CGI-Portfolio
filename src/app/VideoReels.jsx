"use client";

import React, { useEffect, useRef } from "react";

const videos = [
    "https://player.vimeo.com/video/1060097601?h=90479e3c78&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    "https://player.vimeo.com/video/1060097650?h=2fee2ce23d&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    "https://player.vimeo.com/video/1060097542?h=da0fa6ad1b&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    "https://player.vimeo.com/video/1060097486?h=fecac48434&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    "https://player.vimeo.com/video/1060097447?h=b7235bc732&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    "https://player.vimeo.com/video/1060097388?h=9d12924348&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
];

const VideoReels = () => {
    const videoRefs = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            videoRefs.current.forEach((iframe, index) => {
                if (iframe) {
                    const rect = iframe.parentElement.getBoundingClientRect();
                    const isVisible = rect.top >= 0 && rect.bottom <= viewportHeight;
                    if (isVisible) {
                        iframe.src = `${videos[index]}&autoplay=1`;
                    } else {
                        iframe.src = `${videos[index]}&autoplay=0`; 
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-screen h-screen overflow-y-auto bg-black snap-y snap-mandatory">

            {videos.map((videoSrc, index) => (
                <div 
                    key={index} 
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="relative w-full h-screen flex justify-center items-center snap-start"
                >
                    {/* Aspect Ratio Wrapper */}
                    <div className="relative w-full h-full">
                        <iframe
                            src={`${videoSrc}&autoplay=0`} 
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                            className="absolute top-0 left-0 w-full h-full"
                            title={`video-${index}`}
                        ></iframe>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoReels;
