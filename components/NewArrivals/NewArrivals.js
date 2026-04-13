"use client";

import { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function NewArrivals({ products = [] }) {
    const [activeBrand, setActiveBrand] = useState('All');
    const sliderRef = useRef(null);

    const sourceProducts = Array.isArray(products) ? products : [];
    const brands = ['All', ...new Set(sourceProducts.map((p) => p.brand).filter(Boolean))];

    const filteredProducts = activeBrand === 'All'
        ? sourceProducts
        : sourceProducts.filter((p) => p.brand === activeBrand);

    const handleBrandChange = (brand) => {
        setActiveBrand(brand);
        if (sliderRef.current) {
            sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    };

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-white py-16 md:py-28 border-b border-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Latest <span className="text-brand-purple">Drops</span>
                    </h2>

                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={scrollLeft}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors bg-black text-white hover:bg-gray-800"
                        >
                            <FiChevronLeft size={20} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors bg-black text-white hover:bg-gray-800"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {sourceProducts.length > 0 && (
                    <div className="flex gap-3 mb-10 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                        {brands.map((brand, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleBrandChange(brand)}
                                className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-colors ${activeBrand === brand ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                )}

                <div className="overflow-hidden relative">
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto gap-3 md:gap-5 pb-4 snap-x snap-mandatory flex-nowrap"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                        {filteredProducts.length > 0 ? filteredProducts.map((product, idx) => (
                            <div key={product.id || idx} className="w-[calc(50%-6px)] md:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)] shrink-0 snap-start">
                                <ProductCard product={product} />
                            </div>
                        )) : (
                            <div className="w-full text-center py-10 text-gray-500 text-sm">No new arrival products available right now.</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
