/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import GraphicDesign from "./pages/GraphicDesign";
import PrintingServices from "./pages/PrintingServices";
import DigitalServices from "./pages/DigitalServices";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [selectedServiceQuote, setSelectedServiceQuote] = useState<string>("");
  const [initialPrintingCategory, setInitialPrintingCategory] = useState<string>("large-format");

  // Inject Structured Local Business Schema SEO Data
  useEffect(() => {
    // Check if script already exists to avoid duplicates
    const existingScript = document.getElementById("printmagic-jsonld");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "printmagic-jsonld";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PrintMagic",
        "description": "Premium small printing and custom creative design business in Batangas City, Philippines.",
        "image": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
        "telephone": "0926 022 6003",
        "email": "printmagic_online@yahoo.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Libjo, New San Vicente",
          "addressLocality": "Batangas City",
          "addressRegion": "Batangas",
          "postalCode": "4200",
          "addressCountry": "PH"
        },
        "url": "https://www.facebook.com/Printmagic29",
        "foundingDate": "2013-04-07",
        "priceRange": "$$"
      });
      document.head.appendChild(script);
    }
  }, []);

  // Set page meta tags for SEO keywords dynamically
  useEffect(() => {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const keywords = document.createElement("meta");
      keywords.setAttribute("name", "keywords");
      keywords.setAttribute("content", "Printing Services Batangas, Tarpaulin Printing Batangas, Sticker Printing Batangas, Graphic Design Batangas, Digital Printing Philippines, T-Shirt Printing Batangas, Signage Printing Batangas, Logo Design Batangas");
      document.head.appendChild(keywords);
    }
  }, []);

  const renderPageView = () => {
    switch (currentPage) {
      case "intro":
        return <Home setCurrentPage={setCurrentPage} />;
      case "home":
        return <Home setCurrentPage={setCurrentPage} />;
      case "graphic-design":
        return <GraphicDesign setCurrentPage={setCurrentPage} />;
      case "printing-services":
        return <Home setCurrentPage={setCurrentPage} />;
      case "digital-services":
        return (
          <DigitalServices
            setCurrentPage={setCurrentPage}
            setSelectedServiceQuote={setSelectedServiceQuote}
          />
        );
      case "contact":
        return (
          <Contact
            selectedServiceQuote={selectedServiceQuote}
            setSelectedServiceQuote={setSelectedServiceQuote}
          />
        );
      case "about":
        return <About setCurrentPage={setCurrentPage} />;
      case "tarpaulin-printing":
      case "layout-design":
      case "souvenirs-giveaways":
      case "document-scanning-printing":
      case "rush-id":
      case "business-cards":
      case "business-card":
      case "tshirt-printing":
      case "pvc-id-lace":
      case "nameplates":
      case "nameplate":
      case "stickers":
        return (
          <ServiceDetail
            serviceId={currentPage}
            setCurrentPage={setCurrentPage}
            setSelectedServiceQuote={setSelectedServiceQuote}
            setInitialPrintingCategory={setInitialPrintingCategory}
          />
        );
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0B1F18] text-slate-100 font-sans relative overflow-x-hidden" id="app-container">
      {/* 1. SEAMLESS INTRO SCREEN OVERLAY */}
      <AnimatePresence>
        {showIntro && (
          <Intro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Sticky Header and Navigation */}
      {currentPage !== "intro" && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          setSelectedServiceQuote={setSelectedServiceQuote}
          setInitialPrintingCategory={setInitialPrintingCategory}
        />
      )}

      {/* Main content body with smooth animated page state transitions */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPageView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      {currentPage !== "intro" && (
        <Footer setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}
