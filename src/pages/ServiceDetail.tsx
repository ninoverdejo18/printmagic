/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GradientText } from "../components/ui/gradient-text";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  Info, 
  MessageSquare, 
  ChevronDown, 
  Sparkles, 
  Printer, 
  Layers, 
  Award,
  Clock,
  ShieldCheck,
  Heart
} from "lucide-react";
import AnimatedGradient from "../components/ui/animated-gradient";

interface ServiceDetailProps {
  serviceId: string;
  setCurrentPage: (page: string) => void;
  setSelectedServiceQuote?: (serviceName: string) => void;
  setInitialPrintingCategory?: (categoryName: string) => void;
}

interface SpecItem {
  label: string;
  value: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface ServiceData {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  subtitle: string;
  image: string;
  description: string;
  features: string[];
  specs: SpecItem[];
  faqs: FaqItem[];
  bestFor: string;
  turnaroundTime: string;
}

const servicesDatabase: Record<string, ServiceData> = {
  "tarpaulin-printing": {
    id: "tarpaulin-printing",
    title: "Tarpaulin Printing",
    category: "large-format",
    categoryLabel: "Large Format Printing",
    subtitle: "Heavy-Duty Weatherproof Banners & Event Backdrops",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1200&q=80",
    description: "High-impact outdoor and indoor tarpaulins perfect for commercial billboards, birthday backdrops, grand openings, school events, and announcements. Crafted with durable weather-resistant vinyl and vibrant, smudge-free inks to guarantee maximum visibility.",
    features: [
      "High-grade sturdy material (12oz / 15oz / 18oz thickness options)",
      "Fade-resistant and 100% waterproof UV-curable ink",
      "Reinforced double fold with high-strength steel metal grommets",
      "Fast turnaround – same day rush printing available upon request"
    ],
    specs: [
      { label: "Material Options", value: "Premium Matte / Glossy Flex Banner" },
      { label: "Print Resolution", value: "High-definition 1440 DPI outdoor-stable" },
      { label: "Sizing Guide", value: "Custom sizes up to 10ft width by any length" },
      { label: "Finishing Finishes", value: "Eyelets, fold-margins, pocket loops, or clean cuts" }
    ],
    faqs: [
      { q: "How long does a tarpaulin print take?", a: "Standard turnaround is 1 to 2 business days. Same-day rush printing options may be available depending on schedule and volume." },
      { q: "Can you help with the graphic layout?", a: "Yes, we have a layout artist available to assist with your design (refer to our Layout and Design service)." },
      { q: "What file format is best for print?", a: "High-quality PDF, JPG, or PNG files at 150-300 DPI in CMYK color profile are recommended for print resolution." }
    ],
    bestFor: "Grand Openings, Birthdays, Local Store Promotions, Corporate Ads, School Events",
    turnaroundTime: "1-2 Days (Same-day rush available)"
  },
  "layout-design": {
    id: "layout-design",
    title: "Layout and Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    subtitle: "Professional Graphic Layouts & Vector Art Creation",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    description: "Stunning, professional custom layouts and graphics tailored to match your precise personal or commercial requirements. We transform your raw concepts into clean, polished vector artworks ready for digital use and premium print outputs.",
    features: [
      "Experienced in-house creative design specialists",
      "High-resolution vector assets and print-ready templates",
      "Flexible concept adjustments and collaborative revisions",
      "Deep color calibration to ensure accurate final print results"
    ],
    specs: [
      { label: "Design Software", value: "Adobe Illustrator, Photoshop & InDesign" },
      { label: "Formats Provided", value: "Print-ready PDF, JPEG, PNG, and high-res vector source files (.AI)" },
      { label: "Design Process", value: "Consultation, Concept drafts, Detailed refinement, Final hand-off" },
      { label: "Standard Turnaround", value: "1 to 3 business days depending on complexity" }
    ],
    faqs: [
      { q: "Do I get full ownership of the final design?", a: "Yes, you receive rights to the approved custom layout design, including vector source files upon project completion." },
      { q: "How many revisions do I get?", a: "Standard revision rounds are provided during the design phase to align the layout with your preferences." },
      { q: "Can you design a brand logo from scratch?", a: "Yes, logo design is available to help create visual brand identities for local businesses." }
    ],
    bestFor: "Brand Identity, Custom Flyers, Menu Boards, Tarpaulin Layouts, Logo Creations",
    turnaroundTime: "1-3 Days"
  },
  "souvenirs-giveaways": {
    id: "souvenirs-giveaways",
    title: "Souvenirs & Corporate Giveaways",
    category: "promotional-items",
    categoryLabel: "Promotional Items",
    subtitle: "Customized Keepsakes, Brand Merchandise & Souvenirs",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=80",
    description: "Delight your guests, clients, and employees with fully customized corporate giveaways and event souvenirs. From custom-printed mugs, keychains, and tote bags to high-end company gifts, we offer items tailored for your events.",
    features: [
      "Vibrant custom prints that resist washing and daily wear",
      "Wide range of custom products (mugs, keychains, tote bags, umbrellas, pens)",
      "Perfect for corporate events, weddings, baptisms, and birthdays",
      "Generous volume discount rates for bulk print requests"
    ],
    specs: [
      { label: "Available Items", value: "White Mugs, Magic Mugs, Acrylic Keychains, Canvas Tote Bags, Custom Pens" },
      { label: "Print Methods", value: "High-grade Sublimation, Heat Transfer, and UV direct printing" },
      { label: "Min Order Count", value: "No strict minimums, but bulk pricing applies at 20+ units" },
      { label: "Packaging Options", value: "Individual boxes, clear acetate styling options available" }
    ],
    faqs: [
      { q: "Can I print different names on each mug or giveaway?", a: "Yes, individual personalization (such as specific guest names) is supported for keychains, mugs, and badges." },
      { q: "Do you offer discounts for school or company events?", a: "Yes, volume discount pricing is available for bulk corporate or school event orders." },
      { q: "How are the canvas tote bags printed?", a: "Heat transfer or digital printing methods are used to deliver durable, washable tote bag prints." }
    ],
    bestFor: "Weddings, Baptisms, Company Anniversary Gifts, Team Merch, Trade Show Promos",
    turnaroundTime: "3-5 Days (Depending on quantity)"
  },
  "document-scanning-printing": {
    id: "document-scanning-printing",
    title: "Document Scanning & Printing",
    category: "digital-services",
    categoryLabel: "Digital Services",
    subtitle: "High-Speed Digitization & High-Quality Document Printing",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80",
    description: "Efficient and high-volume laser printing, copying, and high-speed document scanning. Whether you need corporate brochures, legal files, student reviews, or high-volume paperwork duplicated, we offer fast, clean, smudge-free prints on premium paper.",
    features: [
      "High-speed industrial digital printers and document scanners",
      "Rich monochrome and high-fidelity color document replication",
      "Crisp text and high-contrast lines on high-grade paper",
      "Organized document collating, booklet stapling, and soft binding"
    ],
    specs: [
      { label: "Paper Sizes", value: "Letter (Short), Legal (Long), A4, A3, and custom paper sizing" },
      { label: "Paper Weight", value: "70gsm, 80gsm copy paper, and premium 220gsm board cardstocks" },
      { label: "Scan Formats", value: "Direct scan to PDF, JPEG, or structured Multi-page documents" },
      { label: "Finishing Services", value: "Lamination, Comb/Spiral Binding, Stapling, and Ring Binding" }
    ],
    faqs: [
      { q: "Can I email my files to you for printing?", a: "Yes, you can send documents via email or Facebook Messenger for printing and pick up." },
      { q: "Do you offer legal-size scanning?", a: "Yes, scanning is available for short, A4, and long legal-size documents directly into PDF formats." },
      { q: "Do you support double-sided document printing?", a: "Yes, automated double-sided (duplex) black-and-white and color printing options are available." }
    ],
    bestFor: "School Handouts, Legal Forms, Portfolios, Resume Packets, Office Duplication",
    turnaroundTime: "Same-Day / Immediate"
  },
  "rush-id": {
    id: "rush-id",
    title: "Rush ID Photo Services",
    category: "promotional-items",
    categoryLabel: "Promotional Items",
    subtitle: "Instant Professional ID Photos & Government Form ID Prints",
    image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=1200&q=80",
    description: "Professional quality instant studio photo prints and ID cards. Ideal for passport applications, visa files, school IDs, driver's licenses, and company records. Includes professional background removal, skin tone tuning, and premium smudge-free gloss photo paper.",
    features: [
      "Premium background replacements (White, Blue, Red, Custom colors)",
      "High-resolution professional photo capture and facial alignment",
      "Printed on premium smudge-resistant water-resistant gloss paper",
      "Super-fast 10-minute printing – pick up your photos immediately"
    ],
    specs: [
      { label: "Available Sizes", value: "1x1 inch, 2x2 inches, Passport size, and custom collage sets" },
      { label: "Paper Grade", value: "260gsm thick ultra-glossy photo paper" },
      { label: "Editing Includes", value: "Basic retouching, suit-template replacement, and color balancing" },
      { label: "Turnaround", value: "Immediate – printed and cut within 10 to 15 minutes" }
    ],
    faqs: [
      { q: "Do you provide digital copies of my ID photo?", a: "Yes, cropped digital files can be sent to your email or social media inbox upon request." },
      { q: "Can you change my casual clothes to formal attire digitally?", a: "Yes, digital overlays for formal coats, suits, or collared shirts are available for ID photo orders." },
      { q: "Are passport-size photos compliant with government requirements?", a: "Passport-size photo captures follow standard guidelines for dimensions, background colors, and framing." }
    ],
    bestFor: "Job Applications, School Enrollments, Visa Documents, Professional Licenses",
    turnaroundTime: "10-15 Minutes"
  },
  "business-cards": {
    id: "business-cards",
    title: "Business Cards / Calling Cards",
    category: "business-printing",
    categoryLabel: "Business Printing",
    subtitle: "Premium Calling Cards with Beautiful Finishes",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1200&q=80",
    description: "Make an unforgettable, highly professional statement with our premium-grade custom business cards. Designed with high-contrast color depth, thick materials, and modern finishes. Perfect for business meetings, corporate reps, and personal branding.",
    features: [
      "Printed on premium extra-thick board stock (220gsm - 300gsm)",
      "Beautiful finishes including Matte, Glossy, and Satin laminations",
      "Vibrant colors with scratch-proof dual-sided plastic coating",
      "Rounded corners and custom size formats to match your style"
    ],
    specs: [
      { label: "Standard Size", value: "90mm x 54mm (custom sizing available)" },
      { label: "Finishes", value: "Uncoated, Matte Laminated, Gloss Laminated, Water-resistant plastic layer" },
      { label: "Print Sides", value: "Single-sided or High-fidelity Double-sided prints" },
      { label: "Minimum Order", value: "1 box (contains 100 premium cards)" }
    ],
    faqs: [
      { q: "Do my cards come with storage containers?", a: "Acrylic storage cases are provided with business card orders to help keep them organized." },
      { q: "Can you print cards with custom curved corners?", a: "Yes, rounded corner cutting options are available." },
      { q: "Can I use different names in a single business card order?", a: "Business cards are printed in single-design batches per box of 100." }
    ],
    bestFor: "Executive Branding, Store Cards, Service Appointments, VIP Invites",
    turnaroundTime: "1-2 Days"
  },
  "tshirt-printing": {
    id: "tshirt-printing",
    title: "T-Shirt Printing",
    category: "apparel-printing",
    categoryLabel: "Apparel Printing",
    subtitle: "Customized Apparel, Team Uniforms & Statement Shirts",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    description: "Comfortable, premium custom t-shirts printed with state-of-the-art methods like Sublimation, Direct-to-Film (DTF), and Premium Vinyl. Perfect for corporate uniforms, barangay tournaments, family reunions, school clubs, or personal streetwear designs.",
    features: [
      "High-durability prints that do not crack, peel, or fade in wash",
      "Cotton-blend and dry-fit fabrics tailored for active lifestyles",
      "Vibrant full-color reproduction on light and dark fabrics",
      "Quick layout assistance – digital mockups created before printing starts"
    ],
    specs: [
      { label: "Print Methods", value: "Direct-to-Film (DTF), Sublimation, Vinyl transfer, and silk screen printing" },
      { label: "Fabric Quality", value: "Premium combed cotton, Cotton-polyester, and Active Dry-Fit mesh" },
      { label: "Sizes Available", value: "Adult XS to 3XL, Kids sizes available" },
      { label: "Turnaround", value: "3 to 5 days standard, same day available for small batches of active dry-fit" }
    ],
    faqs: [
      { q: "How should I wash my custom printed shirt?", a: "Washing inside-out with gentle detergent and avoiding direct ironing over printed areas is recommended." },
      { q: "Can I bring my own blank shirts for printing?", a: "Print-only services are available for customer-supplied garments subject to fabric testing." },
      { q: "Is there a minimum order count?", a: "Single-item custom shirt printing is available, with volume pricing offered for larger quantity orders." }
    ],
    bestFor: "Barangay Tournaments, School Reunions, Corporate Uniforms, Campaign Promos",
    turnaroundTime: "3-5 Days (Same-day active dry-fit options available)"
  },
  "pvc-id-lace": {
    id: "pvc-id-lace",
    title: "PVC ID & ID Lace",
    category: "promotional-items",
    categoryLabel: "Promotional Items",
    subtitle: "High-Durability Corporate Badges & Custom Sublimated Lanyards",
    image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=1200&q=80",
    description: "Professional-grade, heavy-duty plastic PVC cards and premium sublimated ID lanyards. Ideal for student IDs, official company badges, visitor passes, and security access cards. Print on sturdy PVC material that resists bending, breaking, and moisture.",
    features: [
      "ATM-card grade durable PVC material (thick, glossy, or matte)",
      "High-contrast dual-sided colors that stay bright over years",
      "Custom sublimated lanyard laces with high-quality metal clips",
      "Safety breakaway attachments and plastic ID card holders available"
    ],
    specs: [
      { label: "Card Grade", value: "Premium Grade-A PVC (ISO standard ATM thickness - 30 mil)" },
      { label: "Lanyard Width", value: "3/4 inch (19mm) or 1 inch (25mm) width options" },
      { label: "Clips & Hooks", value: "Heavy-duty alligator clips, trigger hooks, and keyrings" },
      { label: "Security Extras", value: "Barcode printing, magnetic stripe options, and photo badge slots" }
    ],
    faqs: [
      { q: "Are your PVC IDs water-resistant?", a: "PVC cards and lamination layers are water-resistant under standard everyday use." },
      { q: "Can we submit our own ID list in Excel?", a: "Yes, structured Excel files with matching photo filenames can be accepted for batch processing." },
      { q: "Do you supply ID cases?", a: "Clear plastic card protectors, hard plastic cases, and retractable badge reels are available." }
    ],
    bestFor: "Student IDs, Office Credentials, Event Access Badges, Membership Clubs",
    turnaroundTime: "2-3 Days"
  },
  "nameplates": {
    id: "nameplates",
    title: "Premium Nameplates",
    category: "large-format",
    categoryLabel: "Large Format Printing",
    subtitle: "Professional Desk, Office Door, & Sintra Board Nameplates",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
    description: "Sleek, high-polish office nameplates, employee desk signs, door labels, and outdoor Sintra board indicators. Customized to match your precise branding and layout preferences, these nameplates lend a professional touch to your office workspace.",
    features: [
      "High-rigidity lightweight PVC Sintra boards (3mm / 5mm thickness)",
      "High-contrast, elegant modern font pairings and color finishes",
      "Pre-applied heavy-duty industrial double-sided adhesive for easy mounting",
      "Moisture-resistant and easy to clean with a damp microfiber cloth"
    ],
    specs: [
      { label: "Thickness Options", value: "3mm, 5mm Sintra Board, or Laser-cut Acrylic sheets" },
      { label: "Mounting Option", value: "Industrial-grade double-sided tape, metal standoffs, or desk bases" },
      { label: "Finishing Finish", value: "Matte, Glossy, or Laminated UV protective film" },
      { label: "Design Style", value: "Custom logo placement, name text, department, and custom accents" }
    ],
    faqs: [
      { q: "Can I stick Sintra Board nameplates onto rough walls?", a: "Heavy-duty mounting tape is included, though rough concrete surfaces may require additional silicone mounting." },
      { q: "Do you offer desktop metal or wood stands?", a: "Acrylic slot bases and desktop frames are available for standing desk displays." },
      { q: "Are the names written on nameplates customizable?", a: "Yes, nameplates are custom designed with individual employee names, titles, and department details." }
    ],
    bestFor: "Executive Desks, Doctor's Clinics, Office Door Labels, Classroom Labels",
    turnaroundTime: "1-2 Days"
  },
  "stickers": {
    id: "stickers",
    title: "Stickers & Decals",
    category: "large-format",
    categoryLabel: "Large Format Printing",
    subtitle: "Custom Waterproof Product Labels, Stickers & Decals",
    image: "https://images.unsplash.com/photo-1572375995501-4b0894dbe0d1?auto=format&fit=crop&w=1200&q=80",
    description: "High-durability adhesive stickers, product labels, and custom decals. Made from premium vinyl that is completely waterproof, scratch-resistant, and tear-proof. Perfect for custom product jars, shipping boxes, car bumpers, window storefront decals, and branding giveaways.",
    features: [
      "Printed on premium waterproof, smudge-proof vinyl",
      "Die-cut or Kiss-cut sheets tailored exactly to your custom logo shape",
      "Matte, Glossy, or Transparent background options",
      "Strong adhesive that sticks firmly but leaves no messy residue upon removal"
    ],
    specs: [
      { label: "Substrate Material", value: "Glossy Vinyl, Matte Vinyl, Transparent Film, Kraft Paper" },
      { label: "Cutting Layout", value: "Precision die-cut, kiss-cut sheets, or roll labels" },
      { label: "Water Resistance", value: "100% waterproof, smudge-proof, and safe for refrigeration" },
      { label: "DPI Print Resolution", value: "Stunning photographic-quality 1440 DPI print run" }
    ],
    faqs: [
      { q: "Are these stickers safe for frozen food packaging?", a: "High-grade vinyl stickers are moisture-resistant and suitable for refrigerated containers and jars." },
      { q: "What is the difference between Die-Cut and Kiss-Cut?", a: "Die-cut stickers are sliced through both the vinyl and backing paper, while kiss-cut stickers are cut through the top adhesive layer on a sheet." },
      { q: "What is the smallest sticker size you can print?", a: "Readable text printing is supported on small custom sticker sizes." }
    ],
    bestFor: "Cosmetic Labels, Coffee Jars, Pastry Bags, Vehicle Decals, Laptop Stickers",
    turnaroundTime: "1-2 Days (Same-day express sheet printing available)"
  }
};

export default function ServiceDetail({ 
  serviceId, 
  setCurrentPage, 
  setSelectedServiceQuote, 
  setInitialPrintingCategory 
}: ServiceDetailProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const normalizedId = serviceId === "business-card" ? "business-cards" : serviceId === "nameplate" ? "nameplates" : serviceId;
  const data = servicesDatabase[normalizedId] || servicesDatabase[serviceId];

  // Auto-scroll to top when page loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [serviceId]);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center text-slate-900 space-y-4 font-sans bg-white">
        <h2 className="text-2xl font-bold text-[#12941F]">Service Not Found</h2>
        <p className="text-sm text-slate-600">The requested service profile could not be located in our catalog database.</p>
        <button 
          onClick={() => setCurrentPage("home")}
          className="px-6 py-2.5 rounded-lg bg-[#15803d] text-white hover:bg-[#166534] font-bold text-sm cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleBackToMain = () => {
    if (setInitialPrintingCategory && data.category) {
      setInitialPrintingCategory(data.category);
    }
    // Route to appropriate parent list
    if (data.id === "layout-design") {
      setCurrentPage("graphic-design");
    } else if (data.id === "document-scanning-printing") {
      setCurrentPage("digital-services");
    } else {
      setCurrentPage("home");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuoteRedirect = () => {
    if (setSelectedServiceQuote) {
      setSelectedServiceQuote(data.title);
    }
    setCurrentPage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative py-10 px-4 sm:px-6 md:px-8 lg:px-10 w-full bg-slate-950 text-white min-h-screen overflow-hidden"
      id={`service-detail-page-${data.id}`}
    >
      {/* Full screen / full section animated gradient background with reduced white */}
      <AnimatedGradient 
        config={{ 
          preset: "custom",
          color1: "#032412", // Deep Dark Green
          color2: "#ffea00", // Bright Yellow
          color3: "#0b3c21", // Dark Forest Green (reduced white to subtle dark green tone)
          speed: 3,         // Smooth slow movement
          rotation: -45,
          proportion: 40,
          scale: 0.6,
          distortion: 25,
          swirl: 60,
          swirlIterations: 8,
          softness: 100,
          shape: "Edge",
          shapeSize: 40
        }} 
        className="absolute inset-0 w-full h-full" 
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-h-[40vh] lg:min-h-[50vh] py-6">
          <div className="lg:col-span-7 space-y-5 text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14A823] tracking-tight leading-tight font-display">
              {data.title}
            </h1>

            <p className="text-sm sm:text-base text-[#C4C4C4] font-sans leading-relaxed max-w-2xl drop-shadow">
              {data.description}
            </p>
          </div>

          {/* Right Column: Giant Promo Hero card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900/70 backdrop-blur-sm h-[280px] sm:h-[350px] lg:h-[400px] group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
                <h3 className="text-lg font-bold text-[#14A823] mt-1">High-Quality Vibrant Graphics</h3>
                <p className="text-xs text-[#C4C4C4] font-sans mt-0.5">We use industrial ink heads designed to resist fading under Batangas sun and rain.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Split: Features, Specs, FAQ and Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          
          {/* LEFT: FAQs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Interactive Collapsible FAQ Section */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#14A823] font-display text-left">
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-3">
                {data.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-800/80 cursor-pointer focus:outline-none transition-all"
                        id={`faq-toggle-btn-${idx}`}
                      >
                        <span className="text-xs sm:text-sm font-bold text-[#DEDEDE] font-display leading-tight">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-[#14A823] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-slate-800"
                          >
                            <div className="px-5 py-4 text-xs sm:text-sm text-[#C4C4C4] font-sans text-left leading-relaxed bg-slate-950/60">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: Direct Call-to-Action Quotation Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Custom Quote Submission Block */}
            <div className="bg-slate-900/90 backdrop-blur-md text-white border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 text-left shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#14A823]/10 rounded-full blur-xl -mr-6 -mt-6"></div>
              
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#14A823] font-display leading-tight">
                  Need a Customized Quote for {data.title}?
                </h3>
                <p className="text-xs text-[#C4C4C4] font-sans leading-relaxed">
                  Tell us your exact sizes, quantities, or layout preferences. We will calculate a budget-friendly price quotation for you immediately!
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  onClick={handleQuoteRedirect}
                  className="w-full py-3 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs sm:text-sm rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md transform hover:-translate-y-0.5"
                  id="service-detail-quote-btn"
                >
                  <span>Request Instant Quotation</span>
                </button>
                
                <a
                  href="https://www.facebook.com/Printmagic29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#132C22] hover:bg-[#1C3A2E] border border-[#28473B] text-white font-bold text-xs sm:text-sm rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  id="service-detail-chat-btn"
                >
                  <span>Chat on Facebook Messenger</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
