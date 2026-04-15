"use client";

import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck, FiX, FiFilter } from 'react-icons/fi';

function PopoverMenu({ id, isOpen, onToggle, label, isActive, alignRight = false, children }) {
    const popoverRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                onToggle(null);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onToggle]);

    return (
        <div className="relative" ref={popoverRef}>
            <button
                onClick={(e) => { e.preventDefault(); onToggle(isOpen ? null : id); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all border ${
                    isActive 
                        ? 'bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20' 
                        : isOpen 
                            ? 'bg-gray-100 text-gray-800 border-gray-300'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-primary hover:text-brand-primary'
                }`}
            >
                {label}
                <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className={`absolute top-full mt-2 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-4 min-w-[240px] z-50 ${alignRight ? 'right-0' : 'left-0'}`}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default function CategoryTopFilters({
    derivedFilters = { brandsList: [], storageList: [], regionList: [], colorList: [] },
    globalMinPrice = 0,
    globalMaxPrice = 1000000,
    selectedBrands = ['All'],
    setSelectedBrands,
    selectedPrice,
    setSelectedPrice,
    selectedStorage,
    setSelectedStorage,
    selectedRegion,
    setSelectedRegion,
    selectedColor,
    setSelectedColor,
    selectedAvailability,
    setSelectedAvailability
}) {
    const [openPopover, setOpenPopover] = useState(null);

    const handleCheckboxChange = (value, list, setList) => {
        if (list.includes(value)) {
            setList(list.filter(item => item !== value));
        } else {
            setList([...list, value]);
        }
    };

    const handleReset = () => {
        setSelectedBrands(['All']);
        setSelectedPrice({ min: '', max: '' });
        setSelectedStorage([]);
        setSelectedRegion([]);
        setSelectedColor([]);
        setSelectedAvailability('All');
        setOpenPopover(null);
    };

    const countActiveFilters = () => {
        let count = 0;
        if (selectedBrands.length > 0 && selectedBrands[0] !== 'All') count += selectedBrands.length;
        if (selectedPrice.min !== '' || selectedPrice.max !== '') count += 1;
        count += selectedStorage.length;
        count += selectedRegion.length;
        count += selectedColor.length;
        if (selectedAvailability !== 'All') count += 1;
        return count;
    };

    const { brandsList, storageList, regionList, colorList } = derivedFilters;

    return (
        <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 pb-4 mb-2 lg:-mt-1 relative z-30">
            
            {/* Reset Button (only shown if filters are active) */}
            {countActiveFilters() > 0 && (
                <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors flex-shrink-0"
                >
                    <FiX size={14} />
                    Reset
                </button>
            )}

            {/* Brands (if available and not just "All") */}
            {brandsList.length > 1 && (
                <PopoverMenu 
                    id="brand"
                    label={`Brand${selectedBrands[0] !== 'All' ? ` (${selectedBrands[0]})` : ''}`} 
                    isActive={selectedBrands[0] !== 'All'}
                    isOpen={openPopover === 'brand'} 
                    onToggle={setOpenPopover}
                >
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {brandsList.map(brand => (
                            <label key={brand} className="flex items-center gap-3 cursor-pointer group p-1">
                                <input
                                    type="radio"
                                    name="brand"
                                    checked={selectedBrands[0] === brand || (selectedBrands.length === 0 && brand === 'All')}
                                    onChange={() => {
                                        setSelectedBrands([brand]);
                                        setOpenPopover(null);
                                    }}
                                    className="h-4 w-4 border border-gray-300 rounded-full text-brand-primary focus:ring-brand-primary"
                                />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-brand-primary">
                                    {brand === 'All' ? 'All Products' : brand}
                                </span>
                            </label>
                        ))}
                    </div>
                </PopoverMenu>
            )}

            {/* Price */}
            <PopoverMenu 
                id="price"
                label={`Price${selectedPrice.min || selectedPrice.max ? ' (Custom)' : ''}`} 
                isActive={selectedPrice.min !== '' || selectedPrice.max !== ''}
                isOpen={openPopover === 'price'} 
                onToggle={setOpenPopover}
            >
                <div className="w-[280px]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">৳</span>
                            <input
                                type="number"
                                placeholder={globalMinPrice.toString()}
                                value={selectedPrice.min}
                                onChange={(e) => setSelectedPrice({ ...selectedPrice, min: e.target.value })}
                                className="w-full pl-6 pr-2 py-2 text-sm font-medium border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                            />
                        </div>
                        <span className="text-gray-400 font-medium">-</span>
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">৳</span>
                            <input
                                type="number"
                                placeholder={globalMaxPrice.toString()}
                                value={selectedPrice.max}
                                onChange={(e) => setSelectedPrice({ ...selectedPrice, max: e.target.value })}
                                className="w-full pl-6 pr-2 py-2 text-sm font-medium border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                            />
                        </div>
                    </div>
                    <button 
                        onClick={() => setOpenPopover(null)}
                        className="w-full py-2 bg-brand-primary text-white text-sm font-bold rounded-lg hover:brightness-110 transition-all"
                    >
                        Apply Price
                    </button>
                </div>
            </PopoverMenu>

            {/* Storage */}
            {storageList && storageList.length > 0 && (
                <PopoverMenu 
                    id="storage"
                    label={`Storage${selectedStorage.length > 0 ? ` (${selectedStorage.length})` : ''}`} 
                    isActive={selectedStorage.length > 0}
                    isOpen={openPopover === 'storage'} 
                    onToggle={setOpenPopover}
                >
                    <div className="space-y-2 max-h-60 overflow-y-auto min-w-[200px]">
                        {storageList.map(storage => (
                            <label key={storage} className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-gray-50 rounded">
                                <input
                                    type="checkbox"
                                    checked={selectedStorage.includes(storage)}
                                    onChange={() => handleCheckboxChange(storage, selectedStorage, setSelectedStorage)}
                                    className="h-4 w-4 border border-gray-300 rounded text-brand-primary focus:ring-brand-primary"
                                />
                                <span className="text-sm font-medium text-gray-700">{storage}</span>
                            </label>
                        ))}
                    </div>
                </PopoverMenu>
            )}

            {/* Region */}
            {regionList && regionList.length > 0 && (
                <PopoverMenu 
                    id="region"
                    label={`Region${selectedRegion.length > 0 ? ` (${selectedRegion.length})` : ''}`} 
                    isActive={selectedRegion.length > 0}
                    isOpen={openPopover === 'region'} 
                    onToggle={setOpenPopover}
                    alignRight={true}
                >
                    <div className="space-y-2 max-h-60 overflow-y-auto min-w-[200px]">
                        {regionList.map(region => (
                            <label key={region} className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-gray-50 rounded">
                                <input
                                    type="checkbox"
                                    checked={selectedRegion.includes(region)}
                                    onChange={() => handleCheckboxChange(region, selectedRegion, setSelectedRegion)}
                                    className="h-4 w-4 border border-gray-300 rounded text-brand-primary focus:ring-brand-primary"
                                />
                                <span className="text-sm font-medium text-gray-700">{region}</span>
                            </label>
                        ))}
                    </div>
                </PopoverMenu>
            )}

            {/* Colors */}
            {colorList && colorList.length > 0 && (
                <PopoverMenu 
                    id="color"
                    label={`Color${selectedColor.length > 0 ? ` (${selectedColor.length})` : ''}`} 
                    isActive={selectedColor.length > 0}
                    isOpen={openPopover === 'color'} 
                    onToggle={setOpenPopover}
                    alignRight={true}
                >
                    <div className="flex flex-wrap gap-2 w-[220px]">
                        {colorList.map(color => (
                            <button
                                key={color.name}
                                onClick={() => handleCheckboxChange(color.name, selectedColor, setSelectedColor)}
                                className={`w-8 h-8 rounded-full border shadow-sm transition-transform hover:scale-110 relative flex items-center justify-center ${
                                    selectedColor.includes(color.name)
                                    ? 'ring-2 ring-brand-primary ring-offset-2 border-brand-primary scale-110'
                                    : 'border-gray-200'
                                }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            >
                                {color.hex === '#ffffff' || color.hex.toLowerCase() === '#fff' ? (
                                    <span className="absolute inset-0 rounded-full border border-gray-200"></span>
                                ) : null}
                                {selectedColor.includes(color.name) && (
                                    <FiCheck 
                                        size={14} 
                                        className={color.hex === '#ffffff' || color.hex.toLowerCase() === '#fff' ? 'text-gray-800' : 'text-white'} 
                                        style={{ mixBlendMode: 'difference' }} 
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </PopoverMenu>
            )}

            {/* Availability */}
            <PopoverMenu 
                id="availability"
                label={`Availability${selectedAvailability !== 'All' ? ' (In Stock)' : ''}`} 
                isActive={selectedAvailability !== 'All'}
                isOpen={openPopover === 'availability'} 
                onToggle={setOpenPopover}
                alignRight={true}
            >
                <div className="space-y-2 min-w-[180px]">
                    <label className="flex items-center gap-3 cursor-pointer group p-1">
                        <input
                            type="radio"
                            name="availability"
                            checked={selectedAvailability === 'All'}
                            onChange={() => { setSelectedAvailability('All'); setOpenPopover(null); }}
                            className="h-4 w-4 border border-gray-300 rounded-full text-brand-primary focus:ring-brand-primary"
                        />
                        <span className="text-sm font-medium text-gray-700">All Items</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group p-1">
                        <input
                            type="radio"
                            name="availability"
                            checked={selectedAvailability === 'In Stock'}
                            onChange={() => { setSelectedAvailability('In Stock'); setOpenPopover(null); }}
                            className="h-4 w-4 border border-gray-300 rounded-full text-brand-primary focus:ring-brand-primary"
                        />
                        <span className="text-sm font-medium text-gray-700">In Stock Only</span>
                    </label>
                </div>
            </PopoverMenu>

        </div>
    );
}
