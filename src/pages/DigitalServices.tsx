/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, CheckCircle2, MonitorCheck, HelpCircle } from "lucide-react";
import { digitalServices } from "../data";
import { GradientText } from "../components/ui/gradient-text";

interface DigitalServicesProps {
  setCurrentPage: (page: string) => void;
  setSelectedServiceQuote?: (serviceName: string) => void;
}

export default function DigitalServices({ setCurrentPage, setSelectedServiceQuote }: DigitalServicesProps) {
  
  const handleQuoteRedirect = (serviceTitle: string) => {
    if (setSelectedServiceQuote) {
      setSelectedServiceQuote(serviceTitle);
    }
    setCurrentPage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-16 py-12 px-4 sm:px-6 md:px-8 lg:px-10 w-full bg-white text-slate-900 min-h-screen"
      id="digital-services-page"
    >
      {/* Header */}
      <div className="text-center space-y-3 pt-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Digital Creative Services
        </h1>
        <p className="text-sm sm:text-base text-[#7D7D7D] max-w-xl mx-auto font-sans">
          Elevate your digital branding with high-resolution vector assets, premium custom designs, and professional 3D product previews.
        </p>
      </div>

      {/* Grid of Digital Services */}
      <div className="space-y-16 w-full">
        {digitalServices.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 text-left ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
              id={`digital-service-${service.id}`}
            >
              {/* Image side */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 h-[300px] sm:h-[380px]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#15803d] border border-[#15803d]/30 py-1 px-3 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider font-mono shadow-sm">
                    {service.title} Portfolio Example
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="w-full lg:w-1/2 space-y-5">
                <span className="text-[10px] font-bold text-[#15803d] uppercase tracking-wider font-mono">
                  Creative Offering {index + 1}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#15803d] tracking-tight font-display">
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#7D7D7D] font-sans leading-relaxed">
                  {service.description}
                </p>
                
                {/* Bullet details */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold text-[#15803d] uppercase tracking-wider font-mono">
                    What we deliver:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#7D7D7D] font-sans">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call-to-Action button */}
                <div className="pt-4">
                  <button
                    onClick={() => handleQuoteRedirect(service.title)}
                    className="px-6 py-2.5 rounded-lg bg-[#15803d] text-white hover:bg-[#166534] border border-[#15803d] font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center cursor-pointer"
                    id={`quote-service-btn-${service.id}`}
                  >
                    <span>Request Quote for {service.title}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ micro box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center w-full space-y-4 shadow-xl text-white">
        <h3 className="text-xl font-extrabold text-white font-display">How does our Digital Design process work?</h3>
        <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">
          It's simple! You share your design goals with us (colors, text, style preferences) via the contact form or Messenger. Our design artist sketches 2 to 3 concepts, incorporates your changes until you are 100% happy, and then delivers high-resolution vector assets!
        </p>
        <div className="pt-2">
          <button
            onClick={() => handleQuoteRedirect("General Design consultation")}
            className="px-6 py-2.5 rounded-lg bg-[#15803d] text-white hover:bg-[#166534] border border-[#15803d] font-bold text-xs shadow-md cursor-pointer"
          >
            Start a Design Consultation
          </button>
        </div>
      </div>
    </motion.div>
  );
}
