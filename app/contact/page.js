export const metadata = {
    title: 'Contact Us | Cell Tech BD',
    description: 'Get in touch with Cell Tech BD for product help, order support, and outlet information.',
};

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SITE_INFO } from '../../lib/siteInfo';

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen">
            <div className="bg-gradient-to-br from-brand-purple/10 via-purple-50 to-white py-16 md:py-24">
                <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Contact <span className="text-brand-purple">Cell Tech BD</span></h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Reach us by phone, WhatsApp, or email. You can also visit any of our outlets listed below.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: 'Phone', value: SITE_INFO.callDisplay, icon: <Phone className="w-6 h-6" /> },
                        { label: 'WhatsApp', value: SITE_INFO.whatsappDisplay, icon: <Phone className="w-6 h-6" /> },
                        { label: 'Email', value: SITE_INFO.email, icon: <Mail className="w-6 h-6" /> },
                        { label: 'Working Hours', value: 'Open daily (please call before visiting)', icon: <Clock className="w-6 h-6" /> },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="text-brand-purple bg-purple-100/50 p-2.5 rounded-lg border border-purple-100 flex-shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                                <p className="font-semibold text-gray-800">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-5">Outlet Locations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {SITE_INFO.outlets.map((outlet) => (
                            <div key={outlet.name} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-brand-purple mt-0.5" />
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{outlet.name}</h3>
                                        {outlet.details.map((line) => (
                                            <p key={line} className="text-gray-600 mt-1">{line}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
