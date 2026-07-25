/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

// --- TYPE DEFINITIONS ---
interface Testimonial {
  imgSrc: string;
  alt: string;
  id?: string;
}

interface AnimatedTestimonialGridProps {
  testimonials: Testimonial[];
  badgeText?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  id?: string;
  onCtaClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  renderLogo?: (testimonial: Testimonial) => React.ReactNode;
}

// --- PRE-DEFINED POSITIONS FOR THE IMAGES ---
// These positions are carefully chosen to replicate the reference image layout.
// They are responsive, with some images hidden on smaller screens.
const imagePositions = [
  // Desktop and Tablet positions
  { top: '5%', left: '15%', className: 'hidden lg:flex w-24 h-24' },
  { top: '15%', left: '35%', className: 'hidden md:flex w-20 h-20' },
  { top: '5%', left: '55%', className: 'hidden md:flex w-16 h-16' },
  { top: '10%', right: '15%', className: 'hidden lg:flex w-28 h-28' },
  { top: '25%', right: '5%', className: 'hidden md:flex w-20 h-20' },
  { top: '45%', right: '10%', className: 'hidden lg:flex w-24 h-24' },
  { top: '50%', left: '5%', className: 'hidden md:flex w-28 h-28' },
  { bottom: '5%', left: '20%', className: 'hidden lg:flex w-20 h-20' },
  { bottom: '15%', left: '45%', className: 'hidden md:flex w-16 h-16' },
  { bottom: '10%', right: '30%', className: 'hidden md:flex w-24 h-24' },
  { bottom: '2%', right: '15%', className: 'hidden lg:flex w-20 h-20' },
  // Mobile-specific positions (simpler layout)
  { top: '10%', left: '5%', className: 'flex md:hidden w-16 h-16' },
  { top: '5%', right: '10%', className: 'flex md:hidden w-20 h-20' },
  { bottom: '5%', left: '10%', className: 'flex md:hidden w-20 h-20' },
  { bottom: '10%', right: '5%', className: 'flex md:hidden w-16 h-16' },
];

// --- ANIMATION LOGIC ---
const imageVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: 'spring', 
      stiffness: 260, 
      damping: 20,
      delay: Math.random() * 0.5,
    } 
  },
};

const floatingAnimation = () => ({
  y: [0, Math.random() * -15 - 5, 0],
  transition: {
    duration: Math.random() * 4 + 5,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut',
  },
});

// --- COMPONENT ---
export const AnimatedTestimonialGrid = ({
  testimonials,
  badgeText,
  title,
  description,
  ctaText,
  ctaHref,
  className,
  id,
  onCtaClick,
  renderLogo,
}: AnimatedTestimonialGridProps) => {

  return (
    <section
      id={id}
      className={cn(
        'relative w-full py-20 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-10 overflow-hidden bg-white',
        className
      )}
    >
      {/* Absolutely Positioned Images */}
      {testimonials.slice(0, imagePositions.length).map((testimonial, index) => (
        <motion.div
          key={index}
          className={cn(
            'absolute p-0 flex items-center justify-center transition-all duration-300 bg-transparent shadow-none border-none', 
            imagePositions[index].className
          )}
          style={{ 
            top: imagePositions[index].top, 
            left: imagePositions[index].left,
            right: imagePositions[index].right,
            bottom: imagePositions[index].bottom,
          }}
          variants={imageVariants as any}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.15, zIndex: 20 }}
          custom={index}
        >
          <motion.div 
            animate={floatingAnimation() as any}
            className="w-full h-full flex items-center justify-center"
          >
            {renderLogo ? (
              renderLogo(testimonial)
            ) : (
              <img
                src={testimonial.imgSrc}
                alt={testimonial.alt}
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              />
            )}
          </motion.div>
        </motion.div>
      ))}

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {badgeText && (
          <div className="mb-4 inline-block rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
            {badgeText}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4 max-w-3xl leading-tight">
          {title}
        </h1>
        <p className="max-w-xl text-base sm:text-lg text-slate-600 mb-8 font-sans">
          {description}
        </p>
        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            onClick={onCtaClick}
            className="inline-flex items-center justify-center rounded-full bg-[#15803d] hover:bg-[#166534] px-6 py-3 text-base font-bold text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
};
