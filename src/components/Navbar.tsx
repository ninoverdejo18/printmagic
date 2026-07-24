/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, X, Phone, ShieldCheck, Calendar, ChevronDown } from "lucide-react";
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
    { id: "home", label: "Home" },
    { id: "services", label: "Services", isDropdown: true },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" },
  ];

  const servicesList = [
    { name: "Tarpaulin Printing", page: "tarpaulin-printing", category: "large-format", quote: "Tarpaulin" },
    { name: "Layout and Design", page: "layout-design", category: "", quote: "Layout and Design" },
    { name: "Souvenirs and Corporate Giveaways", page: "souvenirs-giveaways", category: "promotional-items", quote: "Custom Giveaways" },
    { name: "Document Scanning and Printing", page: "document-scanning-printing", category: "", quote: "Document Scanning and Printing" },
    { name: "Rush ID", page: "rush-id", category: "promotional-items", quote: "PVC IDs" },
    { name: "Business Cards", page: "business-cards", category: "business-printing", quote: "Calling Cards / Business Cards" },
    { name: "T-Shirt Printing", page: "tshirt-printing", category: "apparel-printing", quote: "T-Shirt Printing" },
    { name: "PVC ID & ID Lace", page: "pvc-id-lace", category: "promotional-items", quote: "PVC IDs & ID Lace" },
    { name: "Nameplates", page: "nameplates", category: "large-format", quote: "Sintra Board / Nameplates" },
    { name: "Stickers", page: "stickers", category: "large-format", quote: "Stickers & Decals" },
  ];

  const handleNavClick = (pageId: string) => {
    if (pageId === "about") {
      if (currentPage !== "home") {
        setCurrentPage("home");
        setTimeout(() => {
          const element = document.getElementById("about-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      } else {
        const element = document.getElementById("about-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setIsMobileMenuOpen(false);
      setIsDropdownOpen(false);
      return;
    }

    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    setCurrentPage(service.page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      className={`no-liquid-cursor ${currentPage === "home" ? "absolute top-0 left-0 right-0 z-50 bg-transparent w-full" : "relative z-50"}`}
      data-no-liquid-cursor="true"
    >
      {/* Top micro bar for trust metrics */}
      <div className={`transition-all duration-300 text-[11px] sm:text-xs text-[#CBD5D1] ${
        currentPage === "home"
          ? "bg-transparent border-b border-white/10 py-2 px-4 sm:px-6 md:px-8 lg:px-10"
          : "bg-[#0B1F18] border-b border-[#28473B]/30 py-2 px-4 sm:px-6 md:px-8 lg:px-10"
      }`}>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-1.5 font-sans relative z-10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#CBD5D1]/80">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>Est. August 2022</span>
            </span>
            <span className="flex items-center gap-1 text-[#CBD5D1]/80">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Trusted Local Printing Business</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-[#F8FAFC]">
            <Phone className="w-3.5 h-3.5 text-white" />
            <span>Call us: <strong>0926 022 6003</strong></span>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header className={`transition-all duration-300 ${
        currentPage === "home"
          ? "bg-transparent border-none shadow-none"
          : "sticky top-0 z-50 bg-[#0B1F18]/90 backdrop-blur-md border-b border-[#28473B]/30 shadow-md"
      }`}>
        <nav className="w-full h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 border-none relative z-10">
          
          {/* Logo brand */}
          <button 
            onClick={() => handleNavClick("home")}
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
                src="/app-icon.png" 
                alt="PrintMagic Logo" 
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105" 
                referrerPolicy="no-referrer" 
              />
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#F8FAFC] flex items-center gap-0.5">
                  Print<span className="text-[#4ade80]">Magic</span>
                </h1>
                <p className="text-[9px] font-semibold text-[#CBD5D1] italic leading-none mt-0.5">
                  "Personalan Ba? PrintMagic na!"
                </p>
              </div>
            </motion.div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.isDropdown) {
                const isDropdownActive = [
                  "graphic-design", "printing-services", "digital-services",
                  "tarpaulin-printing", "layout-design", "souvenirs-giveaways",
                  "document-scanning-printing", "rush-id", "business-cards",
                  "tshirt-printing", "pvc-id-lace", "nameplates", "stickers"
                ].includes(currentPage);
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    id="nav-services-dropdown-container"
                  >
                    <button
                      className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none flex items-center gap-1 ${
                        isDropdownActive || isDropdownOpen
                          ? "text-[#4ade80]" 
                          : "text-[#CBD5D1] hover:text-[#F8FAFC]"
                      }`}
                      id={`nav-item-${item.id}`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    
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
                            <button
                              key={service.name}
                              onClick={() => handleServiceClick(service)}
                              className="block w-full text-left px-5 py-2 mx-1 text-xs sm:text-sm text-[#CBD5D1] hover:text-[#4ade80] hover:bg-[#1C3A2E]/60 transition-colors duration-150 font-sans font-medium rounded-lg w-[calc(100%-8px)] cursor-pointer"
                              id={`dropdown-item-${index}`}
                            >
                              {service.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative transition-all duration-200 cursor-pointer focus:outline-none px-4 py-2 rounded-lg text-sm font-semibold ${
                    isActive 
                      ? "text-[#4ade80]" 
                      : "text-[#CBD5D1] hover:text-[#F8FAFC]"
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#4ade80]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
            

          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#CBD5D1] hover:bg-[#1C3A2E] hover:text-[#F8FAFC] focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
                      "tshirt-printing", "pvc-id-lace", "nameplates", "stickers"
                    ].includes(currentPage);
                    return (
                      <div key={item.id} className="space-y-1">
                        <button
                          onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                          className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                            isDropdownActive || isMobileDropdownOpen
                              ? "bg-[#1C3A2E]/50 text-[#4ade80]" 
                              : "text-[#CBD5D1] hover:bg-[#1C3A2E]/50 hover:text-[#F8FAFC]"
                          }`}
                          id={`mobile-nav-${item.id}`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileDropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isMobileDropdownOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 space-y-1 overflow-hidden"
                            >
                              {servicesList.map((service, index) => (
                                <button
                                  key={service.name}
                                  onClick={() => handleServiceClick(service)}
                                  className="block w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold text-[#CBD5D1] hover:text-[#4ade80] hover:bg-[#1C3A2E]/30 transition-colors"
                                  id={`mobile-dropdown-item-${index}`}
                                >
                                  {service.name}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                        isActive 
                          ? "bg-[#1C3A2E] text-[#4ade80]" 
                          : "text-[#CBD5D1] hover:bg-[#1C3A2E]/50 hover:text-[#F8FAFC]"
                      }`}
                      id={`mobile-nav-${item.id}`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <div className="pt-3 pb-2 border-t border-[#28473B]/20">
                  <button
                    onClick={() => handleNavClick("contact")}
                    className="w-full text-center py-2.5 rounded-full bg-[#4ade80] hover:bg-[#22c55e] text-[#0B1F18] border border-[#4ade80] font-bold text-sm shadow-sm transition-all"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
