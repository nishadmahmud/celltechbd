import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
    const nameSlug = product.name
        ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        : 'product';
    const slug = product.id ? `${nameSlug}-${product.id}` : nameSlug;

    const formatPrice = (priceStr) => {
        if (!priceStr) return '';
        return priceStr.replace('Tk', 'Tk.').replace('à§³', 'Tk.');
    };

    const productBrand = String(
        product.brand || product.brand_name || product.brands?.name || ''
    ).trim().toLowerCase();
    const showAppleIcon = productBrand === 'apple';

    return (
        <Link
            href={`/product/${slug}`}
            className="bg-white rounded-[24px] p-4 flex flex-col items-center text-center hover:-translate-y-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-500 group overflow-hidden relative block border border-gray-100 hover:border-brand-purple/20"
        >
            {(product.isNew || product.badge === 'New Arrival') && (
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none z-20">
                    <div className="absolute top-4 -right-8 w-32 bg-brand-red text-white text-[9px] font-black uppercase tracking-widest py-1 rotate-45 shadow-sm text-center">
                        New Arrival
                    </div>
                </div>
            )}

            <div className="w-full aspect-square relative flex items-center justify-center bg-[#fdfdfd] rounded-[20px] overflow-hidden mb-4 p-2">
                <Image
                    src={product.imageUrl || '/no-image.svg'}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain group-hover:scale-105 transition-transform duration-700 p-2"
                />
            </div>

            <div className="flex flex-col items-center w-full mb-4">
                {showAppleIcon && (
                    <div className="flex items-center justify-center mb-2 opacity-80 group-hover:opacity-100 transition-opacity" aria-label="Apple product">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
                            <path d="M17.05 20.28c-.96.95-2.06 1.72-3.32 1.72s-1.89-.66-3.23-.66-2.14.66-3.32.66-2.45-.85-3.53-2.31c-2.19-3.03-2.19-7.85 0-10.88 1.08-1.5 2.52-2.37 3.84-2.37 1.34 0 2.22.75 3.19.75.95 0 2.1-.75 3.32-.75 2.37 0 3.99 1.63 4.67 3.16-3.13 1.48-3.13 5.34.19 6.84-.71 1.76-1.83 3.51-3.31 4.84zm-3.68-15.54c-.66.78-1.74 1.35-2.77 1.25.13-1.03.74-2.13 1.45-2.94.75-.84 1.93-1.46 2.87-1.34.09 1.13-.59 2.22-1.55 3.03z" />
                        </svg>
                    </div>
                )}

                <h3 className="text-gray-900 font-bold text-[14px] md:text-[16px] leading-tight line-clamp-1 mb-2 group-hover:text-brand-purple transition-colors px-2">
                    {product.name}
                </h3>

                <div className="flex items-center justify-center gap-2">
                    <span className="text-brand-red font-black text-[15px] md:text-[18px]">
                        {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                        <span className="text-gray-400 text-[11px] md:text-[13px] font-medium line-through">
                            {formatPrice(product.oldPrice)}
                        </span>
                    )}
                </div>
            </div>

            <div className="w-full mt-auto px-2">
                <div className="w-full h-[40px] rounded-xl bg-[#faefe6] border border-orange-100 flex items-center justify-center group-hover:bg-[#fcecde] transition-colors border-transparent">
                    <span className="text-brand-red font-bold text-[14px]">Buy Now</span>
                </div>
            </div>
        </Link>
    );
}
