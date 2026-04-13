"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiPhone, FiMapPin, FiMenu, FiX, FiMic, FiChevronRight, FiGrid } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { searchProducts } from '../../lib/api';

export default function Header({ categories = [] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [activeSearchCategory, setActiveSearchCategory] = useState('all');

  const { cartCount, openCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  const displayCategories = (Array.isArray(categories) ? categories : []).slice(0, 7);

  const handleUserClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      openAuthModal('login');
    }
  };

  // Close sidebar on navigation (using simple onClick for links)
  const closeSidebar = () => setIsSidebarOpen(false);

  const runSearch = async (q) => {
    if (!q) {
      setIsSearchOpen(false);
      setSearchResults([]);
      setSearchCategories([]);
      setSearchError('');
      return;
    }

    setIsSearchOpen(true);
    setIsSearching(true);
    setSearchError('');

    try {
      const res = await searchProducts(q);
      const payload = res?.data || res;
      const items = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

      const mapped = items.map((p) => {
        const basePrice = Number(p.retails_price || p.discounted_price || 0);
        const discountValue = Number(p.discount || 0);
        const discountType = String(p.discount_type || '').toLowerCase();
        const hasDiscount = discountValue > 0 && discountType !== '0';

        const price = hasDiscount
          ? discountType === 'percentage'
            ? Math.max(0, Math.round(basePrice * (1 - discountValue / 100)))
            : Math.max(0, basePrice - discountValue)
          : basePrice;

        const discountLabel = hasDiscount
          ? discountType === 'percentage'
            ? `-${discountValue}%`
            : `৳ ${discountValue.toLocaleString('en-IN')}`
          : null;

        const imageUrl =
          p.image_path ||
          p.image_path1 ||
          p.image_path2 ||
          (Array.isArray(p.image_paths) && p.image_paths[0]) ||
          '/no-image.svg';

        return {
          id: p.id,
          name: p.name,
          price: `৳ ${price.toLocaleString('en-IN')}`,
          oldPrice: hasDiscount ? `৳ ${basePrice.toLocaleString('en-IN')}` : null,
          discount: discountLabel,
          imageUrl,
          brand: p.brands?.name || '',
          categoryName: p.category?.name || 'Others',
        };
      });

      setSearchResults(mapped);

      const categorySet = new Set(mapped.map((m) => m.categoryName));
      const cats = Array.from(categorySet).sort();
      setSearchCategories(cats);
      setActiveSearchCategory('all');
    } catch (err) {
      console.error('Search failed', err);
      setSearchError('Something went wrong while searching. Please try again.');
      setSearchResults([]);
      setSearchCategories([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    runSearch(q);
  };

  // Debounce search when user stops typing
  useEffect(() => {
    const q = searchQuery.trim();

    if (!q) {
      // Clear & close when input is emptied
      setIsSearchOpen(false);
      setSearchResults([]);
      setSearchCategories([]);
      setSearchError('');
      return;
    }

    const timeout = setTimeout(() => {
      runSearch(q);
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const closeSearchModal = () => {
    setIsSearchOpen(false);
  };

  const filteredSearchResults = useMemo(() => {
    if (activeSearchCategory === 'all') return searchResults;
    return searchResults.filter((p) => p.categoryName === activeSearchCategory);
  }, [searchResults, activeSearchCategory]);

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-brand-purple/5 backdrop-blur-xl border-b border-brand-purple/20 shadow-sm transition-all duration-300">

        {/* Main Navigation */}
        <div className="py-2.5 md:py-3 overflow-hidden">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 gap-3 md:gap-8">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 z-10" aria-label="Home">
              <Image
                src="/logo-main.png"
                alt="Pochondo Shop"
                width={180}
                height={45}
                className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                unoptimized
                priority
              />
            </Link>

            {/* Global Search Bar (Mobile & Desktop) */}
            <form onSubmit={handleSearchSubmit} className="flex-grow flex items-center bg-white/60 backdrop-blur-md border border-brand-purple/20 focus-within:bg-white focus-within:border-brand-purple/50 focus-within:shadow-[0_4px_16px_rgba(101,45,143,0.1)] rounded-full px-4 py-1.5 md:py-2 transition-all duration-300 mx-2 md:mx-6 group w-full relative">
              <FiSearch className="text-brand-purple/60 group-focus-within:text-brand-purple mr-2 flex-shrink-0 transition-colors w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-grow bg-transparent border-none outline-none text-base text-gray-800 min-w-0 w-full md:hidden"
                style={{ fontSize: '16px' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search laptops, smartphones, accessories..."
                className="flex-grow bg-transparent border-none outline-none text-base text-gray-800 min-w-0 w-full hidden md:block"
                style={{ fontSize: '16px' }}
              />
              <button type="submit" className="text-brand-purple/60 hover:text-brand-purple transition-colors flex items-center justify-center p-0.5 md:p-1 flex-shrink-0 border-l border-brand-purple/20 pl-1.5 md:pl-3 ml-1 md:ml-2">
                <FiMic className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" />
              </button>
            </form>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex gap-8 text-[13px] font-medium text-gray-500 tracking-wide">
              <Link href="/" className="hover:text-brand-purple transition-colors">Home</Link>
              <Link href="/blogs" className="hover:text-brand-purple transition-colors">Blogs</Link>
              <Link href="/about" className="hover:text-brand-purple transition-colors">About</Link>
              <Link href="/contact" className="hover:text-brand-purple transition-colors">Contact</Link>
            </nav>

            {/* Desktop Action Icons */}
            <div className="hidden md:flex gap-4 items-center ml-2 lg:border-l border-brand-purple/20 lg:pl-6">
              <button onClick={handleUserClick} className="text-gray-600 hover:text-brand-purple transition-colors" aria-label="Account">
                {user?.image ? (
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200">
                    <Image src={user.image} alt="Profile" width={28} height={28} className="w-full h-full object-cover" unoptimized />
                  </div>
                ) : user ? (
                  <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white">
                    {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <FiUser size={20} strokeWidth={1.5} />
                )}
              </button>
              <button onClick={openCart} className="text-gray-600 hover:text-brand-purple transition-colors relative" aria-label="Cart">
                <FiShoppingCart size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-brand-purple text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-800 hover:text-brand-blue transition-colors p-1 sm:p-1.5 flex-shrink-0 ml-0.5 sm:ml-0"
              aria-label="Menu"
            >
              <FiMenu className="w-6 h-6 sm:w-[26px] sm:h-[26px]" />
            </button>
          </div>
        </div>

        {/* Global Search Results Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-[100%] left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 max-h-[80vh] md:max-h-[70vh] flex flex-col border-t">
            {isSearching ? (
              <div className="p-12 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple"></div>
              </div>
            ) : searchError ? (
              <div className="p-8 text-center text-red-500">{searchError}</div>
            ) : searchResults.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No products found matching &quot;{searchQuery}&quot;</div>
            ) : (
              <>
                {/* Mobile: Horizontal Category Pills + Close */}
                <div className="md:hidden sticky top-0 bg-white z-10 border-b border-gray-100">
                  <div className="flex items-center justify-between px-4 pt-3 pb-2">
                    <h3 className="text-sm font-bold text-gray-800">{filteredSearchResults.length} Results</h3>
                    <button onClick={closeSearchModal} className="text-xs text-brand-purple font-semibold hover:underline">Close</button>
                  </div>
                  <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setActiveSearchCategory('all')}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeSearchCategory === 'all'
                        ? 'bg-brand-purple text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-brand-purple'
                      }`}
                    >
                      All ({searchResults.length})
                    </button>
                    {searchCategories.map(cat => {
                      const count = searchResults.filter(p => p.categoryName === cat).length;
                      return (
                        <button
                          key={cat}
                          onClick={() => setActiveSearchCategory(cat)}
                          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeSearchCategory === cat
                            ? 'bg-brand-purple text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-brand-purple'
                          }`}
                        >
                          {cat} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile: Compact Product List */}
                <div className="md:hidden flex-1 overflow-y-auto no-scrollbar">
                  {filteredSearchResults.map(product => (
                    <Link
                      key={product.id}
                      href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`}
                      onClick={closeSearchModal}
                      className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 hover:bg-purple-50/30 transition-colors"
                    >
                      <div className="w-16 h-16 relative bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-contain p-1 mix-blend-multiply"
                          unoptimized
                        />
                        {product.discount && (
                          <div className="absolute top-0.5 left-0.5 bg-[#ff2a3b] text-white text-[8px] font-bold px-1 py-0.5 rounded">
                            {product.discount}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        {product.brand && <span className="text-[10px] font-semibold text-brand-purple">{product.brand}</span>}
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">{product.name}</h4>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="font-bold text-sm text-brand-purple">{product.price}</span>
                          {product.oldPrice && (
                            <span className="text-[10px] text-gray-400 line-through">{product.oldPrice}</span>
                          )}
                        </div>
                      </div>
                      <FiChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                    </Link>
                  ))}
                </div>

                {/* Desktop: Original Sidebar + Grid Layout */}
                <div className="hidden md:flex flex-row h-full overflow-hidden">
                  {/* Search Sidebar (Categories) */}
                  <div className="w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0 overflow-y-auto">
                    <div className="p-4">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
                      <ul className="space-y-1">
                        <li>
                          <button
                            onClick={() => setActiveSearchCategory('all')}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSearchCategory === 'all'
                              ? 'bg-brand-purple text-white font-semibold'
                              : 'text-gray-600 hover:bg-purple-50 hover:text-brand-purple'
                              }`}
                          >
                            All Results ({searchResults.length})
                          </button>
                        </li>
                        {searchCategories.map(cat => {
                          const count = searchResults.filter(p => p.categoryName === cat).length;
                          return (
                            <li key={cat}>
                              <button
                                onClick={() => setActiveSearchCategory(cat)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between items-center ${activeSearchCategory === cat
                                  ? 'bg-brand-purple text-white font-semibold'
                                  : 'text-gray-600 hover:bg-purple-50 hover:text-brand-purple'
                                  }`}
                              >
                                <span className="truncate pr-2">{cat}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSearchCategory === cat ? 'bg-white/20' : 'bg-gray-200'
                                  }`}>{count}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Search Results Grid */}
                  <div className="flex-1 overflow-y-auto p-4 bg-white" style={{ maxHeight: '60vh' }}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-800">
                        {activeSearchCategory === 'all' ? 'All Products' : activeSearchCategory}
                      </h3>
                      <button
                        onClick={closeSearchModal}
                        className="text-xs text-brand-purple hover:underline"
                      >
                        Close
                      </button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredSearchResults.map(product => (
                        <Link
                          key={product.id}
                          href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`}
                          onClick={closeSearchModal}
                          className="group flex flex-col border border-gray-100 rounded-xl hover:shadow-md transition-shadow p-3 hover:border-brand-purple/30"
                        >
                          <div className="aspect-square relative bg-gray-50 rounded-lg mb-3 overflow-hidden">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                            {product.discount && (
                              <div className="absolute top-2 left-2 bg-[#ff2a3b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                {product.discount}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 flex flex-col">
                            <span className="text-[10px] font-semibold text-brand-purple mb-1">
                              {product.brand}
                            </span>
                            <h4 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-brand-blue transition-colors">
                              {product.name}
                            </h4>
                            <div className="mt-auto flex items-baseline gap-1.5 flex-wrap">
                              <span className="font-bold text-[#ff2a3b]">{product.price}</span>
                              {product.oldPrice && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  {product.oldPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Desktop Category Strip */}
        <div className="hidden md:block bg-brand-purple/5 backdrop-blur-xl border-t border-brand-purple/20 py-2.5 relative z-40">
          <div className="max-w-7xl mx-auto flex gap-6 px-6 items-center">
            <span className="font-bold text-brand-purple text-[11px] uppercase tracking-[0.1em] flex items-center gap-1.5 flex-shrink-0">
              <FiGrid size={13} className="text-brand-purple" /> Categories
            </span>
            <div className="w-px h-3 bg-brand-purple/20 mx-0 flex-shrink-0"></div>
            <div className="flex items-center gap-3 flex-1 flex-wrap">
              {displayCategories.length > 0 ? displayCategories.map((cat, idx) => (
                <div key={cat.id || idx} className="relative group">
                  <Link
                    href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center text-brand-purple text-sm font-semibold px-4 py-1.5 rounded-full bg-white/60 hover:bg-brand-purple hover:text-white border border-brand-purple/20 transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-md"
                  >
                    {cat.name}
                  </Link>

                  {/* Subcategories Dropdown */}
                  {cat.sub_category && cat.sub_category.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-brand-purple/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                      <div className="py-2">
                        {cat.sub_category.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}?subcat=${encodeURIComponent(
                              (sub.slug || sub.name || "").toLowerCase().trim().replace(/\s+/g, "-")
                            )}&subcat_id=${sub.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 font-medium hover:transition-colors hover:text-brand-purple hover:bg-brand-purple/5"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )) : (
                <span className="text-sm text-gray-500 font-medium">No categories available right now.</span>
              )}
            </div>
            <div className="ml-auto flex items-center gap-6 flex-shrink-0 pl-6">
              <Link href="/track-order" className="group flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors">
                <FiMapPin size={14} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
                <span className="text-[12px] font-medium tracking-wide">
                  Track Order
                </span>
              </Link>
              <Link href="/special-offers" className="group flex items-center gap-1.5 text-brand-red hover:text-red-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                </svg>
                <span className="text-[12px] font-bold tracking-wide">
                  Offers
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-white z-[70] transform transition-transform duration-300 ease-in-out flex flex-col md:hidden shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Sidebar Header */}
        <div className="bg-white p-4 flex justify-between items-center border-b border-gray-100 shadow-sm">
          <Link href="/" onClick={closeSidebar} className="flex items-center flex-shrink-0" aria-label="Home">
            <Image
              src="/logo-main.png"
              alt="Pochondo Shop"
              width={150}
              height={36}
              className="h-8 w-auto object-contain"
              unoptimized
            />
          </Link>
          <button onClick={closeSidebar} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* Sidebar Login */}
        <button onClick={() => { closeSidebar(); handleUserClick(); }} className="flex items-center gap-3 w-full px-5 py-3.5 border-b border-gray-100 bg-gray-50/50 text-gray-700 hover:text-brand-purple hover:bg-purple-50/30 transition-colors">
          {user?.image ? (
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-brand-purple/40">
              <Image src={user.image} alt="Profile" width={32} height={32} className="w-full h-full object-cover" unoptimized />
            </div>
          ) : user ? (
            <div className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center text-sm font-bold text-brand-purple ring-2 ring-brand-purple/30">
              {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center">
              <FiUser size={18} className="text-brand-purple" />
            </div>
          )}
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold">{user ? (user.first_name || user.name || 'User') : 'Login / Sign Up'}</span>
            <span className="text-[10px] text-gray-400">{user ? 'View your profile' : 'Access your account'}</span>
          </div>
          <FiChevronRight size={16} className="text-gray-300 ml-auto" />
        </button>

        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto py-2 no-scrollbar">
          {/* Categories First */}
          <div className="px-5 py-3 bg-gray-50 text-[10px] font-extrabold text-brand-purple uppercase tracking-widest flex items-center gap-2">
            <FiGrid size={12} /> Categories
          </div>
          {displayCategories.length > 0 ? displayCategories.map((cat, idx) => (
            <Link
              key={cat.id || idx}
              href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 font-medium border-b border-gray-50 hover:text-brand-purple hover:bg-purple-50/30 transition-colors"
            >
              {cat.image_url ? (
                <Image
                  src={cat.image_url}
                  alt={cat.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                  unoptimized
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                  <FiGrid size={14} className="text-brand-purple/50" />
                </div>
              )}
              <span className="flex-1">{cat.name}</span>
              <FiChevronRight size={14} className="text-gray-300" />
            </Link>
          )) : (
            <div className="px-5 py-4 text-sm text-gray-500 border-b border-gray-50">
              No categories available right now.
            </div>
          )}

          {/* Main Menu */}
          <div className="px-5 py-3 bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-2">Menu</div>
          <Link href="/" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-purple hover:bg-purple-50/30 transition-colors">
            <span>Home</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/about" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-purple hover:bg-purple-50/30 transition-colors">
            <span>About Us</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/blogs" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-purple hover:bg-purple-50/30 transition-colors">
            <span>Blogs</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/contact" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-purple hover:bg-purple-50/30 transition-colors">
            <span>Contact</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/warranty" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-purple hover:bg-purple-50/30 transition-colors">
            <span>Warranty Policy</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/refund" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-purple hover:bg-purple-50/30 transition-colors">
            <span>Refund Policy</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/terms" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-purple hover:bg-purple-50/30 transition-colors">
            <span>Terms & Conditions</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/track-order" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 font-semibold border-b border-gray-50 text-brand-purple bg-purple-50/50 hover:bg-purple-50 transition-colors">
            <span>Track Order</span><FiChevronRight size={16} className="text-brand-purple" />
          </Link>
        </div>

      </div>
    </>
  );
}
