"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero({ slides = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const displaySlides = Array.isArray(slides) ? slides : [];

    useEffect(() => {
        if (displaySlides.length <= 1) return undefined;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [displaySlides.length]);

    return (
        <section className="w-full bg-white pt-4 md:pt-6 pb-6 md:pb-8 px-4 md:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Main Slider — Full Width, Taller, Cool Design */}
                <div className="w-full relative overflow-hidden rounded-xl h-[220px] sm:h-[340px] md:h-[480px] bg-gray-50 group border border-gray-100 shadow-sm">
                    {displaySlides.length > 0 ? displaySlides.map((slide, idx) => (
                        <div
                            key={slide.id || idx}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <Link href={slide.buttonLink || "/category"} className="w-full h-full block">
                                <Image
                                    src={slide.image || slide.image_path || "/no-image.svg"}
                                    alt={slide.title || "Slider Image"}
                                    fill
                                    unoptimized
                                    className="object-cover object-center z-0"
                                    priority={idx === 0}
                                />
                            </Link>
                        </div>
                    )) : (
                        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                            <p className="text-gray-500 font-medium">No slider content available right now.</p>
                        </div>
                    )}

                    {/* Slider Dots */}
                    {displaySlides.length > 1 && (
                        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                            {displaySlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`rounded-full transition-all duration-500 ${currentSlide === idx ? 'bg-brand-primary w-6 md:w-8 h-2 md:h-2.5' : 'bg-white/60 hover:bg-white w-2 md:w-2.5 h-2 md:h-2.5'}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
