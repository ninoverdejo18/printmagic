/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ImageCursorTrail } from "./ui/image-cursor-trail";
import { TubesBackground } from "./ui/neon-flow";

const PRINT_TRAIL_IMAGES = [
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop", // Graphic design print
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop", // Vibrant color poster
  "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200&auto=format&fit=crop", // Creative branding
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop", // Liquid fluid artwork
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop", // Fine art canvas print
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop", // Digital matrix design
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop", // Neon color splash
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop", // Business card suit detail
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop", // Vibrant visual art
];

export default function InkRevealIntro() {
  return (
    <div 
      className="w-full h-screen min-h-screen border-none relative overflow-hidden bg-[#0B1F18] no-liquid-cursor" 
      id="ink-reveal-intro"
      data-no-liquid-cursor="true"
    >
      <TubesBackground hoverOnly={false} autoAnimate={true} className="w-full h-full min-h-screen">
        <ImageCursorTrail
          items={PRINT_TRAIL_IMAGES}
          maxNumberOfImages={6}
          distance={22}
          fadeAnimation={true}
          imgClass="w-36 h-48 sm:w-44 sm:h-56 shadow-2xl rounded-2xl border border-white/30"
          className="w-full h-full min-h-screen flex items-center justify-center pt-20 sm:pt-24"
        >
          {/* Overlay Typography & Elements */}
          <div className="relative z-10 pointer-events-none w-full max-w-7xl mx-auto flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8 py-16">
            
            {/* Staggered Diagonal Typography Layout */}
            <div className="relative z-10 flex flex-col items-start w-full space-y-2 sm:space-y-4 md:space-y-6 select-none my-auto" id="hero-diagonal-container">
              
              {/* Caption 1: Print (Upper-Left) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                className="w-full pl-[5%] sm:pl-[12%] md:pl-[16%] text-left animate-fade-in flex flex-col items-start"
                id="caption-print-wrapper"
              >
                <h1 
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10.5rem] font-playfair font-bold leading-none text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] text-left"
                  id="caption-print"
                >
                  Print
                </h1>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-sans font-light tracking-[0.02em] text-white mt-1 sm:mt-2 lowercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-left pl-[0.5%]">
                  excellence in every creation
                </p>
              </motion.div>
      
              {/* Caption 2: Design (Slightly lower & shifted to the right) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                className="w-full pl-[20%] sm:pl-[32%] md:pl-[36%] text-left animate-fade-in flex flex-col items-start"
                id="caption-design-wrapper"
              >
                <h1 
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10.5rem] font-playfair font-bold leading-none text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] text-left"
                  id="caption-design"
                >
                  Design
                </h1>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-sans font-light tracking-[0.02em] text-white mt-1 sm:mt-2 lowercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-left pl-[0.5%]">
                  professional graphics that stand out
                </p>
              </motion.div>
      
              {/* Caption 3: Layout (Further down & farther to the right) */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
                className="w-full pl-[35%] sm:pl-[50%] md:pl-[56%] text-left animate-fade-in flex flex-col items-start"
                id="caption-layout-wrapper"
              >
                <h1 
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10.5rem] font-playfair font-bold leading-none text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] text-left"
                  id="caption-layout"
                >
                  Layout
                </h1>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-sans font-light tracking-[0.02em] text-white mt-1 sm:mt-2 lowercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-left pl-[0.5%]">
                  where every element finds its place
                </p>
              </motion.div>

            </div>

          </div>
        </ImageCursorTrail>
      </TubesBackground>
    </div>
  );
}

