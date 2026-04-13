"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { FiTruck, FiRotateCcw, FiHeadphones, FiThumbsUp, FiCheckCircle } from 'react-icons/fi';

export default function Hero({ slides = [], banners = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const statsItems = [
        { icon: <FiTruck />, title: "Free Shipping", desc: "Free Shipping On All Order Above ৳1000" },
        { icon: <FiRotateCcw />, title: "Money Guarantee", desc: "30 Day Money Back Guarantee" },
        { icon: <FiHeadphones />, title: "Online Support 24/7", desc: "Technical Support 24/7" },
        { icon: <FiThumbsUp />, title: "Member Discount", desc: "Up to 40% Discount All Products" },
        { icon: <FiCheckCircle />, title: "Secure Payment", desc: "100% Safe & Secure Checkout" }
    ];

    const displaySlides = Array.isArray(slides) ? slides : [];
    const displayBanners = Array.isArray(banners) ? banners.slice(0, 4) : [];

    useEffect(() => {
        if (displaySlides.length <= 1) return undefined;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [displaySlides.length]);

    return (
        <section className="w-full bg-white pt-4 md:pt-6 pb-8 md:pb-12 px-4 md:px-6 border-b border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">

                {/* Top: Main Slider - Now Full Width with Optimized Mobile Height */}
                <div className="w-full relative overflow-hidden rounded-[24px] h-[200px] sm:h-[350px] md:h-[500px] bg-gray-50 group border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] focus-within:ring-2 focus-within:ring-brand-blue/20">
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
                                    className="object-cover object-center z-0 transition-transform duration-[10000ms] ease-linear group-hover:scale-105"
                                    priority={idx === 0}
                                />
                            </Link>
                        </div>
                    )) : (
                        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                            <p className="text-gray-500 font-medium">No slider content available right now.</p>
                        </div>
                    )}

                    {/* Slider Navigation Dots */}
                    {displaySlides.length > 1 && (
                        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                            {displaySlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-1 md:h-2 rounded-full transition-all duration-500 ${currentSlide === idx ? 'bg-brand-blue w-6 md:w-12 shadow-sm' : 'bg-white/60 hover:bg-white w-1.5 md:w-3'}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats Cards Marquee */}
                <div className="w-full overflow-hidden py-1 md:py-2">
                    <div className="animate-marquee flex items-center whitespace-nowrap gap-4 md:gap-6">
                        {[1, 2].map((group) => (
                            <div key={group} className="flex items-center gap-4 md:gap-6">
                                {statsItems.map((stat, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 md:gap-4 bg-white border border-gray-100 rounded-[14px] md:rounded-[18px] p-3 md:p-6 min-w-[200px] sm:min-w-[260px] md:min-w-[320px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300"
                                    >
                                        <div className="text-xl md:text-3xl text-brand-blue/80 bg-brand-blue/5 p-2 md:p-3 rounded-lg md:xl">
                                            {stat.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] md:text-[16px] font-black text-gray-900 leading-tight">{stat.title}</span>
                                            <span className="text-[10px] md:text-[13px] text-gray-500 font-medium">{stat.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom: Banners - Responsive Grid / Horizontal Scroll on Mobile */}
                <div className="w-full flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-visible no-scrollbar gap-4 md:gap-6 pb-2 md:pb-0 px-1 md:px-0 scroll-smooth snap-x snap-mandatory">
                    {displayBanners.length > 0 ? displayBanners.map((banner, idx) => (
                        <Link
                            href={banner.link || banner.link_url || "/"}
                            key={banner.id || idx}
                            className="relative flex-none w-[50vw] sm:w-[35vw] md:w-full overflow-hidden rounded-[20px] bg-gray-50 group block h-[120px] sm:h-[160px] md:h-[180px] border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 ease-out snap-center"
                        >
                            <Image
                                src={banner.image || banner.image_path || banner.image_url || "/no-image.svg"}
                                alt={banner.title || `Banner ${idx + 1}`}
                                fill
                                unoptimized
                                className="object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Link>
                    )) : (
                        <div className="w-full py-8 text-center text-gray-500 border border-dashed border-gray-200 rounded-[20px]">
                            No banner content available right now.
                        </div>
                    )}
                </div>

            </div>
        </section>
    );


}
