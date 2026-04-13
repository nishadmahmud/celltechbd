"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTiktok, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { SITE_INFO } from '../../lib/siteInfo';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 text-gray-600 mt-auto pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    <div className="flex flex-col gap-5">
                        <Link href="/" className="inline-block" aria-label="Home">
                            <Image
                                src="/logo-main.png"
                                alt="Pochondo Shop"
                                width={180}
                                height={45}
                                className="h-10 w-auto object-contain"
                                unoptimized
                            />
                        </Link>
                        <p className="text-sm leading-relaxed font-medium text-gray-500 max-w-xs">
                            Trusted gadgets, phones, laptops, and accessories from multiple Pochondo Shop outlets in Dhaka.
                        </p>
                        <div className="flex gap-3">
                            <a href={SITE_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-purple text-white shadow hover:scale-105 transition-transform" aria-label="Facebook">
                                <FaFacebook size={18} />
                            </a>
                            <a href={SITE_INFO.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-purple text-white shadow hover:scale-105 transition-transform" aria-label="Instagram">
                                <FaInstagram size={18} />
                            </a>
                            <a href={SITE_INFO.social.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-purple text-white shadow hover:scale-105 transition-transform" aria-label="TikTok">
                                <FaTiktok size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-black text-gray-900 tracking-tight">Contact</h3>
                        <a href={`mailto:${SITE_INFO.email}`} className="inline-flex items-start gap-2 text-sm font-medium hover:text-brand-purple">
                            <HiOutlineMail className="mt-0.5 text-brand-purple" size={18} />
                            <span>{SITE_INFO.email}</span>
                        </a>
                        <a href={`tel:${SITE_INFO.phoneDial}`} className="inline-flex items-start gap-2 text-sm font-medium hover:text-brand-purple">
                            <FaPhoneAlt className="mt-0.5 text-brand-purple" size={16} />
                            <span>{SITE_INFO.callDisplay}</span>
                        </a>
                        <a
                            href={`https://wa.me/${SITE_INFO.whatsappNumberIntl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-2 text-sm font-medium hover:text-brand-purple"
                        >
                            <FaWhatsapp className="mt-0.5 text-brand-purple" size={18} />
                            <span>WhatsApp: {SITE_INFO.whatsappDisplay}</span>
                        </a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-black text-gray-900 tracking-tight">Our Outlets</h3>
                        <div className="space-y-4">
                            {SITE_INFO.outlets.map((outlet) => (
                                <div key={outlet.name} className="flex items-start gap-2">
                                    <HiOutlineLocationMarker className="mt-0.5 text-brand-purple shrink-0" size={18} />
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{outlet.name}</p>
                                        {outlet.details.map((line) => (
                                            <p key={line} className="text-sm text-gray-500">{line}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-black text-gray-900 tracking-tight">Quick Links</h3>
                        <div className="flex flex-col gap-2 text-sm font-medium">
                            <Link href="/about" className="hover:text-brand-purple">About Us</Link>
                            <Link href="/blogs" className="hover:text-brand-purple">Blogs</Link>
                            <Link href="/contact" className="hover:text-brand-purple">Contact Us</Link>
                            <Link href="/compare" className="hover:text-brand-purple">Compare Products</Link>
                            <Link href="/special-offers" className="hover:text-brand-purple">Special Offers</Link>
                            <Link href="/track-order" className="hover:text-brand-purple">Track Order</Link>
                        </div>
                    </div>
                </div>

                <div className="mb-8 border-t border-gray-50 pt-8">
                    <Image
                        src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
                        alt="Payment Methods"
                        width={1200}
                        height={100}
                        className="w-full h-auto object-contain"
                        unoptimized
                    />
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs md:text-sm font-medium text-gray-400">
                        &copy; {new Date().getFullYear()} Pochondo Shop. All Rights Reserved.
                    </p>
                    <p className="text-xs text-gray-400">Email: {SITE_INFO.email} | Phone: {SITE_INFO.phoneDisplay}</p>
                    <p className="text-xs text-gray-400">
                        Developed by{" "}
                        <a
                            href="https://www.squadinnovators.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-purple font-semibold hover:underline"
                        >
                            Squad Innovators
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
