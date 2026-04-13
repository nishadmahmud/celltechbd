"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTiktok, FaPhoneAlt, FaWhatsapp, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { SITE_INFO } from '../../lib/siteInfo';

export default function Footer() {
    return (
        <footer className="bg-footer-bg text-gray-600 mt-auto">

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-14 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                    {/* Column 1: Logo + Contact */}
                    <div className="flex flex-col gap-5">
                        <Link href="/" className="inline-block" aria-label="Home">
                            <Image
                                src="/CELL LOGO-01~2.jpg.jpeg"
                                alt="Cell Tech BD"
                                width={180}
                                height={45}
                                className="h-10 w-auto object-contain"
                                unoptimized
                            />
                        </Link>

                        <div className="flex flex-col gap-3">
                            <h3 className="text-sm font-bold text-gray-900">Contact</h3>
                            <div className="flex items-start gap-2 text-sm">
                                <HiOutlineLocationMarker className="mt-0.5 text-brand-primary shrink-0" size={16} />
                                <span className="text-gray-500 text-[13px] leading-relaxed">
                                    {SITE_INFO.outlets?.[0]?.details?.join(', ') || 'Bashundhara City, Dhaka'}
                                </span>
                            </div>
                            <a href={`tel:${SITE_INFO.phoneDial}`} className="inline-flex items-center gap-2 text-[13px] hover:text-brand-primary transition-colors">
                                <FaPhoneAlt className="text-brand-primary shrink-0" size={13} />
                                <span>{SITE_INFO.callDisplay}</span>
                            </a>
                            <a href={`mailto:${SITE_INFO.email}`} className="inline-flex items-center gap-2 text-[13px] hover:text-brand-primary transition-colors">
                                <HiOutlineMail className="text-brand-primary shrink-0" size={16} />
                                <span>{SITE_INFO.email}</span>
                            </a>
                        </div>

                        {/* Complain / Advice */}
                        <div className="mt-2">
                            <h4 className="text-sm font-bold text-gray-900 mb-2">Complain / Advice</h4>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-5 py-2 bg-brand-primary text-white text-xs font-bold rounded-full hover:bg-green-600 transition-colors"
                            >
                                Feedback
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">Quick Links</h3>
                        <div className="flex flex-col gap-2 text-[13px]">
                            <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                            <Link href="/about" className="hover:text-brand-primary transition-colors">About Us</Link>
                            <Link href="/blogs" className="hover:text-brand-primary transition-colors">Blog</Link>
                            <Link href="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link>
                            <Link href="/warranty" className="hover:text-brand-primary transition-colors">Warranty Info</Link>
                            <Link href="/track-order" className="hover:text-brand-primary transition-colors">Track My Order</Link>
                            <Link href="/special-offers" className="hover:text-brand-primary transition-colors">Special Offers</Link>
                        </div>
                    </div>

                    {/* Column 3: Policies */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">Policies</h3>
                        <div className="flex flex-col gap-2 text-[13px]">
                            <Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
                            <Link href="/warranty" className="hover:text-brand-primary transition-colors">Warranty Policy</Link>
                            <Link href="/refund" className="hover:text-brand-primary transition-colors">Return & Refund Policy</Link>
                            <Link href="/terms" className="hover:text-brand-primary transition-colors">Terms & Conditions</Link>
                        </div>
                    </div>

                    {/* Column 4: Pay With + Store */}
                    <div className="flex flex-col gap-5">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3">Pay With</h3>
                            <Image
                                src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-05.png"
                                alt="Payment Methods"
                                width={280}
                                height={60}
                                className="w-full max-w-[260px] h-auto object-contain"
                                unoptimized
                            />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-2">Store</h3>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-5 py-2 bg-brand-primary text-white text-xs font-bold rounded-full hover:bg-green-600 transition-colors"
                            >
                                Shop Location
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Bar */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <span className="text-sm font-bold text-gray-700">Let&apos;s get social</span>
                    <div className="flex items-center gap-3">
                        <a href={SITE_INFO.social?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="Facebook">
                            <FaFacebook size={16} />
                        </a>
                        <a href={SITE_INFO.social?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="Instagram">
                            <FaInstagram size={16} />
                        </a>
                        <a href={SITE_INFO.social?.tiktok || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="TikTok">
                            <FaTiktok size={16} />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="YouTube">
                            <FaYoutube size={16} />
                        </a>
                        <a href={`https://wa.me/${SITE_INFO.whatsappNumberIntl}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="WhatsApp">
                            <FaWhatsapp size={16} />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="LinkedIn">
                            <FaLinkedin size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-center">
                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Cell Tech BD | All Rights Reserved.
                    </p>
                    <p className="text-xs text-gray-400">
                        Developed by{" "}
                        <a
                            href="https://www.squadinnovators.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-primary font-semibold hover:underline"
                        >
                            Squad Innovators
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
