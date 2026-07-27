/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Printer, 
  Palette, 
  Gift, 
  FileText, 
  Camera, 
  CreditCard, 
  Shirt, 
  BadgeCheck, 
  Bookmark, 
  Sparkles,
  ChevronRight,
  Upload,
  Download,
  Search,
  FileCheck,
  ExternalLink,
  Building2,
  UserCheck,
  CheckCircle2
} from "lucide-react";
import InkRevealIntro from "../components/InkRevealIntro";
import SkewCards from "../components/ui/gradient-card-showcase";
import GenerativeArtGallery from "../components/ui/generative-art-gallery";
import FlowArt, { FlowSection } from "../components/ui/story-scroll";
import AnimatedGradient from "../components/ui/animated-gradient";
import { LiquidCursor } from "../components/ui/liquid-cursor";
import { LiquidEffectAnimation } from "../components/ui/liquid-effect-animation";

interface HomeProps {
  setCurrentPage: (page: string) => void;
  setSelectedServiceQuote?: (serviceName: string) => void;
}

const homeServicesList = [
  {
    id: "tarpaulin-printing",
    title: "Tarpaulin Printing",
    categoryLabel: "Large Format",
    description: "Heavy-duty, weatherproof flex banners for grand openings, birthdays, store ads & event backdrops.",
    icon: Printer,
    badgeColor: "bg-slate-100 text-black border-slate-200",
    iconBg: "bg-slate-100 text-black"
  },
  {
    id: "layout-design",
    title: "Layout and Design",
    categoryLabel: "Graphic Design",
    description: "Professional graphic design, vector logos, custom promotional flyers & brand layout grids.",
    icon: Palette,
    badgeColor: "bg-slate-100 text-black border-slate-200",
    iconBg: "bg-slate-100 text-black"
  },
  {
    id: "souvenirs-giveaways",
    title: "Souvenirs & Corporate Giveaways",
    categoryLabel: "Merchandise",
    description: "Custom printed mugs, keychains, canvas tote bags, and corporate keepsakes for events.",
    icon: Gift,
    badgeColor: "bg-slate-100 text-black border-slate-200",
    iconBg: "bg-slate-100 text-black"
  },
  {
    id: "document-scanning-printing",
    title: "Document Scanning & Printing",
    categoryLabel: "Digital Services",
    description: "High-speed document scanning, high-resolution laser printing, copying & booklet binding.",
    icon: FileText,
    badgeColor: "bg-slate-100 text-black border-slate-200",
    iconBg: "bg-slate-100 text-black"
  },
  {
    id: "rush-id",
    title: "Rush ID",
    categoryLabel: "10-Min Express",
    description: "Instant 10-minute studio photo prints (1x1, 2x2, Passport) with background replacements.",
    icon: Camera,
    badgeColor: "bg-slate-100 text-black border-slate-200",
    iconBg: "bg-slate-100 text-black"
  },
  {
    id: "business-cards",
    title: "Business Card",
    categoryLabel: "Business Printing",
    description: "Premium calling cards on thick boardstock with matte, glossy & scratch-proof laminations.",
    icon: CreditCard,
    badgeColor: "bg-slate-100 text-black border-slate-200",
    iconBg: "bg-slate-100 text-black"
  },
  {
    id: "tshirt-printing",
    title: "T-Shirt Printing",
    categoryLabel: "Apparel Printing",
    description: "High-durability DTF, sublimation, and vinyl customized shirts for sports teams & uniforms.",
    icon: Shirt,
    badgeColor: "bg-slate-100 text-black border-slate-200",
    iconBg: "bg-slate-100 text-black"
  },
  {
    id: "pvc-id-lace",
    title: "PVC ID & ID Lace",
    categoryLabel: "Credentials",
    description: "ATM-grade durable plastic PVC badges, student IDs, and custom sublimated lanyard laces.",
    icon: BadgeCheck,
    badgeColor: "bg-slate-100 text-black border-slate-200",
    iconBg: "bg-slate-100 text-black"
  },
  {
    id: "nameplates",
    title: "Nameplate",
    categoryLabel: "Office Signage",
    description: "Sleek Sintra board office nameplates, door tags, and executive desktop display signs.",
    icon: Bookmark,
    badgeColor: "bg-slate-100 text-black border-slate-200",
    iconBg: "bg-slate-100 text-black"
  },
  {
    id: "stickers",
    title: "Stickers",
    tag: "Decals & Labels",
    categoryLabel: "Labels & Decals",
    description: "100% waterproof vinyl stickers, product labels, and custom die-cut vehicle decals.",
    icon: Sparkles,
    badgeColor: "bg-slate-100 text-black border-slate-200",
    iconBg: "bg-slate-100 text-black"
  }
];

