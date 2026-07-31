"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
}

interface SocialCardsProps {
  cards: CardItem[];
}

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7,  scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, zIndex: 10 },
  { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, zIndex: 3 },
  { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, zIndex: 2 },
  { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, zIndex: 1 },
];

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

/**
 * Returns a multiplier (0..1] that scales y-offsets and entry animation
 * distances when the viewport is too short for the ideal layout height.
 */
function getHeightMultiplier(width: number) {
  // Ideal layout heights (in px at 16px root) matching the CSS breakpoints
  let idealPx: number;
  if (width < 480) idealPx = 26 * 16;       // 416px
  else if (width < 640) idealPx = 32 * 16;  // 512px
  else if (width < 768) idealPx = 34 * 16;  // 544px
  else if (width < 1024) idealPx = 36 * 16; // 576px
  else idealPx = 38 * 16;                    // 608px

  const available = window.innerHeight * 0.7; // 70vh budget
  if (available >= idealPx) return 1;
  return available / idealPx;
}

function getSlotConfig(totalCards: number, slot: number) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-[16px] text-black/40 dark:text-white/55 cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-black/25 dark:hover:border-white/25 hover:text-black/70 dark:hover:text-white/80 active:opacity-70 transition-colors duration-300 before:content-[''] before:absolute before:inset-[3px] before:rounded-full before:border before:border-black/[0.04] dark:before:border-white/[0.04] before:pointer-events-none";

