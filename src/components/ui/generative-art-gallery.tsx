"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Generative Art Canvas Component
interface GenerativeArtCanvasProps {
  isHovered: boolean;
}

const GenerativeArtCanvas: React.FC<GenerativeArtCanvasProps> = ({ isHovered }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lines: Line[] = [];
    const numLines = 45; // Increased line count for a richer generative art look

    class Line {
      x: number;
      y: number;
      speed: number;
      angle: number;
      length: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.speed = Math.random() * 0.7 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.length = Math.random() * 25 + 8;
        // Brand aligned colors: Gold (#F4C542) or Emerald Green (#12941F)
        const isGold = Math.random() > 0.5;
        this.color = isGold ? "244, 197, 66" : "18, 148, 31";
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (
          this.x < 0 ||
          this.x > canvas!.width ||
          this.y < 0 ||
          this.y > canvas!.height
        ) {
          this.x = Math.random() * canvas!.width;
          this.y = Math.random() * canvas!.height;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.strokeStyle = `rgba(${this.color}, ${Math.random() * 0.4 + 0.15})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    const init = () => {
      lines = [];
      for (let i = 0; i < numLines; i++) {
        lines.push(new Line());
      }
    };

    const animate = () => {
      if (isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lines.forEach((line) => {
          line.update();
          line.draw();
        });
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.width = 400;
    canvas.height = 400;
    init();
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
    />
  );
};

// Gallery Card Component with 3D tilt effect
interface GalleryItem {
  title: string;
  category: string;
  image: string;
}

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cardVariants = {
    offscreen: { y: 40, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
        delay: index * 0.08,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants as any}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-xl bg-[#091612] border border-[#28473B]/30 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:border-[#12941F] transition-all duration-300"
    >
      <div
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 overflow-hidden h-full w-full"
      >
        {/* Full bleed, clean, high-resolution original image */}
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 select-none"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x400/0b1f18/ffffff?text=Printmagic";
          }}
        />

        {/* Generative Interactive Art Canvas on top of image */}
        <GenerativeArtCanvas isHovered={isHovered} />

        {/* Clean, dark gradient overlay for typography readability */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/95 via-black/65 to-transparent z-1 pointer-events-none" />

        {/* Caption block aligned perfectly to the bottom-left edge */}
        <div className="absolute bottom-0 inset-x-0 p-5 z-20 flex flex-col pointer-events-none">
          <motion.h3
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 5, opacity: isHovered ? 1 : 0.9 }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
            className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-[#12941F] transition-colors leading-tight drop-shadow-md"
          >
            {item.title}
          </motion.h3>
          {item.category && (
            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 15,
                delay: 0.03,
              }}
              className="text-xs text-[#CBD5D1] uppercase tracking-wider font-semibold drop-shadow-sm"
            >
              {item.category}
            </motion.p>
          )}
        </div>

        {/* Interactive hover indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-20">
          <span className="px-2.5 py-1 rounded-full bg-black/75 border border-white/10 text-[#12941F] text-[10px] font-bold uppercase tracking-wider shadow-lg">
            View Print
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// The main Gallery component
export default function GenerativeArtGallery() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  // Pro Zoom states
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragTranslateStart = useRef({ x: 0, y: 0 });

  // Reset zoom on image change or close
  useEffect(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setIsDragging(false);
  }, [selectedItemIndex]);

  // Mouse wheel zoom with Ctrl key
  useEffect(() => {
    if (selectedItemIndex === null) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();

        const img = imageRef.current;
        if (!img) return;

        const rect = img.getBoundingClientRect();
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        const mouseY = e.clientY - (rect.top + rect.height / 2);

        const delta = -e.deltaY;
        const zoomFactor = delta > 0 ? 1.15 : 1 / 1.15;

        setScale((prevScale) => {
          const nextScale = Math.min(8, Math.max(0.5, prevScale * zoomFactor));
          
          setTranslate((prev) => {
            if (nextScale === 1) return { x: 0, y: 0 };
            const factor = nextScale / prevScale;
            return {
              x: mouseX - (mouseX - prev.x) * factor,
              y: mouseY - (mouseY - prev.y) * factor,
            };
          });

          return nextScale;
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [selectedItemIndex]);

  // Window mouse dragging for panning zoomed image
  useEffect(() => {
    if (!isDragging) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      const rawX = dragTranslateStart.current.x + dx;
      const rawY = dragTranslateStart.current.y + dy;

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      const img = imageRef.current;
      if (img) {
        const rect = img.getBoundingClientRect();
        const limitX = (rect.width / scale) * scale / 2 + viewportW / 2 - 100;
        const limitY = (rect.height / scale) * scale / 2 + viewportH / 2 - 100;

        const constrainedX = Math.min(limitX, Math.max(-limitX, rawX));
        const constrainedY = Math.min(limitY, Math.max(-limitY, rawY));

        setTranslate({ x: constrainedX, y: constrainedY });
      } else {
        setTranslate({ x: rawX, y: rawY });
      }
    };

    const handleWindowMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isDragging, scale]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale <= 1) return;
    if (e.button !== 0) return; // Only left-click drag

    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    dragTranslateStart.current = { ...translate };
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    const img = imageRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const mouseX = e.clientX - (rect.left + rect.width / 2);
    const mouseY = e.clientY - (rect.top + rect.height / 2);

    if (scale !== 1) {
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    } else {
      setScale(2);
      setTranslate({
        x: mouseX - (mouseX - translate.x) * 2,
        y: mouseY - (mouseY - translate.y) * 2,
      });
    }
  };

  const galleryItems: GalleryItem[] = [
    {
      title: "Customized Acrylic Award",
      category: "",
      image: "/hppp1.jpeg",
    },
    {
      title: "Round Sticker Sheet",
      category: "",
      image: "/hppp2.jpeg",
    },
    {
      title: "Custom Graduation Sash Mockup",
      category: "",
      image: "/hppp3.jpeg",
    },
    {
      title: "PVC Sintra Signage",
      category: "",
      image: "/hppp4.jpeg",
    },
    {
      title: "Tie-Dye Customized T-Shirt",
      category: "",
      image: "/hppp5.jpeg",
    },
    {
      title: "Business Cards",
      category: "",
      image: "/hppp6.jpeg",
    },
    {
      title: "Tarpaulin Banner",
      category: "",
      image: "/hppp7.jpeg",
    },
    {
      title: "Personalized Sublimation Mug",
      category: "",
      image: "/hppp9.jpeg",
    },
  ];

  // Handle keyboard navigation & shortcuts for the Zoom modal
  useEffect(() => {
    if (selectedItemIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItemIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedItemIndex((prev) =>
          prev !== null ? (prev + 1) % galleryItems.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedItemIndex((prev) =>
          prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null
        );
      }

      // Keyboard shortcuts
      if (e.ctrlKey) {
        if (e.key === "+" || e.key === "=") {
          e.preventDefault();
          setScale((prev) => Math.min(8, prev * 1.25));
        } else if (e.key === "-") {
          e.preventDefault();
          setScale((prev) => {
            const nextScale = Math.max(0.5, prev / 1.25);
            if (nextScale === 1) setTranslate({ x: 0, y: 0 });
            return nextScale;
          });
        } else if (e.key === "0") {
          e.preventDefault();
          setScale(1);
          setTranslate({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [selectedItemIndex, galleryItems.length]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
        {galleryItems.map((item, index) => (
          <GalleryCard 
            key={item.title} 
            item={item} 
            index={index} 
            onClick={() => setSelectedItemIndex(index)}
          />
        ))}
      </div>

      {/* Zoom / Lightbox Option with perfectly aligned caption */}
      <AnimatePresence>
        {selectedItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-10"
            onClick={() => setSelectedItemIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItemIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors z-[60]"
              aria-label="Close interactive zoom view"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Navigation Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItemIndex(
                  (prev) => (prev! - 1 + galleryItems.length) % galleryItems.length
                );
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors z-50 hidden sm:block"
              aria-label="Previous gallery image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Navigation Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItemIndex((prev) => (prev! + 1) % galleryItems.length);
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors z-50 hidden sm:block"
              aria-label="Next gallery image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Zoom Display Container */}
            <div className="relative w-full max-w-5xl md:max-w-6xl flex flex-col items-center">
              <motion.div
                key={selectedItemIndex}
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: "spring", stiffness: 220, damping: 25 }}
                className="relative flex flex-col w-fit max-w-full overflow-visible mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Responsive Image frame */}
                <div 
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                  className={`relative overflow-visible flex items-center justify-center max-h-[85vh] w-fit mx-auto select-none ${
                    scale > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
                  }`}
                >
                  <img
                    ref={imageRef}
                    src={galleryItems[selectedItemIndex].image}
                    alt={galleryItems[selectedItemIndex].title}
                    onDoubleClick={handleDoubleClick}
                    style={{
                      transform: `translate3d(${translate.x}px, ${translate.y}px, 0px) scale(${scale})`,
                      willChange: "transform",
                      transformOrigin: "center center",
                    }}
                    className={`w-auto h-auto max-h-[85vh] max-w-full object-contain select-none rounded-xl ${
                      isDragging ? "" : "transition-transform duration-200 ease-out"
                    }`}
                  />
                </div>
              </motion.div>

              {/* Dot Indicators */}
              <div className="flex items-center gap-2 mt-6 select-none">
                {galleryItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === selectedItemIndex
                        ? "bg-[#F4C542] w-5"
                        : "bg-white/30 hover:bg-white/55"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
