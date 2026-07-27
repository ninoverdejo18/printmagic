/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
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
import IdApplicationLinks from "./pages/IdApplicationLinks";
import { getRouteByHash, getRouteByPageId, updateHashSilently } from "./utils/navigation";

export default function App() {
  const [currentPage, setCurrentPageRaw] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const initialRoute = getRouteByHash(window.location.hash);
      return initialRoute.pageId === "about" ? "home" : initialRoute.pageId;
    }
    return "home";
  });

  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;

    // Determine initial route/page on browser load/refresh
    let initialPageId = "home";
    if (window.location.hash) {
      const initialRoute = getRouteByHash(window.location.hash);
      initialPageId = initialRoute.pageId;
    }

    // Intro plays ONLY on direct visit or browser refresh while on the Home page
    return initialPageId === "home" || initialPageId === "about";
  });
  const [selectedServiceQuote, setSelectedServiceQuote] = useState<string>("");
  const [initialPrintingCategory, setInitialPrintingCategory] = useState<string>("large-format");

  // Custom unified navigation function that accepts pageId or hash
  const handleSetCurrentPage = useCallback((pageOrHash: string) => {
    setShowIntro(false);
    const route = getRouteByHash(pageOrHash);

    if (route.serviceQuote && setSelectedServiceQuote) {
      setSelectedServiceQuote(route.serviceQuote);
    }
    if (route.serviceCategory && setInitialPrintingCategory) {
      setInitialPrintingCategory(route.serviceCategory);
    }

    if (route.pageId === "about") {
      setCurrentPageRaw("home");
      if (window.location.hash !== route.hash) {
        window.history.pushState(null, "", route.hash);
      }
      setTimeout(() => {
        const element = document.getElementById("about-flow") || document.getElementById("about-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }
      }, 100);
      return;
    }

    setCurrentPageRaw(route.pageId);
    if (window.location.hash !== route.hash) {
      window.history.pushState(null, "", route.hash);
    }
  }, []);

  // Listen for hashchange events (browser back/forward & direct hash navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash;
      const route = getRouteByHash(currentHash);

      if (route.serviceQuote) {
        setSelectedServiceQuote(route.serviceQuote);
      }
      if (route.serviceCategory) {
        setInitialPrintingCategory(route.serviceCategory);
      }

      if (route.pageId === "about") {
        setCurrentPageRaw("home");
        setTimeout(() => {
          const element = document.getElementById("about-flow") || document.getElementById("about-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }
        }, 100);
      } else {
        setCurrentPageRaw(route.pageId);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Initial scroll position handling if loaded with hash on page load
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const initialRoute = getRouteByHash(window.location.hash);
      if (initialRoute.pageId === "about") {
        setTimeout(() => {
          const element = document.getElementById("about-flow") || document.getElementById("about-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      } else if (initialRoute.hash) {
        // Normalize hash in location bar
        updateHashSilently(initialRoute.hash);
      }
    }
  }, []);

  // Dynamic Browser Tab Title & Active Section Synchronization on Scroll
  useEffect(() => {
    const currentRoute = getRouteByPageId(currentPage);
    document.title = `${currentRoute.title} | PrintMagic`;

    // Ensure URL hash is updated if not on home layout
    if (currentPage !== "home") {
      updateHashSilently(currentRoute.hash);
      return;
    }

    // IntersectionObserver for active section tracking on single-page scrolling
    const activeSectionsMap = new Map<Element, number>();

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSectionsMap.set(entry.target, entry.intersectionRatio);
        } else {
          activeSectionsMap.delete(entry.target);
        }
      });

      if (activeSectionsMap.size > 0) {
        let maxRatio = -1;
        let bestTarget: Element | null = null;
        activeSectionsMap.forEach((ratio, target) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestTarget = target;
          }
        });

        if (bestTarget) {
          const sectionHash = (bestTarget as HTMLElement).getAttribute("data-section-hash");
          const sectionTitle = (bestTarget as HTMLElement).getAttribute("data-section-title");

          if (sectionHash) {
            updateHashSilently(sectionHash);
          }
          if (sectionTitle) {
            document.title = `${sectionTitle} | PrintMagic`;
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: [0.1, 0.25, 0.5, 0.75, 1.0]
    });

    const timeoutId = setTimeout(() => {
      const sectionElements = document.querySelectorAll("[data-section-title]");
      sectionElements.forEach((el) => observer.observe(el));
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [currentPage]);

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
        "email": "printmagiconline.service@gmail.com",
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
      case "home":
      case "printing-services":
      case "about":
        return <Home setCurrentPage={handleSetCurrentPage} setSelectedServiceQuote={setSelectedServiceQuote} />;
      case "id-application-links":
        return (
          <IdApplicationLinks
            setCurrentPage={handleSetCurrentPage}
            setSelectedServiceQuote={setSelectedServiceQuote}
          />
        );
      case "graphic-design":
        return <GraphicDesign setCurrentPage={handleSetCurrentPage} />;
      case "digital-services":
        return (
          <DigitalServices
            setCurrentPage={handleSetCurrentPage}
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
            setCurrentPage={handleSetCurrentPage}
            setSelectedServiceQuote={setSelectedServiceQuote}
            setInitialPrintingCategory={setInitialPrintingCategory}
          />
        );
      default:
        return <Home setCurrentPage={handleSetCurrentPage} />;
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
          setCurrentPage={handleSetCurrentPage} 
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
        <Footer setCurrentPage={handleSetCurrentPage} />
      )}
    </div>
  );
}
