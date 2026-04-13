import Link from 'next/link';
import { SITE_INFO } from '../../lib/siteInfo';

export const metadata = {
    title: 'About Us | Pochondo Shop',
    description: 'Learn about Pochondo Shop and our outlets across Dhaka.',
};

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            <div className="bg-gradient-to-br from-brand-purple/10 via-purple-50 to-white py-16 md:py-24">
                <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">About <span className="text-brand-purple">Pochondo Shop</span></h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Pochondo Shop serves customers through online channels and physical outlets with authentic gadgets and reliable support.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We focus on original tech products, transparent pricing, and after-sales support. Our team helps customers choose the right device based on budget and use case.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Contact</h2>
                    <div className="space-y-2 text-gray-700">
                        <p><span className="font-semibold">Email:</span> {SITE_INFO.email}</p>
                        <p><span className="font-semibold">Phone / WhatsApp:</span> {SITE_INFO.phoneDisplay}</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Outlets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {SITE_INFO.outlets.map((outlet) => (
                            <div key={outlet.name} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                <h3 className="font-bold text-gray-900">{outlet.name}</h3>
                                {outlet.details.map((line) => (
                                    <p key={line} className="text-sm text-gray-600 mt-1">{line}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="text-center pt-8 border-t border-gray-100">
                    <p className="text-gray-500 mb-4">Need help choosing a product or finding an outlet?</p>
                    <Link href="/contact" className="inline-block bg-brand-purple text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand-purple/20">
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
