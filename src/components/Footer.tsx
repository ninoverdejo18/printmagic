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

  return (
    <footer className="bg-[#0B1F18] border-t border-[#28473B]/50 pt-16 pb-8 text-[#F8FAFC]" id="main-footer">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        
        {/* Brand & Tagline */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <img 
              src="/app-icon.png" 
              alt="PrintMagic Logo" 
              className="w-10 h-10 object-contain" 
              referrerPolicy="no-referrer" 
            />
            <span className="text-lg font-extrabold tracking-tight text-[#F8FAFC] font-display">
              Print<span className="text-[#4ade80]">Magic</span>
            </span>
          </div>
          <p className="text-xs text-[#7D7D7D] leading-relaxed">
            Delivering high-quality, professional printing and custom creative layouts to the local Batangas City community.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.facebook.com/Printmagic29"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#132C22] hover:bg-[#4ade80]/20 text-[#7D7D7D] hover:text-[#4ade80] border border-[#28473B] flex items-center justify-center transition-colors shadow-sm"
              aria-label="Facebook Page"
              id="footer-facebook-link"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
            Our Services
          </h3>
          <ul className="space-y-2 text-xs font-sans">
            {[
              { name: "Tarpaulin Printing", page: "tarpaulin-printing" },
              { name: "Layout & Graphic Design", page: "layout-design" },
              { name: "Souvenirs & Giveaways", page: "souvenirs-giveaways" },
              { name: "Business Cards", page: "business-cards" },
              { name: "T-Shirt Printing", page: "tshirt-printing" },
              { name: "PVC ID & ID Lace", page: "pvc-id-lace" },
              { name: "Nameplates & Signage", page: "nameplates" },
              { name: "Custom Stickers & Decals", page: "stickers" }
            ].map((service) => (
              <li key={service.page}>
                <button
                  onClick={() => handleLinkClick(service.page)}
                  className="text-[#7D7D7D] hover:text-[#4ade80] transition-colors font-semibold text-left focus:outline-none cursor-pointer"
                >
                  {service.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Operating Hours */}
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
            Operating Hours
          </h3>
          <div className="space-y-3 text-xs text-[#7D7D7D] font-sans">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#7D7D7D] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#7D7D7D]">Monday - Saturday</p>
                <p className="text-[11px] mt-0.5 text-[#7D7D7D]">8:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#7D7D7D] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#7D7D7D]">Sunday</p>
                <p className="text-[11px] mt-0.5 text-[#7D7D7D]">Closed / Appointments Only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Contact Info */}
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
            Contact Information
          </h3>
          <ul className="space-y-3 text-xs text-[#7D7D7D] font-sans">
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-[#7D7D7D] shrink-0 mt-0.5" />
              <span className="leading-normal">0926 022 6003</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-[#7D7D7D] shrink-0 mt-0.5" />
              <a href="mailto:printmagic_online@yahoo.com" className="hover:text-[#4ade80] break-all font-semibold text-[#7D7D7D]">
                printmagic_online@yahoo.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#7D7D7D] shrink-0 mt-0.5" />
              <span className="leading-relaxed text-[#7D7D7D]">
                Libjo, New San Vicente,<br />
                Batangas City, Philippines 4200
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Trust & Copyright Banner */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 mt-12 pt-8 border-t border-[#28473B]/50">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7D7D7D]">
          <p className="font-sans">
            &copy; {currentYear} <strong>PrintMagic</strong>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs font-sans">
            <a 
              href="https://www.facebook.com/Printmagic29" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#4ade80] flex items-center gap-0.5 font-semibold text-[#7D7D7D]"
            >
              <span>Connect on Facebook</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
