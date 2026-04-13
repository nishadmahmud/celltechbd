"use client";

import { FaStar } from 'react-icons/fa';

export default function Testimonials() {
    const reviews = [
        { id: 1, name: "Rahim Ahmed", role: "Custom PC Builder", rating: 5, text: "Got all my components delivered within 24 hours. Everything was perfectly packaged. Top-notch service!", avatar: "R" },
        { id: 2, name: "Tasnia Farin", role: "Content Creator", rating: 5, text: "Bought the A7 IV bundle. Genuine product and the lowest price in the market. Highly recommended!", avatar: "T" },
        { id: 3, name: "Imran Khan", role: "Gamer", rating: 4, text: "My PS5 arrived safely. Customer support was very responsive when I asked about warranty details.", avatar: "I" },
        { id: 4, name: "Nusrat Jahan", role: "Software Engineer", rating: 5, text: "Upgraded my WFH setup with a new monitor and ergonomic chair from Cell Tech BD. Life-changing!", avatar: "N" },
        { id: 5, name: "Sakib Hasan", role: "Smartphone Buyer", rating: 5, text: "Pre-ordered the new iPhone, got it on release day. Seamless experience from start to finish.", avatar: "S" },
        { id: 6, name: "Maliha Rahman", role: "Audiophile", rating: 4, text: "The Sony headphones are 100% authentic. Great sound, fast delivery, couldn't ask for more.", avatar: "M" },
    ];

    return (
        <section className="bg-white py-12 md:py-20 border-b border-gray-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-xl md:text-[28px] font-extrabold tracking-tight mb-3">
                        <span className="text-gray-800">What Our </span>
                        <span className="text-brand-primary">Customers Say</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 mb-5 max-w-2xl mx-auto leading-relaxed">
                        We've built our reputation on trust, genuine tech products, and excellent service.
                    </p>

                    {/* Rating Badge */}
                    <div className="inline-flex flex-wrap justify-center items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2.5 bg-gray-50 rounded-full border border-gray-200">
                        <span className="text-lg md:text-xl font-black text-gray-900">4.9</span>
                        <div className="flex gap-0.5 text-brand-primary text-sm">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-gray-500">Based on 2,500+ reviews</span>
                    </div>
                </div>

                {/* Marquee */}
                <div className="relative overflow-hidden py-4">
                    <div className="animate-marquee flex gap-5 md:gap-6">
                        {[...reviews, ...reviews].map((review, idx) => (
                            <div key={`${review.id}-${idx}`} className="w-[280px] md:w-[360px] shrink-0">
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
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 hover:border-brand-primary/30 hover:shadow-md transition-all duration-300 flex flex-col items-start text-left h-full">
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-[12px] ${i < review.rating ? 'text-brand-primary' : 'text-gray-200'}`} />
                ))}
            </div>
            <p className="text-gray-700 text-sm md:text-[14px] leading-relaxed mb-6 font-medium italic">
                "{review.text}"
            </p>
            <div className="flex items-center gap-3 mt-auto w-full pt-4 border-t border-gray-100">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-sm border border-brand-primary/20 shrink-0">
                    {review.avatar}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 leading-tight mb-0.5 truncate">{review.name}</h4>
                    <p className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase truncate">{review.role}</p>
                </div>
            </div>
        </div>
    );
}
