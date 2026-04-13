"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductCard from '../Shared/ProductCard';
import { FiZap } from 'react-icons/fi';

export default function FlashSale({ products = [] }) {
    const [timeLeft, setTimeLeft] = useState(23 * 86400 + 4 * 3600 + 4 * 60 + 59);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 0 ? 30 * 86400 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const days = String(Math.floor(timeLeft / 86400)).padStart(2, '0');
    const hours = String(Math.floor((timeLeft % 86400) / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    const displayProducts = Array.isArray(products) ? products : [];

    return (
        <section className="bg-white py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-10">
                    <div className="flex items-center gap-3">
                        <FiZap className="text-brand-primary w-5 h-5 md:w-6 md:h-6" />
                        <h2 className="text-xl md:text-[28px] font-extrabold tracking-tight">
                            <span className="text-gray-800">Limited Time </span>
                            <span className="text-brand-primary">Flash Sale</span>
                        </h2>
                    </div>

                    {/* Countdown Timer */}
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <TimerBlock value={days} label="Days" />
                        <span className="text-brand-primary font-bold text-lg">:</span>
                        <TimerBlock value={hours} label="Hrs" />
                        <span className="text-brand-primary font-bold text-lg">:</span>
                        <TimerBlock value={minutes} label="Min" />
                        <span className="text-brand-primary font-bold text-lg">:</span>
                        <TimerBlock value={seconds} label="Sec" />
                    </div>
                </div>

                {/* Content: Banner Left + Products Right */}
                <div className="flex flex-col lg:flex-row gap-5 md:gap-6">

                    {/* Left: Flash Sale Banner */}
                    <div className="w-full lg:w-[35%] flex-shrink-0">
                        <div className="relative w-full h-[120px] sm:h-[180px] lg:h-full min-h-[150px] md:min-h-[400px] rounded-2xl overflow-hidden bg-brand-primary/5 border border-brand-primary/10 transition-all duration-300">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-6 z-10">
                                <FiZap className="text-brand-primary w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4" />
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1 md:mb-2">Flash Sale</h3>
                                <p className="text-gray-500 text-[10px] md:text-sm lg:text-base mb-3 md:mb-4 hidden sm:block">Grab the best deals before they're gone!</p>
                                <div className="bg-brand-primary text-white font-bold text-[10px] md:text-sm px-4 py-1.5 md:px-6 md:py-2.5 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    Shop Now
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
                            {displayProducts.length > 0 ? displayProducts.slice(0, 6).map((product) => (
                                <ProductCard key={product.id} product={product} variant="compact" />
                            )) : (
                                <div className="col-span-full py-10 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    No flash sale products available right now.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimerBlock({ value, label }) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary text-white font-black text-base md:text-lg rounded-lg flex items-center justify-center">
                {value}
            </div>
            <span className="text-[9px] md:text-[10px] text-gray-400 font-semibold uppercase mt-1">{label}</span>
        </div>
    );
}
