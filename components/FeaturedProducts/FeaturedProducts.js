import Link from 'next/link';
import ProductCard from '../Shared/ProductCard';

export default function FeaturedProducts({ products = [] }) {
    const displayProducts = Array.isArray(products) ? products : [];

    return (
        <section className="bg-white py-16 md:py-28 border-b border-gray-50">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="flex items-end justify-between mb-6 md:mb-12 gap-4">
                    <div>
                        <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-1 md:mb-3 tracking-tight">
                            Premium <span className="text-brand-purple">Picks</span>
                        </h2>
                        <p className="text-gray-500 text-xs md:text-lg hidden sm:block">Explore curated premium tech gear chosen just for you.</p>
                    </div>
                    <Link href="/" className="text-xs md:text-sm font-bold text-gray-500 hover:text-brand-purple uppercase tracking-widest transition-all inline-block pb-1 border-b-2 border-transparent hover:border-brand-purple whitespace-nowrap">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 md:gap-5">
                    {displayProducts.length > 0 ? displayProducts.map((product, idx) => (
                        <ProductCard key={product.id || idx} product={product} />
                    )) : (
                        <div className="col-span-2 sm:col-span-2 lg:col-span-5 text-center py-10 text-gray-500 border border-dashed border-gray-200 rounded-xl">
                            No featured products available right now.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
