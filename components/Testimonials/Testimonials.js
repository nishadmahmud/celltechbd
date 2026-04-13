"use client";

import { FaStar } from 'react-icons/fa';

export default function Testimonials() {
    const reviews = [
        { id: 1, name: "Rahim Ahmed", role: "Custom PC Builder", rating: 5, text: "Got all my components delivered within 24 hours. Everything was perfectly packaged. Top-notch service!", avatar: "R" },
        { id: 2, name: "Tasnia Farin", role: "Content Creator", rating: 5, text: "Bought the A7 IV bundle. Genuine product and the lowest price in the market. Highly recommended!", avatar: "T" },
        { id: 3, name: "Imran Khan", role: "Gamer", rating: 4, text: "My PS5 arrived safely. Customer support was very responsive when I asked about warranty details.", avatar: "I" },
        { id: 4, name: "Nusrat Jahan", role: "Software Engineer", rating: 5, text: "Upgraded my WFH setup with a new monitor and ergonomic chair from Pochondo. Life-changing!", avatar: "N" },
        { id: 5, name: "Sakib Hasan", role: "Smartphone Buyer", rating: 5, text: "Pre-ordered the new iPhone, got it on release day. Seamless experience from start to finish.", avatar: "S" },
        { id: 6, name: "Maliha Rahman", role: "Audiophile", rating: 4, text: "The Sony headphones are 100% authentic. Great sound, fast delivery, couldn't ask for more.", avatar: "M" },
    ];

    return (
        <section className="bg-[#fbfcfa] py-16 md:py-24 text-gray-900 border-b border-gray-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-gray-900">
                        Don't just take our word for it.
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 mb-6 max-w-2xl mx-auto font-medium leading-relaxed">
                        We've built our reputation on trust, genuine tech products, and excellent service. Here's what our community says.
                    </p>

                    {/* Rating Badge */}
                    <div className="inline-flex flex-wrap justify-center items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-white rounded-full border border-gray-200 shadow-sm">
                        <span className="text-xl md:text-2xl font-black text-gray-900">4.9</span>
                        <div className="flex gap-1 text-brand-purple text-sm md:text-base">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-gray-500">Based on 2,500+ reviews</span>
                    </div>
                </div>

                {/* Marquee Wrapper - Constrained to max-w-7xl */}
                <div className="relative overflow-hidden py-4">
                    <div className="animate-marquee flex gap-6 md:gap-8">
                        {/* Double the items for seamless loop */}
                        {[...reviews, ...reviews].map((review, idx) => (
                            <div key={`${review.id}-${idx}`} className="w-[300px] md:w-[400px] shrink-0">
                                <ReviewCard review={review} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ReviewCard({ review }) {
    return (
        <div className="bg-white rounded-[24px] p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-brand-purple/30 transition-all duration-300 flex flex-col items-start text-left group h-full">
            <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-[12px] md:text-[14px] ${i < review.rating ? 'text-brand-purple' : 'text-gray-200'}`} />
                ))}
            </div>
            <p className="text-gray-800 text-sm md:text-[15px] leading-relaxed mb-8 font-medium italic">
                "{review.text}"
            </p>
            <div className="flex items-center gap-3 lg:gap-4 mt-auto w-full pt-5 border-t border-gray-50">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#fdf3eb] flex items-center justify-center text-brand-purple font-bold text-sm md:text-lg border border-purple-100 shadow-sm shrink-0">
                    {review.avatar}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-[15px] font-bold text-gray-900 leading-tight mb-1 truncate">{review.name}</h4>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 tracking-wider uppercase leading-none truncate">{review.role}</p>
                </div>
            </div>
        </div>
    );
}
