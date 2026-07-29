/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Facebook, Send, CheckCircle, MessageSquare, Clock, ShieldCheck } from "lucide-react";
import { GradientText } from "../components/ui/gradient-text";
import { printingCategories, digitalServices } from "../data";

interface ContactProps {
  selectedServiceQuote?: string;
  setSelectedServiceQuote?: (serviceName: string) => void;
}

export default function Contact({ selectedServiceQuote = "", setSelectedServiceQuote }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: selectedServiceQuote || "tarpaulin",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync state if selectedServiceQuote updates
  useEffect(() => {
    if (selectedServiceQuote) {
      setFormData(prev => ({ ...prev, service: selectedServiceQuote }));
    }
  }, [selectedServiceQuote]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate real-world database or API form processing cleanly
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "tarpaulin",
        message: ""
      });
      if (setSelectedServiceQuote) {
        setSelectedServiceQuote(""); // Reset chosen prefilled service
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-12 py-12 px-4 sm:px-6 md:px-8 lg:px-10 w-full bg-white text-slate-900 min-h-screen"
      id="contact-page"
    >
      {/* Header */}
      <div className="text-center space-y-3 pt-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12941F] tracking-tight">
          Contact PrintMagic
        </h1>
        <p className="text-sm sm:text-base text-[#7D7D7D] max-w-xl mx-auto font-sans">
          Need a price quotation or looking to design custom branding assets? Send us your project details below and our team will reply immediately!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
        
        {/* Left Side: Coordinates & Maps */}
        <div className="lg:col-span-5 space-y-8 text-left">
          
          {/* Quick contact buttons block */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 font-display border-b border-slate-200 pb-3">
              Business Coordinates
            </h3>
            
            <ul className="space-y-5 text-sm text-slate-700 font-sans">
              <li>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">Mobile Hotline</span>
                  <span className="font-semibold text-slate-900">0926 022 6003</span>
                </div>
              </li>

              <li>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">Email Address</span>
                  <a href="mailto:printmagiconline.service@gmail.com" className="font-semibold text-slate-900 hover:text-emerald-700 break-all">
                    printmagiconline.service@gmail.com
                  </a>
                </div>
              </li>

              <li>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">Storefront Location</span>
                  <span className="font-medium text-slate-700 leading-relaxed">
                    Libjo, New San Vicente,<br />
                    Batangas City, Philippines 4200
                  </span>
                </div>
              </li>

              <li>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">Store Hours</span>
                  <span className="font-semibold text-slate-900 block">Mon - Sun: 8:00 AM - 7:30 PM</span>
                </div>
              </li>
            </ul>

            <div className="pt-2 border-t border-slate-200">
              <a
                href="https://www.facebook.com/Printmagic29"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-[#1877F2] text-white font-bold text-sm shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer border border-blue-500/40"
                id="contact-messenger-btn"
              >
                <span>Message us on Messenger</span>
              </a>
            </div>
          </div>

          {/* Clean Google Maps Embed */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-64 sm:h-72 bg-slate-100 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15494.398918236208!2d121.056024!3d13.7564661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd0540cdfa89eb%3A0xe5a3634b3be1df49!2sLibjo%2C%20Batangas%2C%20Philippines!5e0!3m2!1sen!2sus!4v1720542000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PrintMagic Location Map"
              id="location-map"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>

        </div>

        {/* Right Side: Contact / Quote Form */}
        <div className="lg:col-span-7">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm text-left space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-display">
                Request a Custom Quote
              </h3>
              <p className="text-xs text-[#7D7D7D] font-sans mt-1">
                Fill out this form and receive a customized pricing quote with layout choices.
              </p>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 shadow-sm"
                id="contact-success-box"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xl font-bold shadow-sm">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-display">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-700 font-sans max-w-sm mx-auto leading-relaxed font-semibold">
                  Maraming salamat! Your request has been sent to our PrintMagic queue. Our customer support officer will call or email you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2 bg-[#0a5210] hover:bg-[#07360b] text-white rounded-lg font-bold text-xs shadow-md hover:opacity-95 transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm" id="quote-request-form">
                
                {/* Name */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name" className="block font-bold text-slate-800 font-display">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your first and last name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-[#12941F] focus:ring-1 focus:ring-[#12941F] focus:outline-none placeholder-slate-400 font-sans text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="email" className="block font-bold text-slate-800 font-display">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-[#12941F] focus:ring-1 focus:ring-[#12941F] focus:outline-none placeholder-slate-400 font-sans text-xs sm:text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="phone" className="block font-bold text-slate-800 font-display">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 0912 345 6789"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-[#12941F] focus:ring-1 focus:ring-[#12941F] focus:outline-none placeholder-slate-400 font-sans text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {/* Preferred Service */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="service" className="block font-bold text-slate-800 font-display">
                    Interested Service / Item <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-[#12941F] focus:ring-1 focus:ring-[#12941F] focus:outline-none font-sans text-xs sm:text-sm cursor-pointer"
                  >
                    {printingCategories.map((cat) => (
                      <optgroup key={cat.id} label={cat.title} className="bg-white text-slate-900">
                        {cat.items.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <optgroup label="Digital & Creative Services" className="bg-white text-slate-900">
                      {digitalServices.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Other / Custom Request" className="bg-white text-slate-900">
                      <option value="custom-other">Other Custom Printing / Design Project</option>
                    </optgroup>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="message" className="block font-bold text-slate-800 font-display">
                    Project Requirements / Dimensions <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter sizes (e.g. 3ft x 2ft), quantity, design preferences, or deadlines..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-[#12941F] focus:ring-1 focus:ring-[#12941F] focus:outline-none placeholder-slate-400 font-sans text-xs sm:text-sm"
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#CBD5D1]">
                    <span>Your data is handled securely.</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-lg bg-[#0a5210] hover:bg-[#07360b] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer disabled:bg-emerald-900"
                    id="submit-quote-btn"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Request"}</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
