/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Paintbrush, Compass, Layers, Smartphone, Eye, Send } from "lucide-react";
import { GradientText } from "../components/ui/gradient-text";

interface Project {
  id: string;
  title: string;
  category: "logo" | "branding" | "social" | "mockups" | "layouts";
  categoryLabel: string;
  description: string;
  // PLACEHOLDER: Marked for PrintMagic actual graphics
  image: string;
  features: string[];
}

export default function GraphicDesign({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [activeFilter, setActiveFilter] = useState<"all" | "logo" | "branding" | "social" | "mockups" | "layouts">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: "All Designs" },
    { id: "logo", label: "Logo Design" },
    { id: "branding", label: "Branding" },
    { id: "social", label: "Social Media Graphics" },
    { id: "mockups", label: "Product Mockups" },
    { id: "layouts", label: "Custom Layout Designs" }
  ];

  const projects: Project[] = [
    {
      id: "gd-1",
      title: "Cozy Brew Artisan Cafe Logo",
      category: "logo",
      categoryLabel: "Logo Design",
      description: "A warm, hand-drawn vector logo representing high-end organic coffee beans and rustic, welcoming warmth.",
      // PLACEHOLDER: Replace with actual PrintMagic Logo design
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      features: ["Hand-crafted vector curves", "Full color and monochrome variations", "Scalable svg asset formats"]
    },
    {
      id: "gd-2",
      title: "GreenFields Organic Farms Branding Suite",
      category: "branding",
      categoryLabel: "Branding & Identity",
      description: "A complete unified visual guideline including healthy color theories, warm serif typography guides, and layout schemes.",
      // PLACEHOLDER: Replace with actual PrintMagic Branding suite
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      features: ["Custom color palette selection", "Typography pairing rules", "Business stationery guidelines", "Brand asset guidelines"]
    },
    {
      id: "gd-3",
      title: "Summer Solstice Social Media Carousel",
      category: "social",
      categoryLabel: "Social Media Graphics",
      description: "Highly engaging carousel series optimized for high-converting social feeds, using active layouts and balanced typography.",
      // PLACEHOLDER: Replace with actual PrintMagic Social Media design
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
      features: ["Standard 1:1 Instagram grid ratio", "Pre-designed layered layouts", "Matching promotional typography", "High contrast visual blocks"]
    },
    {
      id: "gd-4",
      title: "Artisanal Candle Box Mockup",
      category: "mockups",
      categoryLabel: "Product Mockups",
      description: "Photorealistic 3D rendering previewing logo placement and label margins on custom organic kraft board container.",
      // PLACEHOLDER: Replace with actual PrintMagic Mockup design
      image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80",
      features: ["True 3D texture rendering", "Simulated label matte finishes", "Print-ready packaging templates"]
    },
    {
      id: "gd-5",
      title: "Grand Opening Poster Layout",
      category: "layouts",
      categoryLabel: "Custom Layout Designs",
      description: "Balanced typography grid layout highlighting event times, promo highlights, and brand logos cleanly.",
      // PLACEHOLDER: Replace with actual PrintMagic Layout design
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      features: ["Proper visual hierarchy", "Rich vector display accents", "Standard high-definition poster format"]
    },
    {
      id: "gd-6",
      title: "Clean Corporate Newsletter Brochure Layout",
      category: "layouts",
      categoryLabel: "Custom Layout Designs",
      description: "Professional, clean tri-fold layout designed with reader scannability and balanced negative space in mind.",
      // PLACEHOLDER: Replace with actual PrintMagic Layout design
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80",
      features: ["Perfect alignment margins", "Editable text grids", "Custom vector icon integration"]
    }
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const handleQuoteClick = () => {
    setCurrentPage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-12 py-12 px-4 sm:px-6 md:px-8 lg:px-10 w-full bg-white text-slate-900 min-h-screen"
      id="graphic-design-page"
    >
      {/* Page Header */}
      <div className="text-center space-y-3 pt-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Professional Graphic Design
        </h1>
        <p className="text-sm sm:text-base text-[#7D7D7D] max-w-xl mx-auto font-sans">
          We bring visual stories to life. Explore our customized design solutions—from initial logo creation to complete social campaigns and high-end layout grids.
        </p>
      </div>

      {/* Services Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
        {[
          { title: "Logo Design", text: "Unique vector identities built from scratch." },
          { title: "Branding", text: "Cohesive colors, fonts, and styling rules." },
          { title: "Social Media", text: "Vibrant promotional banners and feed templates." },
          { title: "3D Mockups", text: "See designs on apparel and packages beforehand." },
          { title: "Layouts", text: "Symmetric grids for booklets, flyers, and menus." }
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm space-y-2 text-left hover:border-amber-400/50 transition-colors">
            <h3 className="font-bold text-slate-900 text-sm font-display">{item.title}</h3>
            <p className="text-xs text-[#7D7D7D] font-sans leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Project Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4 w-full">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id as any)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none ${
              activeFilter === cat.id
                ? "bg-[#15803d] text-white font-bold border border-[#15803d] shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
            id={`filter-btn-${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between text-left hover:-translate-y-0.5 hover:border-amber-400/50 min-h-[220px]"
            id={`design-project-${project.id}`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-800 px-2.5 py-1 rounded-lg uppercase tracking-wider font-mono">
                  {project.categoryLabel}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-amber-600 font-semibold flex items-center gap-1">
                  <span>View Details</span>
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight font-display group-hover:text-amber-700 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-[#7D7D7D] font-sans leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mt-4">
              {project.features.slice(0, 2).map((feat, idx) => (
                <span key={idx} className="bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-700 px-2 py-1 rounded">
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 text-center space-y-4 w-full mt-6 shadow-xl text-white">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">Need a Fully Custom Vector Logo or Brand Identity?</h3>
        <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">
          Our layout artists are ready to bring your dreams to life! Get premium-grade source files (.AI, .PNG, .SVG, .EPS) custom-designed for your local business or personal events.
        </p>
        <button
          onClick={handleQuoteClick}
          className="px-8 py-3 bg-[#15803d] hover:bg-[#166534] text-white border border-[#15803d] rounded-lg font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center mx-auto cursor-pointer"
          id="quote-design-btn"
        >
          <span>Request a Quote Now</span>
        </button>
      </div>

      {/* PROJECT LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full border border-slate-200 text-left p-6 relative"
              id="lightbox-modal"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center justify-center font-bold shadow-md cursor-pointer focus:outline-none z-10"
                aria-label="Close"
                id="lightbox-close"
              >
                ✕
              </button>
              <div className="space-y-4 pt-2">
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider font-mono">
                    {selectedProject.categoryLabel}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1 font-display">
                    {selectedProject.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  {selectedProject.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider font-mono">
                    Key Features Included:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-sans">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      handleQuoteClick();
                    }}
                    className="px-5 py-2.5 rounded-lg bg-[#15803d] hover:bg-[#166534] text-white border border-[#15803d] font-bold text-xs shadow-md transition-all cursor-pointer inline-flex items-center"
                  >
                    <span>Quote Design</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
