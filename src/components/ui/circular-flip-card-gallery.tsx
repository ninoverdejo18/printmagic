"use client"

import React, { useState, useEffect, useRef } from "react"
import { Sparkles, ArrowRight, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(" ")

// --- Card Data ---
// Custom visual assets representing PrintMagic custom apparel and print designs
const cardData = [
  {
    image: "/hpp1.jpeg",
    title: "Custom Family Tees",
    description: "Soft printed cotton shirts for matching families.",
  },
  {
    image: "/hpp2.jpeg",
    title: "Custom Printed T-Shirts",
    description: "Premium cotton tees with vibrant custom graphics.",
  },
  {
    image: "/hpp3.jpeg",
    title: "Custom Couple T-Shirts",
    description: "Soft matching tees custom printed for proposals.",
  },
  {
    image: "/hpp4.jpeg",
    title: "Custom Graphic Tee",
    description: "Vibrant custom graphic prints on premium cotton.",
  },
  {
    image: "/hpp5.jpeg",
    title: "Customized Group T-Shirts",
    description: "Premium customized cotton shirts for team events.",
  },
  {
    image: "/hpp6.jpeg",
    title: "Custom Printed Couple Shirts",
    description: "Beautifully crafted matching shirts for every couple.",
  },
  {
    image: "/hpp7.jpeg",
    title: "Custom Printed T-Shirts",
    description: "Premium cotton shirts with durable graphic prints.",
  },
  {
    image: "/hpp8.jpeg",
    title: "Custom Couple T-Shirts",
    description: "High-quality personalized cotton tees for couples.",
  },
  {
    image: "/hpp9.jpeg",
    title: "Custom Couple T-Shirts",
    description: "High-quality custom matching shirts for couples.",
  },
  {
    image: "/hpp10.jpeg",
    title: "Custom Screen-Printed T-Shirts",
    description: "Premium cotton t-shirts with durable custom prints.",
  },
  {
    image: "/hpp11.jpeg",
    title: "Custom Event T-Shirts",
    description: "Premium custom printed t-shirts for special occasions.",
  },
  {
    image: "/hpp12.jpeg",
    title: "Custom Couple T-Shirts",
    description: "Premium personalized matching shirts for couples.",
  },
  {
    image: "/hpp13.jpeg",
    title: "Custom Couple T-Shirts",
    description: "Premium custom printed matching shirts for couples.",
  },
]

// --- FlipCard Component ---
interface FlipCardProps {
  key?: React.Key;
  image: string;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
  onZoom?: () => void;
}

function FlipCard({ image, title, description, className, style, onZoom }: FlipCardProps) {
  return (
    <div
      onClick={onZoom}
      className={cn(
        "absolute cursor-zoom-in [perspective:1200px]",
        className,
      )}
      style={style}
    >
      {/* Intermediate wrapper to handle scale zoom on hover/active separately from layout rotation */}
      <div className="group w-24 h-32 sm:w-32 sm:h-44 md:w-40 md:h-56 lg:w-48 lg:h-68 rounded-2xl transition-transform duration-300 ease-out hover:scale-110 active:scale-95">
        <div className="relative w-full h-full rounded-2xl shadow-xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front side - Image */}
          <div className="absolute inset-0 rounded-2xl [backface-visibility:hidden]">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover rounded-2xl border border-[#28473B]/30 shadow-sm"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://placehold.co/400x600/facc15/111111?text=Image";
              }}
            />
          </div>
          {/* Back side - Title and Description with white background and sunny yellow borders */}
          <div className="absolute inset-0 rounded-2xl bg-[#1C3A2E] border-2 border-[#28473B] flex flex-col items-center justify-center p-4 sm:p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-md select-none">
            <h3 className="font-bold text-sm sm:text-lg md:text-xl text-[#F8FAFC] mb-2 text-balance leading-snug">{title}</h3>
            <p className="text-[11px] sm:text-xs md:text-base text-[#CBD5D1] text-pretty leading-relaxed font-sans mb-5">{description}</p>
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-[#F4C542] font-semibold bg-[#0B1F18]/60 px-3.5 py-1.5 rounded-full border border-[#28473B] opacity-90">
              <span>Click to Zoom</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CircularGalleryProps {
  onNavigate?: (pageId: string) => void
}

// --- Main App Component (Circular Gallery) ---
export default function CircularGallery({ onNavigate }: CircularGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  // Smooth scroll tracking refs for interpolation (lerp)
  const autoRotationRef = useRef(0)
  const targetScrollRef = useRef(0)
  const currentScrollRef = useRef(0)

  // Zoom & Lightbox State
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [zoomScale, setZoomScale] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })

  // Listen for scroll to drive rotation dynamically & disable pointer events during scroll
  useEffect(() => {
    // Sync initial scroll position
    targetScrollRef.current = window.scrollY
    currentScrollRef.current = window.scrollY

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY
      setIsScrolling(true)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Listen for escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Reset zoom & pan when activeImage changes
  useEffect(() => {
    setZoomScale(1)
    setPanOffset({ x: 0, y: 0 })
  }, [activeImage])

  // Effect for responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (galleryRef.current) {
        const gallerySize = galleryRef.current.offsetWidth
        setSize(gallerySize)
      }
    }

    updateSize() // Initial size

    // Use ResizeObserver for better performance than window resize listener
    const resizeObserver = new ResizeObserver(updateSize)
    if (galleryRef.current) {
      resizeObserver.observe(galleryRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  // Effect for animation loop with smooth lerping of scroll position
  useEffect(() => {
    let animationFrameId: number
    const animate = () => {
      // Auto constant rotation
      autoRotationRef.current += 0.0016

      // Smoothly interpolate current scroll towards target scroll with a factor of 0.06 (buttery smooth ease)
      currentScrollRef.current += (targetScrollRef.current - currentScrollRef.current) * 0.06

      // Combined rotation (auto-rotation plus smooth gentle scroll weight)
      const combinedRotation = autoRotationRef.current + currentScrollRef.current * 0.0012
      setRotation(combinedRotation)

      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const radius = size * 0.38 // Adjusted ratio to fit the larger cards beautifully within the circle
  const centerX = size / 2
  const centerY = size / 2

  return (
    // Main container with immersive dark yellow gradient background
    <section className="font-sans bg-gradient-to-b from-[#0B1F18] via-[#132C22] to-[#0B1F18] text-white w-full min-h-[150vh] flex items-center py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Absolute decorative bg glows */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-[#F4C542]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[95rem] mx-auto flex flex-col items-center justify-center relative z-10 w-full">
        
        {/* Immersive Circular Flip-Card Gallery */}
        <div className="w-full flex flex-col items-center justify-center relative">
          <div
            ref={galleryRef}
            className="relative w-full max-w-[500px] sm:max-w-[750px] md:max-w-[950px] lg:max-w-[1100px] xl:max-w-[1250px] aspect-square flex items-center justify-center"
          >
            {/* Central text - adapted to space constraint */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none p-4">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white text-center text-balance mb-3 leading-none">
                Crafting Magic
              </h2>
              <p className="text-xs sm:text-base md:text-lg lg:text-xl font-bold text-[#F4C542] tracking-widest uppercase text-center max-w-sm">
                Premium Custom Tees
              </p>
            </div>

            {/* Circular arrangement of cards */}
            {size > 0 &&
              cardData.map((card, index) => {
                // Calculation to position cards in a circle, using our smoothly interpolated rotation
                const angle = (index / cardData.length) * 2 * Math.PI - Math.PI / 2 + rotation
                const x = centerX + radius * Math.cos(angle)
                const y = centerY + radius * Math.sin(angle)

                return (
                  <FlipCard
                    key={index}
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    className={cn(
                      "absolute hover:z-30 transition-opacity duration-300",
                      isScrolling ? "pointer-events-none select-none opacity-80" : ""
                    )}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: `translate(-50%, -50%) rotate(${(angle + Math.PI / 2) * (180 / Math.PI)}deg)`,
                    }}
                    onZoom={() => setActiveImage(card.image)}
                  />
                )
              })}
          </div>
        </div>

      </div>

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
  )
}
