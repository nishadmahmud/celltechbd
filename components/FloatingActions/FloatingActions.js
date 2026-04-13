"use client";

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiShuffle } from 'react-icons/fi';
import { SITE_INFO } from '../../lib/siteInfo';

export default function FloatingActions() {
    return (
        <div className="fixed right-3 md:right-6 bottom-24 md:bottom-36 z-[80] flex flex-col gap-3">
            <a
                href={`https://wa.me/${SITE_INFO.whatsappNumberIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-brand-purple text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="WhatsApp"
                title="WhatsApp"
            >
                <FaWhatsapp size={22} />
            </a>

            <Link
                href="/compare"
                className="w-12 h-12 rounded-full bg-brand-blue text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Compare products"
                title="Compare products"
            >
                <FiShuffle size={19} />
            </Link>
        </div>
    );
}
