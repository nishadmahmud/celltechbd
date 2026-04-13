"use client";

import Link from 'next/link';
import { FiLayers, FiMessageCircle } from 'react-icons/fi';
import { SITE_INFO } from '../../lib/siteInfo';

export default function FloatingActions() {
    return (
        <div className="fixed right-3 md:right-6 bottom-24 md:bottom-36 z-[80] flex flex-col gap-3">
            <Link
                href="/compare"
                className="w-12 h-12 rounded-full bg-brand-blue text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white"
                aria-label="Compare products"
                title="Compare products"
            >
                <FiLayers size={19} />
            </Link>

            <a
                href={`https://wa.me/${SITE_INFO.whatsappNumberIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white"
                aria-label="WhatsApp"
                title="WhatsApp Chat"
            >
                <FiMessageCircle size={22} />
            </a>
        </div>
    );
}
