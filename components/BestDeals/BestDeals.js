import Image from 'next/image';
import Link from 'next/link';

export default function BestDeals({ deals = [] }) {
    const displayDeals = Array.isArray(deals) ? deals : [];

    return (
        <section className="bg-brand-blue/[0.02] py-16 md:py-24 border-b border-brand-blue/5">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 md:mb-5 tracking-tight">
                        Top <span className="text-brand-purple">Offers</span>
                    </h2>
                    <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto hidden sm:block font-medium">
                        Unbeatable offers hand-picked for you. Grab them before they are gone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {displayDeals.length > 0 ? displayDeals.map((deal, idx) => (
                        <div key={deal.id || idx} className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-row items-stretch border border-gray-200">
                            <div className="w-2/5 md:w-2/5 relative flex-shrink-0 bg-[#f8f9fa] border-r border-gray-100 p-2 md:p-6 flex items-center justify-center">
                                <div className="relative w-full aspect-square">
                                    <Image src={deal.imageUrl || '/no-image.svg'} alt={deal.title} fill unoptimized className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply" />
                                </div>
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-brand-red text-white text-[9px] md:text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">{deal.badge || 'Offer'}</span>
                                </div>
                            </div>
                            <div className="w-3/5 md:w-3/5 p-5 md:p-8 flex flex-col justify-center">
                                <h3 className="text-base md:text-[22px] font-bold tracking-tight text-gray-900 mb-2 md:mb-3 leading-[1.3] group-hover:text-brand-purple transition-colors line-clamp-2 md:line-clamp-none">{deal.title}</h3>
                                <p className="text-gray-500 text-[11px] md:text-sm leading-relaxed mb-4 md:mb-8 line-clamp-2">{deal.description}</p>

                                <div className="flex flex-wrap items-baseline gap-2 md:gap-3 mb-4 md:mb-6 mt-auto">
                                    <span className="text-lg md:text-3xl font-black text-brand-purple leading-none">{deal.price}</span>
                                    {deal.oldPrice && <span className="text-gray-400 text-xs md:text-base font-medium line-through">{deal.oldPrice}</span>}
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 md:pt-6 mt-auto">
                                    {deal.savings && <span className="bg-brand-red/10 text-brand-red text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-md tracking-wide uppercase">{deal.savings}</span>}
                                    <Link href={deal.link || '/'} className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-900 hover:text-brand-purple group-hover:translate-x-1 transition-all ml-auto md:ml-0 whitespace-nowrap">Shop Now
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="md:col-span-2 text-center py-10 text-gray-500 border border-dashed border-gray-200 rounded-xl bg-white">
                            No deal items available right now.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
