"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { searchProducts, getProductById } from '../../lib/api';

const EMPTY_SLOT = { id: null, name: '', image: '/no-image.svg', price: null, specs: [] };

function normalizeSpecMap(specs = []) {
  const map = new Map();
  specs.forEach((s) => {
    const key = String(s?.name || '').trim();
    if (!key) return;
    map.set(key, s?.description || '-');
  });
  return map;
}

export default function ComparePage() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [left, setLeft] = useState(EMPTY_SLOT);
  const [right, setRight] = useState(EMPTY_SLOT);
  const [error, setError] = useState('');

  const allSpecNames = useMemo(() => {
    const names = new Set();
    left.specs.forEach((s) => names.add(s.name));
    right.specs.forEach((s) => names.add(s.name));
    return Array.from(names);
  }, [left.specs, right.specs]);

  const runSearch = async (e) => {
    e?.preventDefault();
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }

    setSearching(true);
    setError('');

    try {
      const res = await searchProducts(q);
      const payload = res?.data || res;
      const items = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];
      const mapped = items.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.image_path || p.image_path1 || p.image_path2 || '/no-image.svg',
        price: Number(p.retails_price || 0),
      }));
      setResults(mapped.slice(0, 20));
    } catch {
      setError('Failed to search products.');
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const pickProduct = async (side, productId) => {
    setError('');
    try {
      const res = await getProductById(productId);
      const p = res?.data || res;
      if (!p?.id) return;

      const mapped = {
        id: p.id,
        name: p.name,
        image: (Array.isArray(p.images) && p.images[0]) || p.image_path || '/no-image.svg',
        price: Number(p.retails_price || 0),
        specs: Array.isArray(p.specifications) ? p.specifications : [],
      };

      if (side === 'left') setLeft(mapped);
      if (side === 'right') setRight(mapped);
    } catch {
      setError('Failed to load product details for comparison.');
    }
  };

  const leftSpecMap = useMemo(() => normalizeSpecMap(left.specs), [left.specs]);
  const rightSpecMap = useMemo(() => normalizeSpecMap(right.specs), [right.specs]);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-br from-brand-purple/10 via-purple-50 to-white py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Product <span className="text-brand-purple">Compare</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search products and compare key specifications side by side.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-12">
        <form onSubmit={runSearch} className="flex gap-3 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search product for compare..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple"
          />
          <button type="submit" className="bg-brand-purple text-white px-5 py-3 rounded-xl text-sm font-bold hover:opacity-90">
            {searching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        {results.length > 0 && (
          <div className="border border-gray-100 rounded-2xl p-4 md:p-5 mb-8">
            <p className="text-sm font-semibold text-gray-700 mb-3">Search Results</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.map((r) => (
                <div key={r.id} className="flex items-center gap-3 border border-gray-100 rounded-xl p-3">
                  <div className="relative w-14 h-14 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                    <Image src={r.image} alt={r.name} fill className="object-contain" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2">{r.name}</p>
                    <p className="text-xs text-gray-500">ID: {r.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => pickProduct('left', r.id)}
                      type="button"
                      className="text-xs font-bold px-3 py-2 rounded-lg border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                    >
                      Add A
                    </button>
                    <button
                      onClick={() => pickProduct('right', r.id)}
                      type="button"
                      className="text-xs font-bold px-3 py-2 rounded-lg border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                    >
                      Add B
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[{ slot: left, label: 'Product A' }, { slot: right, label: 'Product B' }].map(({ slot, label }) => (
            <div key={label} className="border border-gray-100 rounded-2xl p-5 bg-gray-50/40">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3">{label}</p>
              {slot.id ? (
                <>
                  <div className="relative w-full h-48 bg-white rounded-xl overflow-hidden border border-gray-100 mb-3">
                    <Image src={slot.image} alt={slot.name} fill className="object-contain" unoptimized />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">{slot.name}</h3>
                  <p className="text-brand-purple font-extrabold text-xl">? {slot.price.toLocaleString('en-IN')}</p>
                  <Link href={`/product/${slot.id}`} className="inline-block mt-3 text-xs text-gray-500 hover:text-brand-purple underline">
                    Open product page
                  </Link>
                </>
              ) : (
                <p className="text-sm text-gray-500">No product selected yet.</p>
              )}
            </div>
          ))}
        </div>

        {(left.id && right.id) && (
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 text-sm font-bold text-gray-800">
              <div className="p-3 md:p-4 border-r border-gray-100">Specification</div>
              <div className="p-3 md:p-4 border-r border-gray-100">{left.name}</div>
              <div className="p-3 md:p-4">{right.name}</div>
            </div>
            {allSpecNames.map((name) => (
              <div key={name} className="grid grid-cols-3 text-sm border-t border-gray-100">
                <div className="p-3 md:p-4 font-semibold text-gray-700 border-r border-gray-100">{name}</div>
                <div className="p-3 md:p-4 text-gray-600 border-r border-gray-100">{leftSpecMap.get(name) || '-'}</div>
                <div className="p-3 md:p-4 text-gray-600">{rightSpecMap.get(name) || '-'}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
