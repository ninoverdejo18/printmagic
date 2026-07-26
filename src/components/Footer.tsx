/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Mail, Phone, MapPin, Facebook, Clock, ArrowUpRight } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    { name: "Tarpaulin Printing", page: "tarpaulin-printing", hash: "/#services/tarpaulin-printing" },
    { name: "Layout & Graphic Design", page: "layout-design", hash: "/#services/layout-graphic-design" },
    { name: "Souvenirs & Giveaways", page: "souvenirs-giveaways", hash: "/#services/souvenirs-giveaways" },
    { name: "Business Cards", page: "business-cards", hash: "/#services/business-cards" },
    { name: "T-Shirt Printing", page: "tshirt-printing", hash: "/#services/t-shirt-printing" },
    { name: "PVC ID & ID Lace", page: "pvc-id-lace", hash: "/#services/pvc-id-id-lace" },
    { name: "ID Application Links", page: "id-application-links", hash: "/#services/id-application-links", isSubitem: true },
    { name: "Nameplates & Signage", page: "nameplates", hash: "/#services/nameplates-signage" },
    { name: "Custom Stickers & Decals", page: "stickers", hash: "/#services/custom-stickers-decals" }
  ];

  return (
    <footer className="bg-[#0B1F18] border-t border-[#28473B]/50 pt-12 md:pt-8 pb-8 md:pb-6 text-[#F8FAFC]" id="main-footer">
      
      {/* MOBILE VIEW (md:hidden) */}
      <div className="md:hidden max-w-4xl mx-auto px-4">
        
        {/* Centered Top Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img 
            src="/main-logo1.png" 
            alt="PrintMagic Logo" 
            className="w-16 h-16 rounded-full object-cover border-2 border-[#12941F]/40 shadow-lg mb-3" 
            referrerPolicy="no-referrer" 
          />
          <h2 className="text-2xl font-extrabold tracking-tight text-white font-display">
            Print<span className="text-[#12941F]">Magic</span>
          </h2>
          <p className="text-xs text-slate-200 max-w-xs text-center mt-3 leading-relaxed font-sans">
            Delivering high-quality, professional printing and custom creative layouts to the local Batangas City community.
          </p>
          <a
            href="https://www.facebook.com/Printmagic29"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#12941F] flex items-center justify-center text-white hover:text-[#12941F] transition-colors mt-5"
            aria-label="Facebook Page"
            id="mobile-footer-facebook-link"
          >
            <Facebook className="w-4 h-4" />
          </a>
        </div>

        {/* 2-Column Main Section with Vertical Divider */}
        <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/10">
          
          {/* Left Column: OUR SERVICES */}
          <div className="pr-2 border-r border-white/15">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              OUR SERVICES
            </h3>
            <ul className="space-y-3 text-xs font-sans">
              {services.map((service) => (
                <li key={service.page} className={service.isSubitem ? "pl-3 text-[11px]" : ""}>
                  <a
                    href={service.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(service.hash);
                    }}
                    className="text-slate-200 hover:text-[#12941F] transition-colors font-normal text-left focus:outline-none cursor-pointer leading-snug flex items-center gap-1"
                  >
                    {service.isSubitem && <span className="text-[#12941F] font-bold">›</span>}
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: OPERATING HOURS & CONTACT INFORMATION */}
          <div className="pl-2 space-y-6">
            
            {/* Operating Hours */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-display">
                OPERATING HOURS
              </h3>
              <div className="flex items-start gap-2 text-xs font-sans">
                <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="font-normal text-white">Monday - Sunday</p>
                  <p className="text-slate-300 mt-0.5 text-[11px]">8:00 AM - 7:30 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-display">
                CONTACT INFORMATION
              </h3>
              <ul className="space-y-3 text-xs font-sans">
                <li className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-slate-200 font-normal text-[11px]">0926 022 6003</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-white" />
                  </div>
                  <a href="mailto:printmagic_online@yahoo.com" className="text-slate-200 hover:text-[#12941F] break-all font-normal text-[10px]">
                    printmagic_online@yahoo.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-slate-200 leading-relaxed font-normal text-[11px]">
                    Libjo, New San Vicente,<br />
                    Batangas City, Philippines 4200
                  </span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Mobile Copyright */}
        <div className="mt-8 pt-6 -mx-4 sm:-mx-6 px-4 sm:px-6 border-t border-white/10 flex flex-col justify-between items-center gap-3 text-xs text-slate-400 font-sans">
          <p>&copy; {currentYear} PrintMagic. All rights reserved.</p>
          <a 
            href="https://www.facebook.com/Printmagic29" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#12941F] flex items-center gap-1 font-normal text-slate-300 transition-colors"
          >
            <span>Connect on Facebook</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

      </div>

      {/* DESKTOP / TABLET VIEW (hidden md:block) */}
      <div className="hidden md:block w-full px-6 md:px-10 lg:px-14 py-0">
        <div className="grid grid-cols-4 gap-6 lg:gap-10">
          
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/main-logo1.png" 
                alt="PrintMagic Logo" 
                className="w-8 h-8 rounded-full border border-[#12941F]/40 object-cover" 
                referrerPolicy="no-referrer" 
              />
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Print<span className="text-[#12941F]">Magic</span>
              </span>
            </div>
            <p className="text-xs text-[#E2E8F0] leading-relaxed font-sans max-w-xs">
              Delivering high-quality, professional printing and custom creative layouts to the local Batangas City community.
            </p>
            <div className="pt-1">
              <a
                href="https://www.facebook.com/Printmagic29"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#132C22] hover:bg-[#12941F]/20 text-white hover:text-[#12941F] flex items-center justify-center transition-colors"
                aria-label="Facebook Page"
                id="desktop-footer-facebook-link"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: OUR SERVICES */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              OUR SERVICES
            </h3>
            <ul className="space-y-2.5 text-xs font-sans">
              {services.map((service) => (
                <li key={service.page} className={service.isSubitem ? "pl-3 text-[11px]" : ""}>
                  <a
                    href={service.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(service.hash);
                    }}
                    className="text-[#E2E8F0] hover:text-[#12941F] transition-colors font-medium text-left focus:outline-none cursor-pointer flex items-center gap-1"
                  >
                    {service.isSubitem && <span className="text-[#12941F] font-bold">›</span>}
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: OPERATING HOURS */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              OPERATING HOURS
            </h3>
            <div className="space-y-3 text-xs text-[#E2E8F0] font-sans">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Monday - Sunday</p>
                  <p className="text-xs text-[#CBD5E1] mt-0.5">8:00 AM - 7:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: CONTACT INFORMATION */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              CONTACT INFORMATION
            </h3>
            <ul className="space-y-3.5 text-xs text-[#E2E8F0] font-sans">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span className="leading-normal font-medium">0926 022 6003</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href="mailto:printmagic_online@yahoo.com" className="hover:text-[#12941F] break-all font-medium text-[#E2E8F0]">
                  printmagic_online@yahoo.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[#E2E8F0]">
                  Libjo, New San Vicente,<br />
                  Batangas City, Philippines 4200
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Desktop Copyright Banner (with full-width top border) */}
        <div className="mt-10 pt-4 -mx-6 md:-mx-10 lg:-mx-14 px-6 md:px-10 lg:px-14 border-t border-[#28473B]/50 flex justify-between items-center text-xs text-[#E2E8F0] font-sans">
          <p className="font-semibold">&copy; {currentYear} PrintMagic. All rights reserved.</p>
          <a 
            href="https://www.facebook.com/Printmagic29" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#12941F] flex items-center gap-1 font-semibold text-[#E2E8F0] transition-colors"
          >
            <span>Connect on Facebook</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </footer>
  );
}
