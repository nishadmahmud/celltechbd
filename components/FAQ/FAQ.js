"use client";

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function FAQ() {
    const faqs = [
        { 
            question: "What is Cell Tech BD?", 
            answer: "Cell Tech BD is a multi-brand tech hub and retail chain in Bangladesh that sells genuine smartphones, laptops, gadgets, and home appliances from leading global brands." 
        },
        { 
            question: "Do you sell other smartphones besides iPhone?", 
            answer: "Yes, Cell Tech BD sells all top Android phones from brands like Samsung, Xiaomi, OnePlus, Realme, Oppo, Vivo, and more—from budget to flagship level." 
        },
        { 
            question: "Does Cell Tech BD sell original products?", 
            answer: "Yes, Cell Tech BD focuses on genuine, brand-new devices and checks every product to ensure authenticity before delivery." 
        },
        { 
            question: "Can I buy laptops and MacBooks from Cell Tech BD?", 
            answer: "Cell Tech BD is a leading laptop shop and MacBook shop in Bangladesh with models from HP, Dell, Asus, Acer, Lenovo, MSI, and Apple MacBook Air/Pro." 
        },
        { 
            question: "Does Cell Tech BD sell home appliances?", 
            answer: "Yes, through Cell Tech BD outlets and our website, you can buy smart TVs, refrigerators, ACs, ovens, washing machines, and many other home appliances." 
        },
        { 
            question: "Do you offer used or pre-owned devices?", 
            answer: "Cell Tech BD has a dedicated \"Used Device\" section where you can buy pre-owned phones and gadgets that are checked before sale." 
        },
        { 
            question: "Do you offer official brand warranties?", 
            answer: "Most products at Cell Tech BD include official brand warranty or store warranty; warranty type and duration are clearly mentioned on each product page." 
        },
        { 
            question: "Is Cell Tech BD available both online and offline?", 
            answer: "Yes, Cell Tech BD has an online store and multiple physical outlets in locations like Bashundhara City, Jamuna Future Park, Mirpur, and Uttara in Dhaka." 
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="bg-white py-12 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-xl md:text-[28px] font-extrabold tracking-tight mb-2">
                        <span className="text-gray-800">Frequently Asked </span>
                        <span className="text-brand-primary">Questions</span>
                    </h2>
                    <p className="text-sm text-gray-500">Find answers to common questions about Cell Tech BD</p>
                </div>

                <div className="max-w-4xl mx-auto flex flex-col gap-3">
                    {faqs.map((faq, idx) => (
                        <div 
                            key={idx} 
                            className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'border-brand-primary/30 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            <button
                                onClick={() => toggle(idx)}
                                className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                            >
                                <h4 className="text-sm md:text-base font-bold text-gray-900 pr-4 leading-snug">
                                    {faq.question}
                                </h4>
                                <FiChevronDown 
                                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-brand-primary' : ''}`} 
                                />
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-4 md:px-5 pb-4 md:pb-5">
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {faq.answer.split(/(Cell Tech BD)/g).map((part, i) => (
                                            <span key={i} className={
                                                part === "Cell Tech BD"
                                                ? "text-brand-primary font-semibold"
                                                : ""
                                            }>
                                                {part}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
