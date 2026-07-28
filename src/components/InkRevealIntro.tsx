/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TubesBackground } from "./ui/neon-flow";

export default function InkRevealIntro() {
  return (
    <div 
      className="w-full h-screen min-h-screen border-none relative overflow-hidden bg-[#0B1F18] no-liquid-cursor" 
      id="ink-reveal-intro"
      data-no-liquid-cursor="true"
    >
      <TubesBackground 
        hoverOnly={false} 
        autoAnimate={true} 
        bgImage="/bg-hero-section1.webp"
        bgImageMobile="/printmagic_new_2k_mobile_view.webp"
        bgOverlayClass=""
        className="w-full h-full min-h-screen bg-transparent relative z-10"
      />
    </div>
  );
}

