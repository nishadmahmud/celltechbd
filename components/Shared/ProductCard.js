"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FiStar, FiChevronRight } from 'react-icons/fi';

export default function ProductCard({ product }) {
    const nameSlug = product.name
        ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        : 'product';
    const slug = product.id ? `${nameSlug}-${product.id}` : nameSlug;

    const formatPrice = (priceStr) => {
        if (!priceStr) return '';
        return priceStr.replace('Tk', 'Tk.').replace('৳', '৳');
    };

    const productBrand = String(
        product.brand || product.brand_name || product.brands?.name || ''
    ).trim();

    return (
        <Link
            href={`/product/${slug}`}
            className="bg-white rounded-2xl flex flex-col text-left hover:-translate-y-1 transition-all duration-400 group overflow-hidden relative block border border-gray-200 hover:border-brand-primary/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        >
            {/* Image Area */}
            <div className="w-full aspect-square relative flex items-center justify-center bg-card-bg rounded-t-2xl overflow-hidden p-3">
                {/* Category/Brand tag */}
                {productBrand && (
                    <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-md">
                        {productBrand}
                    </span>
                )}

                {/* Discount badge */}
                {product.discount && (
                    <span className="absolute top-3 right-3 z-10 text-[10px] font-bold text-white bg-brand-red px-2 py-0.5 rounded-md">
                        {product.discount}
                    </span>
                )}

                {(product.isNew || product.badge === 'New Arrival') && !product.discount && (
                    <span className="absolute top-3 right-3 z-10 text-[10px] font-bold text-white bg-brand-primary px-2 py-0.5 rounded-md">
                        New
                    </span>
                )}

                <Image
                    src={product.imageUrl || '/no-image.svg'}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 p-3 md:p-4">
                <h3 className="text-gray-900 font-bold text-[13px] md:text-[15px] leading-snug line-clamp-2 mb-2 group-hover:text-brand-primary transition-colors">
                    {product.name}
                </h3>

                {/* Price Row */}
                <div className="flex items-baseline gap-2 mb-3 mt-auto">
                    <span className="text-gray-900 font-extrabold text-[15px] md:text-[17px]">
                        {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                        <span className="text-gray-400 text-[11px] md:text-[12px] font-medium line-through">
                            {formatPrice(product.oldPrice)}
                        </span>
                    )}
                </div>

                {/* Action Row */}
                <div className="flex items-center gap-2 mt-auto">
                    <div className="flex-1 h-[36px] md:h-[40px] rounded-full border-2 border-brand-primary flex items-center justify-center gap-1.5 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                        <span className="text-brand-primary group-hover:text-white font-bold text-[12px] md:text-[13px]">Add To Cart</span>
                        <FiChevronRight className="text-brand-primary group-hover:text-white w-3.5 h-3.5" />
                    </div>
                    <button
                        className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full border-2 border-orange-300 flex items-center justify-center text-orange-400 hover:bg-orange-50 transition-colors flex-shrink-0"
                        onClick={(e) => e.preventDefault()}
                        aria-label="Add to wishlist"
                    >
                        <FiStar className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </Link>
    );
}
