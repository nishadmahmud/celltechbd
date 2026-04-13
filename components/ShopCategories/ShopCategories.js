"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiBox, FiArrowRight } from 'react-icons/fi';

export default function ShopCategories({ categories = [] }) {
    const displayCategories = (Array.isArray(categories) ? categories : []);

    return (
        <section className="bg-white py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <h2 className="text-xl md:text-[28px] font-extrabold tracking-tight">
                        <span className="text-gray-800">Shop By </span>
                        <span className="text-brand-primary">Popular Categories</span>
                    </h2>
                    <Link
                        href="/category"
                        className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-brand-primary transition-colors group"
                    >
                        <span className="hidden sm:inline">See All</span>
                        <span className="w-8 h-8 rounded-full border-2 border-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                            <FiArrowRight className="w-4 h-4 text-brand-primary group-hover:text-white" />
                        </span>
                    </Link>
                </div>

                {/* Category Grid — 4 cols mobile, 8 cols desktop */}
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-5">
                    {displayCategories.length > 0 ? displayCategories.map((cat, idx) => (
                        <Link
                            href={`/category/${cat.slug || (typeof cat.name === 'string' ? encodeURIComponent(cat.name.toLowerCase().replace(/\s+/g, '-')) : 'all')}`}
                            key={cat.id || idx}
                            className="flex flex-col items-center gap-2 md:gap-3 group p-2 md:p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-card-bg flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-brand-primary transition-all duration-300">
                                {cat.image || cat.image_path || cat.image_url ? (
                                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14">
                                        <Image
                                            src={cat.image || cat.image_path || cat.image_url}
                                            alt={cat.name}
                                            fill
                                            unoptimized
                                            className="object-contain"
                                        />
                                    </div>
                                ) : (
                                    <FiBox className="w-5 h-5 md:w-7 md:h-7 text-gray-400" />
                                )}
                            </div>
                            <span className="text-[10px] sm:text-[11px] md:text-[13px] font-semibold text-gray-700 group-hover:text-brand-primary transition-colors text-center line-clamp-2 leading-tight">
                                {cat.name}
                            </span>
                        </Link>
                    )) : (
                        <div className="col-span-4 md:col-span-8 w-full text-center py-8 text-gray-500 text-sm">
                            No category data available right now.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
