"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiBox, FiChevronLeft, FiChevronRight, FiZap } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function ShopCategories({ categories = [], flashSaleProducts = [] }) {
    // Countdown timer starts at 23 Days 4h 4m 59s
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

    const displayCategories = (Array.isArray(categories) ? categories : []).map((cat) => ({ ...cat, icon: <FiBox /> }));
    const displayFlashSale = Array.isArray(flashSaleProducts) ? flashSaleProducts : [];

    return (
        <section className="bg-white py-12 md:py-20 border-b border-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center mb-12 md:mb-16">
                    <div className="flex items-center w-full max-w-4xl mb-3">
                        <div className="flex-1 h-[1px] bg-gray-200"></div>
                        <h2 className="px-4 md:px-8 text-xl md:text-2xl font-black text-gray-900 tracking-widest uppercase text-center whitespace-nowrap">
                            Featured Categories
                        </h2>
                        <div className="flex-1 h-[1px] bg-gray-200"></div>
                    </div>
                    <p className="text-gray-500 text-sm md:text-base font-medium">
                        Get your desired product from featured category
                    </p>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-8 border-t border-l border-gray-100 mb-16 md:mb-24">
                    {displayCategories.length > 0 ? displayCategories.map((cat, idx) => (
                        <Link
                            href={`/category/${cat.slug || (typeof cat.name === 'string' ? encodeURIComponent(cat.name.toLowerCase().replace(/\s+/g, '-')) : 'all')}`}
                            key={cat.id || idx}
                            className="flex flex-col items-center justify-center gap-2 md:gap-4 py-4 md:py-12 px-2 md:px-4 text-center group border-r border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="relative w-12 h-12 sm:w-20 md:w-32 md:h-32 transition-transform duration-500 group-hover:scale-110">
                                {cat.image || cat.image_path || cat.image_url ? (
                                    <Image
                                        src={cat.image || cat.image_path || cat.image_url}
                                        alt={cat.name}
                                        fill
                                        unoptimized
                                        className="object-contain mix-blend-multiply"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl md:text-4xl text-gray-300">
                                        {cat.icon}
                                    </div>
                                )}
                            </div>
                            <span className="text-[9px] sm:text-[13px] md:text-[14px] font-bold text-gray-800 uppercase tracking-tighter sm:tracking-tight group-hover:text-brand-purple transition-colors line-clamp-1">
                                {cat.name}
                            </span>
                        </Link>
                    )) : (
                        <div className="col-span-4 md:col-span-3 lg:col-span-8 text-center py-10 text-gray-500 border-r border-b border-gray-100">
                            No category data available right now.
                        </div>
                    )}
                </div>

                <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-[28px] p-6 md:p-10 relative shadow-sm overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-4 relative z-10">
                        <div className="flex items-center gap-2 md:gap-3">
                            <h3 className="flex items-center gap-2 text-2xl md:text-3xl lg:text-[40px] font-black text-gray-900 tracking-tight leading-[1.15]">
                                <FiZap className="text-brand-purple fill-brand-purple" /> Flash Sale
                            </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-500 tracking-widest uppercase">
                                Ends In:
                            </div>
                            <div className="flex gap-2 text-center pb-3 md:pb-0">
                                <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white border border-brand-purple/20 text-brand-purple font-black text-lg md:text-xl rounded-xl shadow-sm">
                                    {days}
                                    <span className="text-[9px] absolute -bottom-4 text-gray-500 font-semibold uppercase">Days</span>
                                </div>
                                <span className="text-brand-purple font-bold self-center pt-2">:</span>
                                <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white border border-brand-purple/20 text-brand-purple font-black text-lg md:text-xl rounded-xl shadow-sm">
                                    {hours}
                                    <span className="text-[9px] absolute -bottom-4 text-gray-500 font-semibold uppercase">Hrs</span>
                                </div>
                                <span className="text-brand-purple font-bold self-center pt-2">:</span>
                                <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white border border-brand-purple/20 text-brand-purple font-black text-lg md:text-xl rounded-xl shadow-sm">
                                    {minutes}
                                    <span className="text-[9px] absolute -bottom-4 text-gray-500 font-semibold uppercase">Min</span>
                                </div>
                                <span className="text-brand-purple font-bold self-center pt-2">:</span>
                                <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white border border-brand-purple/20 text-brand-purple font-black text-lg md:text-xl rounded-xl shadow-sm">
                                    {seconds}
                                    <span className="text-[9px] absolute -bottom-4 text-gray-500 font-semibold uppercase">Sec</span>
                                </div>
                            </div>
                            <button className="bg-brand-purple text-white hover:bg-purple-800 font-bold text-xs py-2 md:py-3 px-4 md:px-6 rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap hidden md:flex items-center ml-0 md:ml-4">
                                Shop All Deals
                            </button>
                        </div>
                    </div>

                    <div className="relative z-10 w-full">
                        <button className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow hover:shadow-md hover:text-brand-purple border border-gray-100 rounded-full flex items-center justify-center z-10 transition-colors text-gray-800 hidden md:flex">
                            <FiChevronLeft size={20} />
                        </button>

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 overflow-hidden w-full">
                            {displayFlashSale.length > 0 ? displayFlashSale.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            )) : (
                                <div className="col-span-2 lg:col-span-5 py-8 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                                    No flash sale products available right now.
                                </div>
                            )}
                        </div>

                        <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow hover:shadow-md hover:text-brand-purple border border-gray-100 rounded-full flex items-center justify-center z-10 transition-colors text-gray-800 hidden md:flex">
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
