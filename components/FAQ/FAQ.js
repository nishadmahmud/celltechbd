"use client";

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function FAQ() {
    const faqs = [
        { 
            question: "What is Pochondo Shop?", 
            answer: "Pochondo Shop is a multi-brand tech hub and retail chain in Bangladesh that sells genuine smartphones, laptops, gadgets, and home appliances from leading global brands." 
        },
        { 
            question: "Do you sell other smartphones besides iPhone?", 
            answer: "Yes, Pochondo Shop sells all top Android phones from brands like Samsung, Xiaomi, OnePlus, Realme, Oppo, Vivo, and more—from budget to flagship level." 
        },
        { 
            question: "Does Pochondo Shop sell original products?", 
            answer: "Yes, Pochondo Shop focuses on genuine, brand-new devices and checks every product to ensure authenticity before delivery." 
        },
        { 
            question: "Can I buy laptops and MacBooks from Pochondo Shop?", 
            answer: "Pochondo Shop is a leading laptop shop and MacBook shop in Bangladesh with models from HP, Dell, Asus, Acer, Lenovo, MSI, and Apple MacBook Air/Pro." 
        },
        { 
            question: "Does Pochondo Shop sell home appliances?", 
            answer: "Yes, through Pochondo Shop outlets and our website, you can buy smart TVs, refrigerators, ACs, ovens, washing machines, and many other home appliances." 
        },
        { 
            question: "Do you offer used or pre-owned devices?", 
            answer: "Pochondo Shop has a dedicated \"Used Device\" section where you can buy pre-owned phones and gadgets that are checked before sale." 
        },
        { 
            question: "Do you offer official brand warranties?", 
            answer: "Most products at Pochondo Shop include official brand warranty or store warranty; warranty type and duration are clearly mentioned on each product page." 
        },
        { 
            question: "Is Pochondo Shop available both online and offline?", 
            answer: "Yes, Pochondo Shop has an online store and multiple physical outlets in locations like Bashundhara City, Jamuna Future Park, Mirpur, and Uttara in Dhaka." 
        }
    ];

    return (
        <section className="bg-white py-16 md:py-24 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* Centered Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                        Frequently Asked Questions (FAQ)
                    </h2>
                </div>

                {/* 2-Column Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq, idx) => (
                        <div 
                            key={idx} 
                            className="bg-white border border-gray-100 rounded-[18px] p-6 md:p-8 hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300"
                        >
                            <h4 className="text-[17px] md:text-lg font-bold text-gray-900 mb-3 md:mb-4 leading-snug">
                                {faq.question}
                            </h4>
                            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                                {faq.answer.split(/(Pochondo Shop|Android phones|laptop shop|MacBook shop in Bangladesh|Used Device|physical outlets)/g).map((part, i) => (
                                    <span key={i} className={
                                        ["Pochondo Shop", "Android phones", "laptop shop", "MacBook shop in Bangladesh", "Used Device", "physical outlets"].includes(part)
                                        ? "text-brand-blue font-semibold"
                                        : ""
                                    }>
                                        {part}
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
