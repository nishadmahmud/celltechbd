"use client";

import { useRef } from 'react';

export default function ProductTabs({ description, specifications = [] }) {
    const specsRef = useRef(null);
    const descRef = useRef(null);

    const scrollToSection = (ref) => {
        if (ref.current) {
            const offset = 100; // Small offset for any fixed header
            const elementPosition = ref.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="mt-12 md:mt-24 w-full">
            {/* Navigation Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 mb-12 flex items-center gap-6 md:gap-10">
                <button
                    onClick={() => scrollToSection(specsRef)}
                    className="cursor-pointer py-4 text-[15px] md:text-[17px] font-bold text-gray-900 border-b-2 border-brand-red transition-all hover:opacity-80"
                >
                    Specifications
                </button>
                <button
                    onClick={() => scrollToSection(descRef)}
                    className="cursor-pointer py-4 text-[15px] md:text-[17px] font-bold text-gray-400 hover:text-brand-purple transition-all"
                >
                    Description
                </button>
            </div>

            {/* Combined Content Area */}
            <div className="space-y-20 md:space-y-32">
                
                {/* Specifications Section */}
                <section ref={specsRef} className="scroll-mt-32">
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-brand-red rounded-full"></span>
                        Product Specifications
                    </h3>
                    <div className="w-full">
                        {Array.isArray(specifications) && specifications.length > 0 ? (
                            <div className="divide-y divide-gray-100 border border-gray-100 rounded-[24px] overflow-hidden shadow-sm bg-white">
                                {specifications.map((spec, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row p-5 md:p-6 hover:bg-gray-50/50 transition-colors">
                                        <div className="sm:w-1/3 text-gray-400 font-bold mb-1 sm:mb-0 uppercase tracking-widest text-[10px] md:text-[11px] antialiased">
                                            {spec.name}
                                        </div>
                                        <div className="sm:w-2/3 text-gray-800 text-[14px] md:text-[16px] font-semibold leading-relaxed">
                                            {spec.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 italic py-10 text-center bg-gray-50 rounded-2xl">No detailed specifications available.</p>
                        )}
                    </div>
                </section>

                {/* Description Section */}
                <section ref={descRef} className="scroll-mt-32">
                     <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-brand-purple rounded-full"></span>
                        Overview & Details
                    </h3>
                    <div className="prose prose-sm md:prose-base max-w-none overflow-hidden break-words prose-img:rounded-[32px] prose-img:shadow-2xl prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: description }} className="w-full" />
                    </div>
                </section>

            </div>
        </div>
    );
}
