"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiShoppingCart, FiUser, FiZap } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function MobileBottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const { cartCount, openCart } = useCart();
    const { user, openAuthModal } = useAuth();

    const navItems = [
        { name: 'Home', href: '/', icon: FiHome },
        { name: 'Cart', href: '#', icon: FiShoppingCart, isCartToggle: true },
        { name: 'Offers', href: '/special-offers', icon: FiZap, isSpecialOffers: true },
        { name: user ? 'Profile' : 'Login', href: '/profile', icon: FiUser, isAuth: true },
    ];

    return (
        <div className="md:hidden fixed bottom-2 left-2 right-2 bg-white/80 backdrop-blur-xl border border-brand-purple/20 rounded-2xl z-50 shadow-lg pb-safe">
            <div className="flex justify-around items-center px-2 py-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    const isCartItem = item.isCartToggle;
                    const isAuthItem = item.isAuth;
                    const isSpecialOffers = item.isSpecialOffers;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => {
                                if (isCartItem) {
                                    e.preventDefault();
                                    openCart();
                                } else if (isAuthItem) {
                                    e.preventDefault();
                                    if (user) {
                                        router.push('/profile');
                                    } else {
                                        openAuthModal('login');
                                    }
                                }
                            }}
                            className={`flex flex-col items-center justify-center w-full gap-1.5 transition-colors ${isActive ? 'text-brand-purple' : 'text-brand-purple/50 hover:text-brand-purple'}`}
                        >
                            <div className="relative">
                                {isAuthItem && user?.image ? (
                                    <div className={`w-6 h-6 rounded-full overflow-hidden ring-2 ${isActive ? 'ring-brand-purple' : 'ring-brand-purple/20'}`}>
                                        <Image src={user.image} alt="Profile" width={24} height={24} className="w-full h-full object-cover" unoptimized />
                                    </div>
                                ) : isAuthItem && user ? (
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ${isActive ? 'bg-brand-purple/20 text-brand-purple ring-brand-purple' : 'bg-brand-purple/5 text-brand-purple/60 ring-brand-purple/20'}`}>
                                        {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
                                    </div>
                                ) : (
                                    <>
                                        <Icon
                                            size={20}
                                            className={isCartItem && cartCount > 0 && !isActive ? 'text-[#ff2a3b]' : ''}
                                            strokeWidth={isActive ? 2.5 : 2}
                                        />
                                        {isCartItem && cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-[#ff2a3b] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                                                {cartCount}
                                            </span>
                                        )}
                                        {isSpecialOffers && (
                                            <span className="absolute -top-2 -right-3 text-[8px] font-black text-white bg-[#ff2a3b] px-1.5 py-0.5 rounded-full animate-pulse">
                                                HOT
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                            <span className={`text-[10px] font-semibold tracking-wide ${isSpecialOffers ? 'animate-pulse text-[#ff2a3b]' : ''}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
