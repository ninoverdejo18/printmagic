import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface BubbleData {
  id: number;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  size: number; // size in px
  color: string;
  glowColor: string;
  duration: number;
  delay: number;
  drift: number;
}

const BUBBLE_PALETTE = [
  { fill: "rgba(74, 222, 128, 0.5)", glow: "rgba(74, 222, 128, 0.7)" },  // Emerald
  { fill: "rgba(56, 189, 248, 0.5)", glow: "rgba(56, 189, 248, 0.7)" },  // Cyan
  { fill: "rgba(245, 158, 11, 0.5)", glow: "rgba(245, 158, 11, 0.7)" },  // Amber Gold
  { fill: "rgba(236, 72, 153, 0.5)", glow: "rgba(236, 72, 153, 0.7)" },  // Magenta
  { fill: "rgba(168, 85, 247, 0.5)", glow: "rgba(168, 85, 247, 0.7)" },  // Purple
  { fill: "rgba(52, 211, 153, 0.5)", glow: "rgba(52, 211, 153, 0.7)" },  // Mint
];

function SingleBubble({ bubble }: { bubble: BubbleData }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${bubble.x}%`,
        top: `${bubble.y}%`,
        width: `${bubble.size}px`,
        height: `${bubble.size}px`,
        background: `radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.85) 0%, ${bubble.color} 55%, rgba(0, 0, 0, 0.1) 100%)`,
        boxShadow: `0 0 ${bubble.size / 1.5}px ${bubble.glowColor}, inset 0 0 6px rgba(255, 255, 255, 0.6)`,
        border: "1px solid rgba(255, 255, 255, 0.35)",
      }}
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{
        opacity: [0, 0.85, 0.95, 0.6, 0],
        scale: [0.4, 1, 1.15, 0.9, 0.3],
        y: [0, -100, -220, -360],
        x: [0, bubble.drift, -bubble.drift, bubble.drift * 0.5],
      }}
      transition={{
        duration: bubble.duration,
        delay: bubble.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function FloatingBubbles({ className = "z-0" }: { className?: string }) {
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);

  useEffect(() => {
    const items: BubbleData[] = Array.from({ length: 55 }, (_, i) => {
      const palette = BUBBLE_PALETTE[Math.floor(Math.random() * BUBBLE_PALETTE.length)];
      return {
        id: i,
        x: Math.random() * 100,
        y: 20 + Math.random() * 80, // distributed vertically
        size: Math.floor(Math.random() * 32) + 10, // 10px to 42px
        color: palette.fill,
        glowColor: palette.glow,
        duration: 7 + Math.random() * 10, // 7s to 17s
        delay: Math.random() * 8,
        drift: (Math.random() - 0.5) * 80, // -40px to +40px horizontal drift
      };
    });
    setBubbles(items);
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden w-full h-full ${className}`}>
      {bubbles.map((bubble) => (
        <SingleBubble key={bubble.id} bubble={bubble} />
      ))}
    </div>
  );
}

export default function FloatingBubblesBackground({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B1F18] via-[#0F2D23] to-[#081812] ${className}`}>
      <FloatingBubbles />
      {children}
    </div>
  );
}
