"use client";

import { useState, useMemo, useEffect } from 'react';
import { FiShare2, FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { BANK_EMI_DATA } from '../../lib/bankEmiData';

const EMI_MONTHS = [3, 6, 9, 12, 18, 24, 36];

export default function ProductInfo({ product, onVariantImageChange, onPricingChange, selectedCarePlans = [] }) {
    const { addToCart } = useCart();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [selectedPricing, setSelectedPricing] = useState('offer');
    const [showEmiModal, setShowEmiModal] = useState(false);

    const imeis = useMemo(() => product.rawImeis || [], [product.rawImeis]);
    const hasVariants = imeis.length > 0;

    const allColors = useMemo(() => {
        const colorMap = new Map();
        imeis.forEach((i) => {
            if (i.color && !colorMap.has(i.color)) {
                colorMap.set(i.color, { name: i.color, hex: i.color_code || '#e5e7eb' });
            }
        });
        return Array.from(colorMap.values());
    }, [imeis]);

    const allStorages = useMemo(() => [...new Set(imeis.map((i) => i.storage).filter(Boolean))], [imeis]);
    const allRegions = useMemo(() => [...new Set(imeis.map((i) => i.region).filter(Boolean))], [imeis]);

    const [selectedColor, setSelectedColor] = useState(allColors[0]?.name || null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);

    useEffect(() => {
        if (!hasVariants) return;

        const matchingImeis = imeis.filter((i) => !selectedColor || i.color === selectedColor);
        const availableStorages = [...new Set(matchingImeis.map((i) => i.storage).filter(Boolean))];

        if (availableStorages.length > 0) {
            if (!selectedStorage || !availableStorages.includes(selectedStorage)) {
                setSelectedStorage(availableStorages[0]);
            }
        } else {
            setSelectedStorage(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedColor]);

    useEffect(() => {
        if (!hasVariants) return;

        const matchingImeis = imeis.filter((i) => {
            let match = true;
            if (selectedColor && i.color) match = match && i.color === selectedColor;
            if (selectedStorage && i.storage) match = match && i.storage === selectedStorage;
            return match;
        });

        const availableRegions = [...new Set(matchingImeis.map((i) => i.region).filter(Boolean))];

        if (availableRegions.length > 0) {
            if (!selectedRegion || !availableRegions.includes(selectedRegion)) {
                setSelectedRegion(availableRegions[0]);
            }
        } else {
            setSelectedRegion(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedColor, selectedStorage]);

    const availableStorages = useMemo(() => {
        const matchingImeis = imeis.filter((i) => !selectedColor || i.color === selectedColor);
        return [...new Set(matchingImeis.map((i) => i.storage).filter(Boolean))];
    }, [imeis, selectedColor]);

    const availableRegions = useMemo(() => {
        const matchingImeis = imeis.filter((i) => {
            let match = true;
            if (selectedColor && i.color) match = match && i.color === selectedColor;
            if (selectedStorage && i.storage) match = match && i.storage === selectedStorage;
            return match;
        });
        return [...new Set(matchingImeis.map((i) => i.region).filter(Boolean))];
    }, [imeis, selectedColor, selectedStorage]);

    const matchedImei = useMemo(() => {
        if (!hasVariants) return null;

        let match = imeis.find(
            (i) =>
                (!selectedColor || i.color === selectedColor) &&
                (!selectedStorage || i.storage === selectedStorage) &&
                (!selectedRegion || i.region === selectedRegion)
        );

        if (!match) {
            match = imeis.find(
                (i) => (!selectedColor || i.color === selectedColor) && (!selectedStorage || i.storage === selectedStorage)
            );
        }

        if (!match) {
            match = imeis.find((i) => !selectedColor || i.color === selectedColor);
        }

        return match;
    }, [imeis, selectedColor, selectedStorage, selectedRegion, hasVariants]);

    const selectedBasePrice = useMemo(() => {
        if (matchedImei && matchedImei.sale_price) {
            return Number(matchedImei.sale_price);
        }
        return Number(product.originalPrice || product.rawPrice || 0);
    }, [matchedImei, product.originalPrice, product.rawPrice]);

    const discountValue = Number(product.discountValue || 0);
    const discountType = String(product.discountType || '').toLowerCase();
    const hasDiscount = Boolean(product.hasDiscount && discountValue > 0);
    const defaultEmiBank = useMemo(() => BANK_EMI_DATA.find((bank) => bank.m6 != null) || BANK_EMI_DATA[0], []);
    const [selectedEmiBankName, setSelectedEmiBankName] = useState(defaultEmiBank?.bank || '');
    const [selectedEmiMonths, setSelectedEmiMonths] = useState(6);

    useEffect(() => {
        if (!hasDiscount && selectedPricing !== 'regular') {
            setSelectedPricing('regular');
        }
    }, [hasDiscount, selectedPricing]);

    const discountedPrice = useMemo(() => {
        if (!hasDiscount) return selectedBasePrice;
        if (discountType === 'percentage') {
            return Math.max(0, Math.round(selectedBasePrice * (1 - discountValue / 100)));
        }
        return Math.max(0, selectedBasePrice - discountValue);
    }, [selectedBasePrice, hasDiscount, discountType, discountValue]);

    const displayDiscount = useMemo(() => {
        if (!hasDiscount) return null;
        if (discountType === 'percentage') return `-${discountValue}%`;
        return `Tk ${discountValue.toLocaleString('en-IN')}`;
    }, [hasDiscount, discountType, discountValue]);

    const selectedEmiBank = useMemo(() => {
        return BANK_EMI_DATA.find((bank) => bank.bank === selectedEmiBankName) || defaultEmiBank;
    }, [selectedEmiBankName, defaultEmiBank]);

    const selectedEmiRate = useMemo(() => {
        if (!selectedEmiBank) return 0;
        return Number(selectedEmiBank[`m${selectedEmiMonths}`] || 0);
    }, [selectedEmiBank, selectedEmiMonths]);

    useEffect(() => {
        if (!selectedEmiBank) return;
        if (selectedEmiBank[`m${selectedEmiMonths}`] != null) return;
        const fallbackMonth = EMI_MONTHS.find((m) => selectedEmiBank[`m${m}`] != null) || 6;
        setSelectedEmiMonths(fallbackMonth);
    }, [selectedEmiBank, selectedEmiMonths]);

    const offerPrice = discountedPrice;
    const regularPrice = Math.round(selectedBasePrice * (1 + selectedEmiRate / 100));
    const usingOfferPrice = hasDiscount && selectedPricing === 'offer';
    const selectedUnitPrice = usingOfferPrice ? offerPrice : regularPrice;
    const selectedDisplayPrice = `Tk ${selectedUnitPrice.toLocaleString('en-IN')}`;
    const selectedOldPrice = usingOfferPrice ? `Tk ${selectedBasePrice.toLocaleString('en-IN')}` : null;

    const selectedBankPlans = useMemo(() => {
        if (!selectedEmiBank) return [];
        return EMI_MONTHS
            .map((months) => {
                const rate = selectedEmiBank[`m${months}`];
                if (rate == null) return null;
                const total = Math.round(selectedBasePrice * (1 + rate / 100));
                const monthly = Math.round(total / months);
                return { months, rate: Number(rate), total, monthly };
            })
            .filter(Boolean);
    }, [selectedEmiBank, selectedBasePrice]);

    useEffect(() => {
        if (!onPricingChange) return;
        const emiStartFrom = selectedBankPlans.length > 0
            ? Math.min(...selectedBankPlans.map((p) => p.monthly))
            : Math.round(regularPrice / Math.max(selectedEmiMonths, 1));
        onPricingChange({
            selectedPrice: selectedUnitPrice,
            offerPrice,
            regularPrice,
            hasDiscount,
            usingOfferPrice,
            emiStartFrom
        });
    }, [onPricingChange, selectedUnitPrice, offerPrice, regularPrice, hasDiscount, usingOfferPrice, selectedBankPlans, selectedEmiMonths]);

    useEffect(() => {
        if (!onVariantImageChange || !hasVariants) return;

        if (selectedColor) {
            const colorImeis = imeis.filter((i) => i.color === selectedColor && i.image_path);
            const uniqueImages = [...new Set(colorImeis.map((i) => i.image_path))];

            if (uniqueImages.length > 0) {
                onVariantImageChange(uniqueImages);
            } else {
                onVariantImageChange(null);
            }
        } else {
            onVariantImageChange(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedColor]);

    const handleShare = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard');
        }
    };

    const handleAddToCart = (openSidebar = true) => {
        const variants = {};
        if (selectedStorage) variants.storage = selectedStorage;
        if (selectedColor) variants.colors = { name: selectedColor };
        if (selectedRegion) variants.region = selectedRegion;
        variants.priceOption = usingOfferPrice ? 'offer' : 'regular';
        variants.customBasePrice = selectedUnitPrice;

        if (selectedCarePlans.length > 0) {
            variants.carePlans = selectedCarePlans.map((plan) => ({
                id: plan.id,
                name: plan.name,
                price: Number(plan.price || 0)
            }));
        }

        addToCart(product, quantity, Object.keys(variants).length > 0 ? variants : null, openSidebar);
    };

    const handleBuyNow = () => {
        handleAddToCart(false);
        router.push('/checkout');
    };

    const handlePricingCardKeyDown = (e, mode) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (mode === 'offer') {
                if (hasDiscount) setSelectedPricing('offer');
                return;
            }
            setSelectedPricing('regular');
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="bg-brand-purple/10 text-brand-purple text-xs font-bold px-2.5 py-1 rounded-md inline-block mb-3">
                        In Stock
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
                </div>

                <button
                    onClick={handleShare}
                    className="p-2 text-gray-400 hover:text-brand-purple hover:bg-brand-purple/10 rounded-full transition-colors cursor-pointer"
                    title="Share product"
                >
                    <FiShare2 size={20} />
                </button>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-100">
                <p className="text-4xl md:text-5xl font-extrabold text-gray-900">{selectedDisplayPrice}</p>
                <div className="flex items-center gap-3 mt-2">
                    {selectedOldPrice && (
                        <span className="text-sm text-gray-400 line-through font-medium">{selectedOldPrice}</span>
                    )}
                    {usingOfferPrice && displayDiscount && (
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">{displayDiscount}</span>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Price includes VAT</p>
            </div>

            {hasVariants && (
                <div className="space-y-6 mb-8">
                    {allColors.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3">
                                Color: <span className="font-medium text-brand-purple">{selectedColor || ''}</span>
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {allColors.map((color) => {
                                    const isSelected = selectedColor === color.name;
                                    const isWhite = color.hex?.toLowerCase() === '#ffffff' || color.hex?.toLowerCase() === '#fff';
                                    return (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`cursor-pointer flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'border-brand-purple bg-brand-purple/5 shadow-md shadow-brand-purple/10' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
                                            title={color.name}
                                        >
                                            <span
                                                className={`w-5 h-5 rounded-full shadow-inner ${isWhite ? 'border border-gray-300' : ''}`}
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            <span className={`text-sm font-medium ${isSelected ? 'text-brand-purple' : 'text-gray-600'}`}>
                                                {color.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {allStorages.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3">
                                Storage: <span className="font-medium text-brand-purple">{selectedStorage || ''}</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {allStorages.map((size) => {
                                    const isAvailable = availableStorages.includes(size);
                                    const isSelected = selectedStorage === size;
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => isAvailable && setSelectedStorage(size)}
                                            disabled={!isAvailable}
                                            className={`cursor-pointer px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${isSelected ? 'border-brand-purple bg-brand-purple text-white shadow-md shadow-brand-purple/20' : isAvailable ? 'border-gray-200 text-gray-600 hover:border-brand-purple/50 hover:shadow-sm' : 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50 line-through'}`}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {allRegions.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3">
                                Region: <span className="font-medium text-brand-purple">{selectedRegion || ''}</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {allRegions.map((region) => {
                                    const isAvailable = availableRegions.includes(region);
                                    const isSelected = selectedRegion === region;
                                    return (
                                        <button
                                            key={region}
                                            onClick={() => isAvailable && setSelectedRegion(region)}
                                            disabled={!isAvailable}
                                            className={`cursor-pointer px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${isSelected ? 'border-brand-purple text-brand-purple bg-brand-purple/5 shadow-md shadow-brand-purple/10' : isAvailable ? 'border-gray-200 text-gray-600 hover:border-brand-purple/50 hover:shadow-sm' : 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50 line-through'}`}
                                        >
                                            {region}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                    role="button"
                    tabIndex={hasDiscount ? 0 : -1}
                    onClick={() => hasDiscount && setSelectedPricing('offer')}
                    onKeyDown={(e) => handlePricingCardKeyDown(e, 'offer')}
                    className={`text-left border-2 rounded-2xl p-4 md:p-5 min-h-[156px] flex flex-col justify-between transition-all ${usingOfferPrice ? 'border-brand-purple bg-gradient-to-br from-brand-purple/[0.10] to-brand-purple/[0.03] shadow-md shadow-brand-purple/10' : 'border-gray-200 bg-white'} ${!hasDiscount ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer hover:border-brand-purple/50 hover:shadow-sm'}`}
                >
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.08em]">Offer Price</p>
                    <p className="mt-3 text-[2rem] md:text-[2.3rem] leading-[1.05] font-black text-brand-purple break-words">{`Tk ${offerPrice.toLocaleString('en-IN')}`}</p>
                    <p className="mt-3 text-[13px] text-gray-600 leading-tight font-medium">Cash/Card/MFS Payment</p>
                </div>

                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedPricing('regular')}
                    onKeyDown={(e) => handlePricingCardKeyDown(e, 'regular')}
                    className={`text-left border-2 rounded-2xl p-4 md:p-5 min-h-[156px] flex flex-col justify-between transition-all ${!usingOfferPrice ? 'border-brand-blue bg-gradient-to-br from-brand-blue/[0.12] to-brand-blue/[0.03] shadow-md shadow-brand-blue/10' : 'border-gray-200 bg-white'} cursor-pointer hover:border-brand-blue/50 hover:shadow-sm`}
                >
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.08em]">Regular Price</p>
                    <p className="mt-2 text-[2rem] md:text-[2.3rem] leading-[1.05] font-black text-gray-900 break-words">{`Tk ${regularPrice.toLocaleString('en-IN')}`}</p>
                    <p className="mt-2 text-[11px] text-gray-600 leading-none font-medium whitespace-nowrap overflow-hidden text-ellipsis">{`EMI total (${selectedEmiMonths} months, ${selectedEmiBank?.bank || 'Bank'})`}</p>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPricing('regular');
                            setShowEmiModal(true);
                        }}
                        className="mt-2 cursor-pointer text-[12px] font-bold text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/15 px-3 py-1.5 rounded-full self-start transition-colors"
                    >
                        Choose EMI Options
                    </button>
                </div>
            </div>

            {showEmiModal && (
                <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
                    <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden h-[78vh]">
                        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-black text-gray-900">EMI Options</h3>
                            <button onClick={() => setShowEmiModal(false)} className="p-2 rounded-md hover:bg-gray-100 text-gray-500">
                                <FiX size={18} />
                            </button>
                        </div>

                        <div className="p-3 h-[calc(78vh-56px)] overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-3 items-stretch h-full">
                                <div className="hidden md:flex border border-gray-200 rounded-xl overflow-hidden bg-gray-50/40 h-full flex-col min-h-0">
                                    <div className="px-3 py-2.5 border-b border-gray-200 bg-gray-100">
                                        <p className="text-xs font-extrabold tracking-wide text-gray-700">BANK NAME</p>
                                    </div>
                                    <div className="flex-1 min-h-0 overflow-y-auto">
                                        {BANK_EMI_DATA.map((bank) => {
                                            const active = selectedEmiBank?.bank === bank.bank;
                                            return (
                                                <button
                                                    key={bank.bank}
                                                    type="button"
                                                    onClick={() => setSelectedEmiBankName(bank.bank)}
                                                    className={`w-full text-left px-3 py-2.5 border-b border-gray-200 flex items-center gap-2.5 transition-colors ${active ? 'bg-brand-purple/10' : 'hover:bg-gray-100'}`}
                                                >
                                                    {bank.logo ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={bank.logo} alt={bank.bank} className="w-7 h-7 rounded-full object-contain border border-gray-200 bg-white" />
                                                    ) : (
                                                        <span className="w-7 h-7 rounded-full bg-gray-200 text-[10px] flex items-center justify-center">{bank.initial || '?'}</span>
                                                    )}
                                                    <span className="text-sm font-semibold text-gray-700">{bank.bank}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-4 h-full overflow-y-auto pr-1">
                                    <div className="md:hidden">
                                        <p className="text-xs font-extrabold tracking-wide text-gray-700 mb-2">BANK NAME</p>
                                        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                                            {BANK_EMI_DATA.map((bank) => {
                                                const active = selectedEmiBank?.bank === bank.bank;
                                                return (
                                                    <button
                                                        key={bank.bank}
                                                        type="button"
                                                        onClick={() => setSelectedEmiBankName(bank.bank)}
                                                        className={`shrink-0 px-3 py-2 rounded-lg border text-sm font-semibold flex items-center gap-2 ${active ? 'border-brand-purple bg-brand-purple/10 text-brand-purple' : 'border-gray-200 text-gray-700 bg-white'}`}
                                                    >
                                                        {bank.logo ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img src={bank.logo} alt={bank.bank} className="w-5 h-5 rounded-full object-contain border border-gray-200 bg-white" />
                                                        ) : (
                                                            <span className="w-5 h-5 rounded-full bg-gray-200 text-[10px] flex items-center justify-center">{bank.initial || '?'}</span>
                                                        )}
                                                        <span className="whitespace-nowrap">{bank.bank}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Amount</p>
                                        <div className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-2xl font-black text-brand-purple bg-gray-50">
                                            {`Tk ${selectedBasePrice.toLocaleString('en-IN')}`}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {EMI_MONTHS.map((month) => {
                                            const available = selectedEmiBank?.[`m${month}`] != null;
                                            return (
                                                <button
                                                    key={month}
                                                    type="button"
                                                    disabled={!available}
                                                    onClick={() => available && setSelectedEmiMonths(month)}
                                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${selectedEmiMonths === month ? 'border-brand-purple bg-brand-purple/10 text-brand-purple' : 'border-gray-200 text-gray-600'} ${!available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                                                >
                                                    {month}M
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="grid grid-cols-3 bg-gray-100 border-b border-gray-200">
                                            <div className="px-3 py-2.5 text-base font-semibold text-gray-600">Plan</div>
                                            <div className="px-3 py-2.5 text-base font-semibold text-gray-600">EMI</div>
                                            <div className="px-3 py-2.5 text-base font-semibold text-gray-600 text-right">Total</div>
                                        </div>
                                        {selectedBankPlans.map((plan) => (
                                            <button
                                                key={plan.months}
                                                type="button"
                                                onClick={() => setSelectedEmiMonths(plan.months)}
                                                className={`w-full text-left grid grid-cols-3 border-b border-gray-100 last:border-b-0 ${selectedEmiMonths === plan.months ? 'bg-brand-purple/5' : ''}`}
                                            >
                                                <div className="px-3 py-2.5 text-xl font-bold text-gray-800">{plan.months}</div>
                                                <div className="px-3 py-2.5">
                                                    <p className="text-xl font-black text-gray-800">BDT {plan.monthly.toLocaleString('en-IN')}</p>
                                                    <p className="text-xs text-gray-500">(Charge {plan.rate}%)</p>
                                                </div>
                                                <div className="px-3 py-2.5 text-right text-xl font-black text-brand-purple">
                                                    {plan.total.toLocaleString('en-IN')}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-row items-stretch gap-2 mt-1">
                <div className="flex items-center justify-between border-2 border-gray-200 rounded-lg py-1 px-1 w-[100px] shrink-0 bg-white">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="cursor-pointer w-8 h-8 flex items-center justify-center text-gray-500 hover:text-brand-purple hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <FiMinus size={14} />
                    </button>
                    <span className="font-bold text-gray-900 w-6 text-center text-sm">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="cursor-pointer w-8 h-8 flex items-center justify-center text-gray-500 hover:text-brand-purple hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <FiPlus size={14} />
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="cursor-pointer flex-1 bg-white border-2 border-brand-purple text-brand-purple font-bold py-3 px-2 rounded-lg hover:bg-brand-purple hover:text-white transition-colors text-sm whitespace-nowrap"
                >
                    Add to Cart
                </button>

                <button
                    onClick={handleBuyNow}
                    className="cursor-pointer flex-[1.5] bg-brand-purple text-white font-bold py-3 px-2 rounded-lg hover:opacity-90 shadow-lg shadow-brand-purple/30 transition-all text-sm whitespace-nowrap"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}