export default function Home({ setCurrentPage, setSelectedServiceQuote }: HomeProps) {
  const [trackCode, setTrackCode] = React.useState("");
  const [trackingStatus, setTrackingStatus] = React.useState<{ found: boolean; message: string } | null>(null);

  const handleNav = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplicationRedirect = (serviceName: string) => {
    if (setSelectedServiceQuote) {
      setSelectedServiceQuote(serviceName);
    }
    setCurrentPage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTrackID = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackCode.trim()) return;
    setTrackingStatus({
      found: true,
      message: `Status for ID #${trackCode.toUpperCase()}: PRINTED & READY FOR PICKUP at Libjo Branch, Batangas City. Please present your claim stub or valid ID upon claiming.`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col relative"
      id="home-page"
    >
      <LiquidCursor />
      <FlowArt aria-label="PrintMagic Homepage Story Scroll">
        {/* 1. INTERACTIVE INK REVEAL INTRODUCTION (HERO) */}
        <FlowSection id="hero-flow" className="bg-[#0B1F18] no-liquid-cursor" data-no-liquid-cursor="true" data-section-title="Home" data-section-hash="/#home">
          <InkRevealIntro />
        </FlowSection>

        {/* 2. ABOUT US SECTION */}
        <FlowSection id="about-flow" className="bg-[#0B1F18]" data-section-title="About Us" data-section-hash="/#about">
          <section 
            className="w-full min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-10 border-b border-slate-200 relative overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat" 
            id="about-section"
            data-section-title="About Us"
            data-section-hash="/#about"
            style={{ backgroundImage: "url('/ink_splash_2k4.webp')" }}
          >
            <div className="max-w-7xl mx-auto relative z-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* Left Column: Portrait View of Albert */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="lg:col-span-5 flex justify-center w-full"
                  id="about-visual-col"
                >
                  <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none group no-liquid-cursor" data-no-liquid-cursor="true">
                    {/* Portrait Card Container */}
                    <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-xl w-full no-liquid-cursor" data-no-liquid-cursor="true">
                      {/* Original crisp photo visible when idle */}
                      <img 
                        src="/profile pic/About-Us-Profile-Pick.webp" 
                        alt="Albert Inoc - Founder of PrintMagic" 
                        className="w-full h-auto object-cover rounded-2xl block transition-opacity duration-500 group-hover:opacity-0"
                      />
                      {/* Liquid Effect Canvas overlay - active on hover */}
                      <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <LiquidEffectAnimation
                          imageSrc="/profile pic/About-Us-Profile-Pick.webp"
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                      {/* Overlay badge at the bottom */}
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent flex flex-col justify-end pointer-events-none z-10">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#12941F]">FOUNDER & OWNER</span>
                        <p className="text-xl font-extrabold text-white font-display">Albert Inoc</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column: Narrative and details */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left pointer-events-auto text-black bg-white/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/40"
                  id="about-content-col"
                >
                  {/* Section Header */}
                  <div className="space-y-3">
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#12941F] leading-tight font-display">
                      About Us
                    </h2>
                    <p className="text-sm sm:text-base text-[#454545] opacity-90 leading-relaxed font-sans">
                      Delivering high-quality, professional printing and custom creative layouts to the local Batangas City community.
                    </p>
                  </div>

                  {/* Top Row Grid: Founded On, Established By, Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-slate-200">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-black font-mono block">FOUNDED ON</span>
                      <p className="text-lg font-extrabold text-black font-display">August 2022</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-black font-mono block">ESTABLISHED BY</span>
                      <p className="text-lg font-extrabold text-black font-display">Albert Inoc</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-black font-mono block">LOCATION</span>
                      <p className="text-sm font-bold text-black font-sans leading-snug">
                        New San Vicente,<br />Libjo Batangas City
                      </p>
                    </div>
                  </div>

                  {/* Core Pillars: Vision and Mission */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Vision Card */}
                    <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400/50 transition-all duration-300 group shadow-sm">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-black font-mono block">VISION</span>
                        <h3 className="text-lg font-bold text-black font-display">Our Aspiration</h3>
                        <p className="text-sm text-[#7D7D7D] font-sans leading-relaxed">
                          To become one of the most recognized and trusted printing provider in the region.
                        </p>
                      </div>
                    </div>

                    {/* Mission Card */}
                    <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500/40 transition-all duration-300 group shadow-sm">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-black font-mono block">MISSION</span>
                        <h3 className="text-lg font-bold text-black font-display">Our Commitment</h3>
                        <p className="text-sm text-[#7D7D7D] font-sans leading-relaxed">
                          To ensure our clients achieve their goals by providing affordable, creative and high quality printing services.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </section>
        </FlowSection>

        {/* 3. SERVICES SECTION */}
        <FlowSection id="services-flow" className="bg-[#0B1F18]" data-section-title="Services" data-section-hash="/#services/tarpaulin-printing">
          <section 
            className="w-full min-h-screen py-20 px-4 sm:px-6 md:px-8 lg:px-10 border-b border-slate-200 relative overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat" 
            id="services-section"
            data-section-title="Services"
            data-section-hash="/#services/tarpaulin-printing"
            style={{ backgroundImage: "url('/InkBackground_1_2K.webp')" }}
          >
            <div className="max-w-7xl mx-auto space-y-12 relative z-10 w-full">
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-3 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/40">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12941F] tracking-tight font-display">
                  Printing & Graphic Services
                </h2>
                <p className="text-sm sm:text-base text-[#454545] opacity-90 font-sans leading-relaxed">
                  Explore our complete suite of printing and creative design solutions tailored for local businesses, schools, events, and personal branding in Batangas.
                </p>
              </div>

              {/* Grid of 10 Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {homeServicesList.map((service) => {
                  return (
                    <div
                      key={service.id}
                      id={`home-service-card-${service.id}`}
                      onClick={() => handleNav(service.id)}
                      className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:border-[#12941F] text-left h-full"
                    >
                      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title */}
                          <h3 className="text-sm font-extrabold text-slate-900 font-display tracking-tight group-hover:text-[#12941F] transition-colors leading-snug">
                            {service.title}
                          </h3>

                          {/* Short Detail */}
                          <p className="text-xs text-[#7D7D7D] font-sans leading-relaxed mt-1">
                            {service.description}
                          </p>
                        </div>

                        {/* Navigation Link Button */}
                        <div className="pt-2.5 border-t border-slate-100 mt-3 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#12941F]">
                          <span>Explore Service</span>
                          <div className="w-5 h-5 rounded-full bg-slate-100 group-hover:bg-[#12941F] group-hover:text-white text-slate-800 flex items-center justify-center transition-all">
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </FlowSection>

        {/* 4. CREATIVE GALLERY SECTION */}
        <FlowSection id="gallery-flow" className="bg-white" data-section-title="Gallery">
          <section 
            className="w-full min-h-screen py-16 text-center border-b border-slate-200 relative overflow-hidden flex flex-col items-center justify-center bg-contain bg-center bg-no-repeat bg-white" 
            id="gallery-section"
            data-section-title="Gallery"
            style={{ backgroundImage: "url('/Green_Paint_PureWhite_2K.webp')" }}
          >
            <div className="w-full space-y-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center space-y-3 px-4 sm:px-6 md:px-8 lg:px-10 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/40">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12941F] tracking-tight font-display">
                  Our Gallery
                </h2>
                <p className="text-sm sm:text-base text-[#454545] opacity-90 font-sans leading-relaxed">
                  Watch our custom designs, high-quality tarpaulin prints, souvenirs, and signage elements take shape dynamically.
                </p>
              </div>
              <div className="w-full py-4">
                <GenerativeArtGallery />
              </div>
            </div>
          </section>
        </FlowSection>

        {/* 5. CUSTOMER REVIEWS */}
        <FlowSection id="clients-flow" className="bg-white" data-section-title="Client Reviews">
          <SkewCards setCurrentPage={setCurrentPage} />
        </FlowSection>

        {/* 7. CALL TO ACTION */}
        <FlowSection id="cta-flow" className="bg-white" data-section-title="Contact Us" data-section-hash="/#contact">
          <section className="w-full bg-white py-16 text-slate-900" id="cta-section" data-section-title="Contact Us" data-section-hash="/#contact">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
              <div className="bg-[#0B1F18] border border-[#28473B]/50 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl text-white">
                {/* Abstract background subtle circle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#12941F]/15 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#12941F]/15 rounded-full blur-xl -ml-10 -mb-10"></div>

                <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12941F] tracking-tight">
                    Ready to See the Magic on Your Next Project?
                  </h2>
                  <p className="text-sm sm:text-base text-[#D1D5DB] font-sans">
                    Get an instant quotation for tarpaulins, customized t-shirts, branding logos, Sintra boards, stickers, and more. Connect with our helpful team now!
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                    <button
                      onClick={() => handleNav("contact")}
                      className="px-8 py-3 bg-[#12941F] hover:bg-[#14A823] text-white border border-[#12941F] rounded-lg font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center transform hover:-translate-y-[-2px] cursor-pointer"
                      id="cta-quote-btn"
                    >
                      <span>Request a Quote</span>
                    </button>
                    <a
                      href="https://www.facebook.com/Printmagic29"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-[#132C22] border-2 border-[#28473B] text-[#F8FAFC] rounded-lg font-bold hover:bg-[#28473B]/50 transition-all duration-200 flex items-center justify-center transform hover:-translate-y-[-2px] cursor-pointer"
                      id="cta-messenger-btn"
                    >
                      <span>Chat on Messenger</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FlowSection>
      </FlowArt>
    </motion.div>
  );
}

