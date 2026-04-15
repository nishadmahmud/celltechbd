"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FiStar, FiChevronRight } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product, variant = 'default' }) {
    const isCompact = variant === 'compact';
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);
    
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
            className="bg-white rounded-2xl flex flex-col text-left hover:-translate-y-1 transition-all duration-400 group overflow-hidden relative block h-full w-full border border-gray-200 hover:border-brand-primary/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        >
            {/* Image Area */}
            <div className={`w-full ${isCompact ? 'aspect-[16/11] md:aspect-[16/10]' : 'aspect-square'} relative flex items-center justify-center bg-card-bg rounded-t-2xl overflow-hidden`}>
                {/* Category/Brand tag */}
                {productBrand && (
                    <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-md">
                        {productBrand}
                    </span>
                )}

                {/* Discount badge */}
                {product.discount && (
                    <span className="absolute top-3 right-3 z-10 text-[11px] md:text-[13px] font-extrabold text-white bg-brand-red px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg shadow-sm">
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
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 p-3 md:p-4">
                <h3 className={`text-gray-900 font-bold ${isCompact ? 'text-[12px] md:text-[14px]' : 'text-[13px] md:text-[15px]'} leading-snug line-clamp-2 mb-1.5 md:mb-2 group-hover:text-brand-primary transition-colors`}>
                    {product.name}
                </h3>

                {/* Price Row */}
                <div className={`flex items-baseline gap-2 ${isCompact ? 'mb-2 md:mb-3' : 'mb-3'} mt-auto`}>
                    <span className={`text-gray-900 font-extrabold ${isCompact ? 'text-[14px] md:text-[16px]' : 'text-[15px] md:text-[17px]'}`}>
                        {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                        <span className="text-gray-400 text-[11px] md:text-[12px] font-medium line-through">
                            {formatPrice(product.oldPrice)}
                        </span>
                    )}
                </div>

                {/* Action Row */}
                <div className="flex items-center gap-2">
                    <div className={`${isCompact ? 'h-[36px]' : 'h-[36px] md:h-[40px]'} flex-1 rounded-full border-2 border-brand-primary flex items-center justify-center gap-1 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 px-1`}>
                        <span className={`text-brand-primary group-hover:text-white font-bold ${isCompact ? 'text-[10px] sm:text-[11px] md:text-[12px]' : 'text-[11px] sm:text-[12px] md:text-[13px]'} whitespace-nowrap tracking-tight`}>Add To Cart</span>
                        <FiChevronRight className="text-brand-primary group-hover:text-white w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                    </div>
                    <button
                        className={`${isCompact ? 'w-[32px] h-[32px] md:w-[36px] md:h-[36px]' : 'w-[36px] h-[36px] md:w-[40px] md:h-[40px]'} rounded-full border-2 ${isWishlisted ? 'border-orange-400 bg-orange-400 text-white' : 'border-orange-300 text-orange-400 hover:bg-orange-50'} flex items-center justify-center transition-all duration-300 flex-shrink-0`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                        }}
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <FiStar className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>
        </Link>
    );
}
