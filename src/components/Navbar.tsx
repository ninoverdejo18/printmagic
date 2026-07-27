/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, X, Phone, ShieldCheck, Calendar, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setSelectedServiceQuote?: (serviceName: string) => void;
  setInitialPrintingCategory?: (categoryName: string) => void;
}

export default function Navbar({ 
  currentPage, 
  setCurrentPage, 
  setSelectedServiceQuote, 
  setInitialPrintingCategory 
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", hash: "/#home" },
    { id: "services", label: "Services", isDropdown: true, hash: "/#services/tarpaulin-printing" },
    { id: "about", label: "About Us", hash: "/#about" },
    { id: "contact", label: "Contact", hash: "/#contact" },
  ];

  const servicesList = [
    { name: "Tarpaulin Printing", page: "tarpaulin-printing", hash: "/#services/tarpaulin-printing", category: "large-format", quote: "Tarpaulin" },
    { name: "Layout & Graphic Design", page: "layout-design", hash: "/#services/layout-graphic-design", category: "", quote: "Layout and Design" },
    { name: "Souvenirs & Giveaways", page: "souvenirs-giveaways", hash: "/#services/souvenirs-giveaways", category: "promotional-items", quote: "Custom Giveaways" },
    { name: "Document Scanning and Printing", page: "document-scanning-printing", hash: "/#Document Scanning and Printing", category: "", quote: "Document Scanning and Printing" },
    { name: "Rush ID", page: "rush-id", hash: "/#Rush ID", category: "promotional-items", quote: "PVC IDs" },
    { name: "Business Cards", page: "business-cards", hash: "/#services/business-cards", category: "business-printing", quote: "Calling Cards / Business Cards" },
    { name: "T-Shirt Printing", page: "tshirt-printing", hash: "/#services/t-shirt-printing", category: "apparel-printing", quote: "T-Shirt Printing" },
    { name: "PVC ID & ID Lace", page: "pvc-id-lace", hash: "/#services/pvc-id-id-lace", category: "promotional-items", quote: "PVC IDs & ID Lace" },
    { name: "ID Application Links", page: "id-application-links", hash: "/#services/id-application-links", category: "credentials", quote: "Online ID Application", isSubitem: true },
    { name: "Lost ID Application", page: "lost-id-application", hash: "/#services/lost-id-application", category: "credentials", quote: "Lost ID Application", isSubitem: true },
    { name: "Nameplates & Signage", page: "nameplates", hash: "/#services/nameplates-signage", category: "large-format", quote: "Sintra Board / Nameplates" },
    { name: "Custom Stickers & Decals", page: "stickers", hash: "/#services/custom-stickers-decals", category: "large-format", quote: "Stickers & Decals" },
  ];

  const isHome = currentPage === "home";

  const handleNavClick = (target: string) => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setCurrentPage(target);
  };

  const handleServiceClick = (service: typeof servicesList[0]) => {
    if (setSelectedServiceQuote) {
      setSelectedServiceQuote(service.quote);
    }
    if (setInitialPrintingCategory && service.category) {
      setInitialPrintingCategory(service.category);
    }
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileDropdownOpen(false);
    setCurrentPage(service.hash);
  };

  return (
    <div 
      className={`no-liquid-cursor ${currentPage === "home" ? "absolute top-0 left-0 right-0 z-50 bg-transparent w-full" : "relative z-50"}`}
      data-no-liquid-cursor="true"
    >
      {/* Top micro bar for trust metrics */}
      <div className={`transition-all duration-300 text-[10px] text-[#CBD5D1] ${
        currentPage === "home"
          ? "bg-transparent border-b border-white/10 py-2 px-4 sm:px-6 md:px-8 lg:px-10"
          : "bg-[#0B1F18] border-b border-[#28473B]/30 py-2 px-4 sm:px-6 md:px-8 lg:px-10"
      }`}>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-1.5 font-sans relative z-10 font-normal">
          <div className="flex items-center gap-4">
            <span className={`flex items-center gap-1 font-normal ${isHome ? "text-black [text-shadow:_0_1px_2px_rgba(255,255,255,0.65)]" : "text-white"}`}>
              <Calendar className={`w-3.5 h-3.5 ${isHome ? "text-black" : "text-white"}`} />
              <span>Est. August 2022</span>
            </span>
            <span className={`flex items-center gap-1 font-normal ${isHome ? "text-black [text-shadow:_0_1px_2px_rgba(255,255,255,0.65)]" : "text-white"}`}>
              <ShieldCheck className={`w-3.5 h-3.5 ${isHome ? "text-black" : "text-white"}`} />
              <span>Trusted Local Printing Business</span>
            </span>
          </div>
          <div className={`flex items-center gap-1.5 font-normal sm:pr-2 ${isHome ? "text-black [text-shadow:_0_1px_2px_rgba(255,255,255,0.65)]" : "text-white"}`}>
            <Phone className={`w-3.5 h-3.5 ${isHome ? "text-black" : "text-white"}`} />
            <span>Call us: <span>0926 022 6003</span></span>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header className={`transition-all duration-300 ${
        currentPage === "home"
          ? "bg-transparent border-none shadow-none"
          : "sticky top-0 z-50 bg-[#0B1F18]/90 backdrop-blur-md border-b border-[#28473B]/30 shadow-md"
      }`}>
        <nav className="w-full h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 border-none outline-none relative z-10">
          
          {/* Logo brand */}
          <a 
            href="/#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/#home");
            }}
            className="flex flex-col text-left group cursor-pointer focus:outline-none"
            id="brand-logo"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              {/* Premium vector brand logo */}
              <img 
                src="/main-logo1.png" 
                alt="PrintMagic Logo" 
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105" 
                referrerPolicy="no-referrer" 
              />
              <div>
                <h1 className={`text-lg sm:text-xl font-black tracking-tight flex items-center gap-0.5 ${isHome ? "text-black [text-shadow:_0_1px_2px_rgba(255,255,255,0.7)]" : "text-white"}`}>
                  <span className={isHome ? "text-black" : "text-white"}>Print</span><span className="text-[#14A823]">Magic</span>
                </h1>
                <p className="text-[9px] font-bold text-[#14A823] italic leading-none mt-0.5">
                  Personalan Ba? PrintMagic na!
                </p>
              </div>
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 md:absolute md:left-1/2 md:-translate-x-1/2">
            {navItems.map((item) => {
              if (item.isDropdown) {
                const isDropdownActive = [
                  "graphic-design", "printing-services", "digital-services",
                  "tarpaulin-printing", "layout-design", "souvenirs-giveaways",
                  "document-scanning-printing", "rush-id", "business-cards",
                  "tshirt-printing", "pvc-id-lace", "nameplates", "stickers", "id-application-links", "lost-id-application"
                ].includes(currentPage) || (typeof window !== "undefined" && window.location.hash.includes("services"));
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    id="nav-services-dropdown-container"
                  >
                    <a
                      href={item.hash}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.hash);
                      }}
                      className={`relative px-2 py-1 text-sm font-bold transition-all duration-200 cursor-pointer focus:outline-none flex items-center gap-1 border-none bg-transparent ${
                        isDropdownActive || isDropdownOpen
                          ? "text-[#14A823] font-black" 
                          : isHome ? "text-black hover:text-[#14A823] [text-shadow:_0_1px_2px_rgba(255,255,255,0.65)]" : "text-white hover:text-[#14A823]"
                      }`}
                      id={`nav-item-${item.id}`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </a>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-1 bg-[#0B1F18]/95 backdrop-blur-md border border-[#28473B]/50 rounded-xl shadow-xl py-2 z-50 min-w-max"
                          id="nav-services-dropdown-menu"
                        >
                          {servicesList.map((service, index) => (
                            <a
                              key={service.name}
                              href={service.hash}
                              onClick={(e) => {
                                e.preventDefault();
                                handleServiceClick(service);
                              }}
                              className={`flex items-center gap-1.5 text-left py-2 mx-1 text-[#CBD5D1] hover:text-[#4ade80] hover:bg-[#1C3A2E]/60 transition-colors duration-150 font-sans font-medium rounded-lg cursor-pointer ${
                                service.isSubitem
                                  ? "pl-8 pr-5 text-slate-300 font-normal text-[11px]"
                                  : "px-5 text-xs sm:text-sm"
                              }`}
                              style={{ width: "calc(100% - 8px)" }}
                              id={`dropdown-item-${index}`}
                            >
                              {service.isSubitem && (
                                <ChevronRight className="w-3.5 h-3.5 text-[#14A823] shrink-0" />
                              )}
                              <span>{service.name}</span>
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = currentPage === item.id || (typeof window !== "undefined" && window.location.hash.endsWith(item.id));
              return (
                <a
                  key={item.id}
                  href={item.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.hash);
                  }}
                  className={`relative transition-all duration-200 cursor-pointer focus:outline-none px-2 py-1 text-sm font-bold border-none bg-transparent ${
                    isActive 
                      ? "text-[#14A823] font-black" 
                      : isHome ? "text-black hover:text-[#14A823] [text-shadow:_0_1px_2px_rgba(255,255,255,0.65)]" : "text-white hover:text-[#14A823]"
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right side CTA & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                if (setSelectedServiceQuote) {
                  setSelectedServiceQuote("General Quotation");
                }
                handleNavClick("/#contact");
              }}
              className={`hidden sm:inline-flex items-center justify-center bg-transparent font-extrabold text-xs sm:text-sm px-2 py-1 border-none shadow-none transition-all duration-200 cursor-pointer ${
                currentPage === "contact"
                  ? "text-[#14A823] font-black [text-shadow:_0_1px_2px_rgba(0,0,0,0.7)]"
                  : isHome
                  ? "text-black hover:text-[#14A823] [text-shadow:_0_1px_2px_rgba(255,255,255,0.7)]"
                  : "text-white hover:text-[#14A823] [text-shadow:_0_0_8px_rgba(0,0,0,0.8),_0_1px_3px_rgba(0,0,0,0.9)]"
              }`}
              id="nav-quotation-btn"
            >
              Need Quotation?
            </a>

            {/* Mobile Menu Trigger */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-transparent border-0 transition-all duration-200 focus:outline-none cursor-pointer flex items-center justify-center text-[#12941F] hover:bg-[#12941F]/10 active:scale-95"
                style={{ color: "#12941F" }}
                aria-label="Toggle Menu"
                id="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? (
                  <X 
                    className="w-6 h-6 stroke-[2.5] text-[#12941F]" 
                    color="#12941F" 
                    stroke="#12941F"
                    style={{ color: "#12941F", stroke: "#12941F" }} 
                  />
                ) : (
                  <Menu 
                    className="w-6 h-6 stroke-[2.5] text-[#12941F]" 
                    color="#12941F" 
                    stroke="#12941F"
                    style={{ color: "#12941F", stroke: "#12941F" }} 
                  />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-[#28473B]/50 bg-[#0B1F18]"
            >
              <div className="px-4 py-3 space-y-1.5">
                {navItems.map((item) => {
                  if (item.isDropdown) {
                    const isDropdownActive = [
                      "graphic-design", "printing-services", "digital-services",
                      "tarpaulin-printing", "layout-design", "souvenirs-giveaways",
                      "document-scanning-printing", "rush-id", "business-cards",
                      "tshirt-printing", "pvc-id-lace", "nameplates", "stickers", "id-application-links", "lost-id-application"
                    ].includes(currentPage);
                    return (
                      <div key={item.id} className="space-y-1">
                        <button
                          onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                          className="flex items-center justify-between w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all bg-[#1C3A2E]/40 hover:bg-[#1C3A2E]/70"
                          style={{ color: "#12941F" }}
                          id={`mobile-nav-${item.id}`}
                        >
                          <span style={{ color: "#12941F" }}>{item.label}</span>
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${isMobileDropdownOpen ? "rotate-180" : ""}`} 
                            style={{ color: "#12941F", stroke: "#12941F" }}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {isMobileDropdownOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-2 space-y-1 overflow-hidden"
                            >
                              {servicesList.map((service, index) => (
                                <a
                                  key={service.name}
                                  href={service.hash}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleServiceClick(service);
                                  }}
                                  className={`flex items-center gap-1.5 w-full text-left py-2.5 rounded-lg font-semibold hover:bg-[#1C3A2E]/50 transition-colors ${
                                    service.isSubitem ? "pl-7 pr-3 text-[11px] font-medium" : "px-4 text-xs"
                                  }`}
                                  style={{ color: "#12941F" }}
                                  id={`mobile-dropdown-item-${index}`}
                                >
                                  {service.isSubitem && (
                                    <ChevronRight className="w-3.5 h-3.5 text-[#12941F] shrink-0" style={{ color: "#12941F", stroke: "#12941F" }} />
                                  )}
                                  <span>{service.name}</span>
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.id}
                      href={item.hash}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.hash);
                      }}
                      className="block w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all bg-[#1C3A2E]/40 hover:bg-[#1C3A2E]/70"
                      style={{ color: "#12941F" }}
                      id={`mobile-nav-${item.id}`}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <div className="pt-3 pb-2 border-t border-[#28473B]/20">
                  <a
                    href="/#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      if (setSelectedServiceQuote) {
                        setSelectedServiceQuote("General Quotation");
                      }
                      handleNavClick("/#contact");
                    }}
                    className="block w-full text-center py-2.5 rounded-full bg-[#12941F] hover:bg-[#0e7a18] text-white border border-[#12941F] font-extrabold text-sm shadow-sm transition-all"
                    id="mobile-nav-quotation-btn"
                  >
                    Need Quotation?
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
