/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, Heart, Sparkles, Users, History, Calendar, CheckCircle, Compass, Target } from "lucide-react";
import { GradientText } from "../components/ui/gradient-text";
import FlowArt, { FlowSection } from "../components/ui/story-scroll";

interface AboutProps {
  setCurrentPage: (page: string) => void;
}

export default function About({ setCurrentPage }: AboutProps) {
  const handleNav = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const milestones = [
    {
      year: "2022",
      title: "The Magic Begins",
      description: "PrintMagic was founded on August 2022 by Albert Inoc in Batangas City. We started with a passion for premium print craftsmanship and dedication to delivering unmatched layout and design."
    },
    {
      year: "2023",
      title: "Expanding Capabilities",
      description: "Acquired heavy-duty large format printing equipment, enabling local high-speed Tarpaulin and banner production right in the heart of Libjo."
    },
    {
      year: "2024",
      title: "Trusted Printing Partner",
      description: "Became a trusted print and layout partner for local communities, supplying custom giveaways, PVC ID cards, t-shirts, and commercial signage."
    },
    {
      year: "2026",
      title: "Continuing Excellence",
      description: "Committed to ensuring our clients achieve their goals by continuously refining our creative craftsmanship and production capabilities."
    }
  ];

  const features = [
    {
      icon: <Award className="w-6 h-6 text-[#4ade80]" />,
      title: "Excellence in Every Creation",
      description: "We don't believe in cutting corners. From simple document scanning to monumental tarpaulin prints, we check every color gradient and detail."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#4ade80]" />,
      title: "Professional Graphics",
      description: "Our in-house design team transforms raw ideas into eye-catching visual masterpieces that stand out in crowded commercial spaces."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#4ade80]" />,
      title: "Absolute Precision",
      description: "Aligning text, grid systems, and layout typography meticulously. We ensure where every element finds its place on the final print."
    },
    {
      icon: <Heart className="w-6 h-6 text-[#4ade80]" />,
      title: "Community First",
      description: "We are proudly Batangueño. Our motto 'Personalan Ba? PrintMagic na!' reflects our close connection with every single resident and local business."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white text-slate-900 min-h-screen"
      id="about-page"
    >
      <FlowArt aria-label="About Page Story Scroll">
        {/* 1. Header Section */}
        <FlowSection id="about-header-flow" className="bg-white">
          <div className="text-center space-y-4 pt-6 max-w-3xl mx-auto px-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full text-[10px] uppercase font-bold text-emerald-800 shadow-sm border border-emerald-200">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-slate-900 tracking-tight leading-tight">
              About PrintMagic
            </h1>
            <p className="text-sm sm:text-base text-[#7D7D7D] font-sans leading-relaxed">
              Crafting visual excellence in Batangas City. We blend premium physical prints with stellar graphic layouts to tell your story beautifully.
            </p>
          </div>
        </FlowSection>

        {/* 2. About, Vision & Mission Bento Section */}
        <FlowSection id="about-bento-flow" className="bg-white">
          <section className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch px-4 sm:px-6 md:px-8 lg:px-10">
            {/* About Us Card - spans 7 cols on lg */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 hover:border-emerald-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm relative overflow-hidden text-left transition-all duration-300">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/80 rounded-full text-[10px] uppercase font-bold text-emerald-800 border border-emerald-200">
                  About Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
                  Our Identity & Foundation
                </h2>
                <p className="text-sm text-[#7D7D7D] font-sans leading-relaxed">
                  Born from a passion for premium print craftsmanship and digital visual arts, PrintMagic opened its doors with a dedicated focus on design accessibility and top-tier printing. We handle every client's print with care and precision, serving local businesses, organizations, and residents with pride.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 font-sans">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-mono font-bold block">Founded On</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">August 2022</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-mono font-bold block">Established By</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">Albert Inoc</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-mono font-bold block">Location</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-tight">New San Vicente,<br />Libjo Batangas City</p>
                </div>
              </div>
            </div>
            
            {/* Vision & Mission Cards - spans 5 cols on lg */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Vision Card */}
              <div className="bg-slate-50 border border-slate-200 hover:border-amber-400/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-center flex-1 shadow-sm relative overflow-hidden text-left transition-all duration-300">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 rounded-full text-[10px] uppercase font-bold text-amber-800 border border-amber-200">
                    Vision
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-display">Our Aspiration</h3>
                  <p className="text-sm text-[#7D7D7D] font-sans leading-relaxed">
                    To become one of the most recognized and trusted printing provider in the region.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-slate-50 border border-slate-200 hover:border-emerald-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-center flex-1 shadow-sm relative overflow-hidden text-left transition-all duration-300">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/80 rounded-full text-[10px] uppercase font-bold text-emerald-800 border border-emerald-200">
                    Mission
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-display">Our Commitment</h3>
                  <p className="text-sm text-[#7D7D7D] font-sans leading-relaxed">
                    To ensure our clients achieve their goals by providing affordable, creative and high quality printing services.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FlowSection>

        {/* 3. Core Values & Principles Grid */}
        <FlowSection id="about-values-flow" className="bg-slate-100/80">
          <section className="bg-slate-100/80 py-16 px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="w-full max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 font-mono">What Drives Us</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  Our Printing Philosophy
                </h2>
                <p className="text-sm text-slate-600 max-w-xl mx-auto font-sans">
                  We design and print under the core values of aesthetic balance, durability, and customer satisfaction.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feat, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-slate-200 hover:border-emerald-500/40 rounded-xl p-6 space-y-2 text-left transition-all duration-300 hover:-translate-y-1 group shadow-sm"
                  >
                    <h3 className="text-base font-bold text-slate-900 font-display tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FlowSection>

        {/* 4. Timeline Milestones */}
        <FlowSection id="about-timeline-flow" className="bg-white">
          <section className="w-full max-w-7xl mx-auto space-y-12 px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 font-mono">How We've Grown</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                A Journey of Growth
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto font-sans">
                Our historical timeline highlights key milestones from our establishment to today.
              </p>
            </div>

            <div className="relative border-l border-slate-300 pl-6 ml-4 sm:ml-8 space-y-10 text-left">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="relative">
                  {/* Dot indicator */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                  <div className="space-y-1 bg-slate-50 border border-slate-200 rounded-xl p-6 hover:bg-slate-100/80 transition-colors shadow-sm">
                    <span className="inline-block text-xs font-extrabold px-2.5 py-0.5 rounded bg-emerald-600 text-white font-mono">
                      {milestone.year}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-display pt-1">
                      {milestone.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pt-1">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FlowSection>

        {/* 5. CTA Footer Block */}
        <FlowSection id="about-cta-flow" className="bg-white">
          <section className="w-full max-w-7xl mx-auto pb-8 px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4ade80]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#4ade80]/10 rounded-full blur-xl -ml-10 -mb-10"></div>

              <div className="max-w-2xl mx-auto space-y-6 relative z-10 text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Let's Bring Your Design Ideas to Life
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-sans">
                  Ready to request layout revisions or order business printing? Our representatives are prepared to help you select paper stocks, PVC lanyards, or corporate giveaways.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => handleNav("contact")}
                    className="px-6 py-2.5 bg-[#F4C542] hover:bg-[#FFD85A] text-[#0B1F18] border border-[#FFD85A] rounded-lg font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    Get a Quote Now
                  </button>
                  <button
                    onClick={() => handleNav("home")}
                    className="px-6 py-2.5 bg-[#132C22] border border-[#28473B] text-white hover:bg-[#1C3A2E] rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Explore Services
                  </button>
                </div>
              </div>
            </div>
          </section>
        </FlowSection>
      </FlowArt>
    </motion.div>
  );
}
