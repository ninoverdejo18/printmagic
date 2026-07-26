/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [shouldMove, setShouldMove] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    // Lock scrolling on document body during intro sequence
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Start moving after 4 seconds (it stays in center for 4s, then takes 2.5s to move)
    const moveTimer = setTimeout(() => {
      setShouldMove(true);
    }, 4000);

    const redirectTimer = setTimeout(() => {
      onComplete();
    }, 7000);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(redirectTimer);
    };
  }, [onComplete]);

  const getTargetPosition = () => {
    if (windowWidth >= 1024) {
      return { left: 40, top: 44, size: 40 };
    } else if (windowWidth >= 768) {
      return { left: 32, top: 44, size: 40 };
    } else if (windowWidth >= 640) {
      return { left: 24, top: 44, size: 40 };
    } else {
      return { left: 16, top: 66, size: 40 };
    }
  };

  const target = getTargetPosition();
  const initialSize = windowWidth >= 768 ? 224 : windowWidth >= 640 ? 192 : 144;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 flex flex-col justify-between items-center z-[100] p-6 sm:p-8 overflow-hidden select-none"
      id="intro-page-container"
    >
      {/* 1. White Background Layer (Initial state) */}
      <div 
        className="absolute inset-0 bg-white transition-opacity duration-[2500ms] ease-in-out z-0"
        style={{ opacity: shouldMove ? 0 : 1 }}
      />

      {/* 2. Hero Background Image with Overlay (Revealed state, matching InkRevealIntro) */}
      <div 
        className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out z-0"
        style={{ 
          opacity: shouldMove ? 1 : 0,
          backgroundImage: "url('/PrintMagic_2k.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Top spacer */}
      <div className="h-4 relative z-10" />

      {/* Central Loading Content */}
      <div className="max-w-3xl text-center my-auto relative z-10 flex flex-col items-center justify-center space-y-6">
        
        {/* Placeholder spacer to keep layout visual balance when logo is fixed */}
        <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56" />

        {/* Minimal loading indicator */}
        <div 
          className="flex items-center gap-1.5 transition-opacity duration-500" 
          id="intro-loading-indicator"
          style={{ opacity: shouldMove ? 0 : 1 }}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-bounce"></span>
        </div>

      </div>

      {/* Main Animated Logo (Fixed for absolute freedom of motion) */}
      <motion.div
        initial={{
          position: "fixed",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
          width: initialSize,
          height: initialSize,
        }}
        animate={{
          left: shouldMove ? target.left : "50%",
          top: shouldMove ? target.top : "50%",
          x: shouldMove ? 0 : "-50%",
          y: shouldMove ? 0 : "-50%",
          width: shouldMove ? target.size : initialSize,
          height: shouldMove ? target.size : initialSize,
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
        }}
        className="z-50 select-none pointer-events-none"
        id="intro-logo-brand"
      >
        <img 
          src="/main-logo1.png" 
          alt="PrintMagic Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Bottom spacer */}
      <div className="h-4 relative z-10" />

    </motion.div>
  );
}