export default function SocialCards({ cards }: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());

  const totalCards = cards.length;
  const needsPagination = totalCards > MAX_VISIBLE;
  const [centerIndex, setCenterIndex] = useState(needsPagination ? HALF : totalCards >> 1);

  // Zoom & Lightbox State for Fan Carousel
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Reset zoom & pan when activeImage changes
  useEffect(() => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  }, [activeImage]);

  // Listen for escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getVisibleMap = useCallback((center: number) => {
    const map = new Map<number, number>();
    if (!needsPagination) {
      cards.forEach((_, i) => map.set(i, i));
      return map;
    }
    for (let slot = 0; slot < MAX_VISIBLE; slot++) {
      map.set(((center + slot - HALF) % totalCards + totalCards) % totalCards, slot);
    }
    return map;
  }, [totalCards, needsPagination, cards]);

  const cycle = useCallback((direction: "left" | "right") => {
    if (isAnimating.current || !needsPagination) return;
    isAnimating.current = true;
    directionRef.current = direction;
    setCenterIndex(prev =>
      direction === "right" ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
    );
  }, [totalCards, needsPagination]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = needsPagination ? MAX_VISIBLE : totalCards;
    const config = (slot: number) => getSlotConfig(slotCount, slot);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card as any, { x: 0, y: `${12 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card as any, { ...target, duration: 1.2, ease: "elastic.out(1.05,.78)", delay: 0.2 + slot * 0.06, onComplete: onCardDone });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 40 : -40;
          gsap.set(card as any, { x: `${enterX}rem`, y: `${y * hMult}rem`, rotation: direction === "right" ? 30 : -30, scale: 0.5, opacity: 0 });
          gsap.to(card as any, { ...target, duration: 0.6, ease: "power2.out", onComplete: onCardDone });
        } else {
          gsap.to(card as any, { ...target, duration: 0.5, ease: "power2.out", onComplete: onCardDone });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -40 : 40;
        gsap.to(card as any, { x: `${exitX}rem`, opacity: 0, scale: 0.5, rotation: direction === "right" ? -30 : 30, duration: 0.4, ease: "power2.in", zIndex: 0 });
      } else if (isFirstMount) {
        gsap.set(card as any, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    // Hover interactions
    const visibleEntries: { el: HTMLElement; slot: number }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el: el as HTMLElement, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot: number | null = null;
    let leaveTimer: NodeJS.Timeout | null = null;
    const centerSlot = visibleEntries.length >> 1;

    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetScale *= 1.08;
          } else {
            const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength = 8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot) targetY -= 1 * hM;
            if (slot === 0 && hoveredSlot > centerSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`, y: `${targetY}rem`, rotation: targetRot, scale: targetScale,
          duration: 0.5, delay, ease: "elastic.out(1,.75)", overwrite: "auto",
        });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
        if (activeSlot !== slot) { activeSlot = slot; updateHoverLayout(slot); }
      };
      el.addEventListener("mouseenter", handler);
      return { el, handler };
    });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => { activeSlot = null; updateHoverLayout(null); }, 50);
    };
    container.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => { if (!isAnimating.current) updateHoverLayout(activeSlot); };
    window.addEventListener("resize", onResize);

    return () => {
      enterHandlers.forEach(({ el, handler }) => el.removeEventListener("mouseenter", handler));
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [centerIndex, totalCards, getVisibleMap, needsPagination]);

  if (!totalCards) return null;

  const chevron = (direction: "left" | "right") => (
    <svg className="relative z-[2] w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  return (
    <section className="flex flex-col items-center w-full py-2 px-4 relative z-20 pointer-events-none">
      <div className="flex items-center justify-center w-full max-w-[90rem] relative z-10">
        <div ref={containerRef} className="fan-layout flex relative justify-center items-center w-full h-[26rem] sm:h-[32rem] md:h-[38rem] max-w-[80rem]">
          {cards.map((card, index) => {
            const image = (
              <div 
                onClick={() => setActiveImage(card.imgUrl)}
                className="relative w-32 h-44 sm:w-48 sm:h-68 md:w-64 md:h-92 overflow-hidden rounded-2xl p-[3px] bg-gradient-to-tr from-[#F4C542] to-[#FFD85A] shadow-[0_0_20px_rgba(244,197,66,0.2)] hover:shadow-[0_0_35px_rgba(255,216,90,0.5)] transition-all duration-300 cursor-zoom-in group"
              >
                <div className="relative w-full h-full overflow-hidden rounded-[14px] bg-neutral-950">
                  <img src={card.imgUrl} loading="lazy" alt={card.alt || `Card ${index}`} className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-300 group-hover:scale-105" />
                </div>
              </div>
            );
            return card.linkUrl ? (
              <a key={index} href={card.linkUrl} target={card.linkUrl.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="fan-card block cursor-pointer absolute pointer-events-auto">{image}</a>
            ) : (
              <div key={index} className="fan-card absolute pointer-events-auto">{image}</div>
            );
          })}
        </div>
      </div>

      {/* Curved Caption positioned below the cards, bent according to the images alignment */}
      <div className="w-full max-w-[320px] sm:max-w-[480px] md:max-w-[640px] -mt-10 sm:-mt-16 md:-mt-20 lg:-mt-24 text-center z-30 pointer-events-auto relative mx-auto overflow-visible">
        <svg viewBox="0 0 600 120" className="w-full overflow-visible">
          {/* A path curving upwards in the center (arch shape matching card alignment) */}
          <path 
            id="text-curve" 
            d="M 30,110 Q 300,30 570,110" 
            fill="none" 
            stroke="none"
          />
          <text 
            className="font-display font-black uppercase tracking-widest"
            fontSize="32"
            style={{ 
              fontFamily: '"Space Grotesk", "Inter", system-ui, sans-serif'
            }}
          >
            <textPath href="#text-curve" startOffset="50%" textAnchor="middle" fill="#F4C542">
              Personalan Ba? PrintMagic na!
            </textPath>
          </text>
        </svg>
      </div>

      {needsPagination && (
        <div className="flex items-center justify-center gap-4 mt-2 z-30 pointer-events-auto">
          <button className={`${ARROW_CLASSES} w-8 h-8 md:w-10 md:h-10`} onClick={() => cycle("left")} aria-label="Previous">
            {chevron("left")}
          </button>
          <div className="flex items-center gap-1.5">
            {cards.map((_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === centerIndex ? "bg-amber-500 scale-[1.3]" : "bg-black/15"}`} />
            ))}
          </div>
          <button className={`${ARROW_CLASSES} w-8 h-8 md:w-10 md:h-10`} onClick={() => cycle("right")} aria-label="Next">
            {chevron("right")}
          </button>
        </div>
      )}

      {/* Lightbox Zoom Overlay */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 select-none cursor-default"
            onClick={() => setActiveImage(null)}
          >
            {/* Top Control Bar */}
            <div 
              className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 bg-[#0B1F18]/80 backdrop-blur-md border border-[#28473B]/50 px-3 py-1.5 rounded-full pointer-events-auto shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#F4C542] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-semibold text-[#CBD5D1] font-mono uppercase tracking-wider">
                  Zoom: {Math.round(zoomScale * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                {/* Control buttons */}
                <div className="flex items-center gap-1 bg-[#0B1F18]/80 backdrop-blur-md border border-[#28473B]/50 p-1 rounded-full shadow-md">
                  <button
                    onClick={() => setZoomScale(prev => Math.min(prev + 0.5, 4))}
                    className="p-1.5 sm:p-2 hover:bg-[#1C3A2E] rounded-full text-[#CBD5D1] hover:text-[#F4C542] transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setZoomScale(prev => Math.max(prev - 0.5, 1))}
                    className="p-1.5 sm:p-2 hover:bg-[#1C3A2E] rounded-full text-[#CBD5D1] hover:text-[#F4C542] transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setZoomScale(1)
                      setPanOffset({ x: 0, y: 0 })
                    }}
                    className="p-1.5 sm:p-2 hover:bg-[#1C3A2E] rounded-full text-[#CBD5D1] hover:text-[#F4C542] transition-colors"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <button
                  onClick={() => setActiveImage(null)}
                  className="p-2 bg-[#0B1F18]/80 hover:bg-[#1C3A2E] backdrop-blur-md border border-[#28473B]/50 rounded-full text-[#CBD5D1] hover:text-white transition-colors shadow-md"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Instruction Footer */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0B1F18]/80 backdrop-blur-md border border-[#28473B]/50 px-4 py-2 rounded-full text-center max-w-[90%] text-[10px] sm:text-xs text-[#CBD5D1] z-50 pointer-events-none select-none shadow-lg">
              {zoomScale > 1 ? (
                <span>Drag or scroll to pan the clear details</span>
              ) : (
                <span>Use controls to zoom or double-click to expand</span>
              )}
            </div>

            {/* Image Container with smooth dragging support */}
            <div 
              className="relative w-full h-full max-w-4xl max-h-[75vh] flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => {
                if (zoomScale <= 1) return
                setIsDragging(true)
                dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y }
              }}
              onMouseMove={(e) => {
                if (!isDragging || zoomScale <= 1) return
                const newX = e.clientX - dragStart.current.x
                const newY = e.clientY - dragStart.current.y
                setPanOffset({ x: newX, y: newY })
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchStart={(e) => {
                if (zoomScale <= 1 || e.touches.length !== 1) return
                setIsDragging(true)
                const touch = e.touches[0]
                dragStart.current = { x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y }
              }}
              onTouchMove={(e) => {
                if (!isDragging || zoomScale <= 1 || e.touches.length !== 1) return
                const touch = e.touches[0]
                const newX = touch.clientX - dragStart.current.x
                const newY = touch.clientY - dragStart.current.y
                setPanOffset({ x: newX, y: newY })
              }}
              onTouchEnd={() => setIsDragging(false)}
              onDoubleClick={() => {
                if (zoomScale > 1) {
                  setZoomScale(1)
                  setPanOffset({ x: 0, y: 0 })
                } else {
                  setZoomScale(2)
                }
              }}
            >
              <motion.img
                layoutId={`lightbox-img-${activeImage}`}
                src={activeImage}
                alt="Clear detailed print view"
                className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-75 select-none ${
                  zoomScale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                }`}
                style={{
                  transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`,
                }}
                draggable={false}
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
