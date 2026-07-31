import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

/* -----------------------------------------------------------------------------
 * Pixel canvas
 * Animated grid of pixels that ripples in from the center on hover and fades
 * out on leave. Colors are drawn from the card's brand palette.
 * -------------------------------------------------------------------------- */

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInt: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  draw: () => void;
  appear: () => void;
  disappear: () => void;
  shimmer: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const p: Pixel = {
    x,
    y,
    color,
    ctx,
    speed: rand(0.1, 0.9) * baseSpeed,
    size: 0,
    sizeStep: Math.random() * 0.4,
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    delay,
    counter: 0,
    counterStep: Math.random() * 4 + (canvas.width + canvas.height) * 0.01,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) {
        p.counter += p.counterStep;
        return;
      }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer();
      else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false;
      p.counter = 0;
      if (p.size <= 0) {
        p.isIdle = true;
        return;
      }
      p.size -= 0.1;
      p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed;
      else p.size += p.speed;
    },
  };

  return p;
}

type PixelCanvasProps = {
  colors: string[];
  gap?: number;
  speed?: number;
};

function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    if (w === 0 || h === 0) return;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy);
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
      }
    }

    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;

    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);

      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();

      if (pixels.every((p) => p.isIdle)) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    init();

    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);

    const card = wrapRef.current?.parentElement;
    const handleEnter = () => animate("appear");
    const handleLeave = () => animate("disappear");
    card?.addEventListener("mouseenter", handleEnter);
    card?.addEventListener("mouseleave", handleLeave);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
      card?.removeEventListener("mouseenter", handleEnter);
      card?.removeEventListener("mouseleave", handleLeave);
    };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Custom Brand Logo SVG Components
 * -------------------------------------------------------------------------- */

const GreenwichLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#00472F" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#FFC72C" strokeWidth="1.5" />
    <g transform="translate(50, 40) rotate(-15)">
      <path d="M-18 -15 Q0 -25 18 -15 L22 -10 Q0 -20 -22 -10 Z" fill="#D97706" />
      <polygon points="-16,-13 16,-13 0,22" fill="#FFC72C" stroke="#FF9F00" strokeWidth="0.5" />
      <circle cx="-5" cy="-5" r="3.5" fill="#E11D48" />
      <circle cx="6" cy="-7" r="3.5" fill="#E11D48" />
      <circle cx="1" cy="4" r="3.5" fill="#E11D48" />
      <path d="M-10 -2 L-7 -3 L-8 -5 L-11 -4 Z" fill="#16A34A" />
      <path d="M8 2 L11 1 L10 -1 L7 0 Z" fill="#16A34A" />
    </g>
    <text x="50" y="74" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11" fontWeight="800" fill="#FFFFFF" textAnchor="middle" letterSpacing="-0.2">greenwich</text>
    <text x="50" y="83" fontFamily="system-ui, -apple-system, sans-serif" fontSize="4.5" fontWeight="700" fill="#FFC72C" textAnchor="middle" letterSpacing="1.5">PIZZA &amp; PASTA</text>
  </svg>
);

const JollibeeLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#D11919" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#FFC72C" strokeWidth="1.5" />
    <path d="M36 28 Q 24 12 21 16" fill="none" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="21" cy="16" r="4.5" fill="#FFC72C" stroke="#1E1B4B" strokeWidth="1" />
    <path d="M64 28 Q 76 12 79 16" fill="none" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="79" cy="16" r="4.5" fill="#FFC72C" stroke="#1E1B4B" strokeWidth="1" />
    <ellipse cx="50" cy="54" rx="30" ry="21" fill="#FFFFFF" />
    <ellipse cx="24" cy="54" rx="4.5" ry="7" fill="#E11D48" opacity="0.95" />
    <ellipse cx="76" cy="54" rx="4.5" ry="7" fill="#E11D48" opacity="0.95" />
    <ellipse cx="37" cy="46" rx="7.5" ry="11" fill="#FFFFFF" stroke="#D11919" strokeWidth="1.2" />
    <ellipse cx="38" cy="46" rx="4.5" ry="7.5" fill="#1E1B4B" />
    <circle cx="36.5" cy="42.5" r="1.5" fill="#FFFFFF" />
    <circle cx="39.5" cy="47.5" r="0.7" fill="#FFFFFF" />
    <ellipse cx="63" cy="46" rx="7.5" ry="11" fill="#FFFFFF" stroke="#D11919" strokeWidth="1.2" />
    <ellipse cx="62" cy="46" rx="4.5" ry="7.5" fill="#1E1B4B" />
    <circle cx="60.5" cy="42.5" r="1.5" fill="#FFFFFF" />
    <circle cx="63.5" cy="47.5" r="0.7" fill="#FFFFFF" />
    <ellipse cx="50" cy="55" rx="7.5" ry="4" fill="#F97316" />
    <path d="M41 62 Q 50 75 59 62" fill="#1E1B4B" />
    <path d="M45 66 Q 50 73 55 66" fill="#FDA4AF" />
    <path d="M33 33 C 24 18, 42 10, 50 16 C 58 10, 76 18, 67 33 Z" fill="#FFFFFF" />
    <rect x="36" y="31" width="28" height="3" fill="#FFC72C" rx="1.5" />
    <rect x="42" y="31" width="16" height="3" fill="#D11919" />
    <text x="50" y="85" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fontWeight="900" fill="#FFC72C" textAnchor="middle" letterSpacing="0.8">JOLLIBEE</text>
  </svg>
);

const ChowkingLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#94000D" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#FBBF24" strokeWidth="1.5" />
    <g transform="translate(0, -3)">
      <path d="M42 27 Q 44 21 41 18 M50 28 Q 52 22 49 19 M58 27 Q 60 21 57 18" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M28 44 C34 56, 66 56, 72 44" fill="none" stroke="#FBBF24" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M31 46 C37 54, 63 54, 69 46" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
      <path d="M33 42 Q50 36 67 42" fill="none" stroke="#FFF" strokeWidth="2.5" />
      <line x1="22" y1="33" x2="78" y2="43" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="20" y1="37" x2="74" y2="47" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <text x="50" y="74" fontFamily="Georgia, serif" fontSize="13" fontWeight="900" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.2">Chowking</text>
    <text x="50" y="84" fontFamily="system-ui, sans-serif" fontSize="5.5" fontWeight="800" fill="#FBBF24" textAnchor="middle" letterSpacing="1.2">CHINESE FAST FOOD</text>
  </svg>
);

const MaxsLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#BF0A1B" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
    <g transform="translate(1, -2)">
      <path d="M22 55 L28 30 Q33 46 36 46 L43 30 Q45 52 47 52" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M51 46 C 51 40, 57 40, 57 46 C 57 51, 51 51, 51 46 Z M61 38 L67 52 M67 38 L61 52 M68 32 L70 28" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M72 42 C 72 37, 79 39, 77 46 Q 75 50 72 51" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
    </g>
    <rect x="22" y="61" width="56" height="2" fill="#FBBF24" rx="1" />
    <text x="50" y="74" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="900" fill="#FFFFFF" textAnchor="middle" letterSpacing="1.5">MAX'S</text>
    <text x="50" y="84" fontFamily="system-ui, sans-serif" fontSize="5" fontWeight="700" fill="#FBBF24" textAnchor="middle" letterSpacing="1.2">RESTAURANT</text>
  </svg>
);

const ShellLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#DD1D21" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#FFD500" strokeWidth="1.5" />
    <path d="M50 20 L58 30 L70 30 L64 44 L72 58 L58 58 L50 78 L42 58 L28 58 L36 44 L30 30 L42 30 Z" fill="#FFD500" stroke="#DD1D21" strokeWidth="1" />
    <text x="50" y="86" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="900" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">SHELL</text>
  </svg>
);

const GerosLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#0A1E36" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
    <g transform="translate(50, 40)" stroke="#D4AF37" strokeWidth="1.5" fill="none">
      <circle cx="0" cy="0" r="13" />
      <circle cx="0" cy="0" r="9" strokeWidth="1" />
      <line x1="0" y1="-18" x2="0" y2="18" />
      <line x1="-18" y1="0" x2="18" y2="0" />
      <line x1="-13" y1="-13" x2="13" y2="13" />
      <line x1="-13" y1="13" x2="13" y2="-13" />
      <circle cx="0" cy="-18" r="2.5" fill="#D4AF37" stroke="none" />
      <circle cx="0" cy="18" r="2.5" fill="#D4AF37" stroke="none" />
      <circle cx="-18" cy="0" r="2.5" fill="#D4AF37" stroke="none" />
      <circle cx="18" cy="0" r="2.5" fill="#D4AF37" stroke="none" />
      <circle cx="0" cy="0" r="4.5" fill="#D4AF37" stroke="#0A1E36" strokeWidth="1.5" />
    </g>
    <text x="50" y="73" fontFamily="system-ui, sans-serif" fontSize="11.5" fontWeight="900" fill="#FFFFFF" textAnchor="middle" letterSpacing="1.2">GEROS</text>
    <text x="50" y="83" fontFamily="system-ui, sans-serif" fontSize="4.5" fontWeight="800" fill="#D4AF37" textAnchor="middle" letterSpacing="1.5">GROUP OF COMPANIES</text>
  </svg>
);

const FBaylosisLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#0A361D" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#D4AF37" strokeWidth="2" />
    <path d="M22 50 C 20 30, 30 20, 50 22 C 32 25, 26 38, 26 50 C 26 62, 32 75, 50 78 C 30 80, 20 70, 22 50 Z" fill="#D4AF37" opacity="0.5" />
    <path d="M78 50 C 80 30, 70 20, 50 22 C 68 25, 74 38, 74 50 C 74 62, 68 75, 50 78 C 70 80, 80 70, 78 50 Z" fill="#D4AF37" opacity="0.5" />
    <path d="M42 34 C 38 28, 44 24, 50 26 C 56 24, 62 28, 58 34 Z" fill="#D4AF37" />
    <rect x="44" y="32" width="12" height="2.5" fill="#D4AF37" rx="0.5" />
    <path d="M44 48 L48 40 M56 48 L52 40" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <text x="50" y="55" fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic" fontSize="11" fontWeight="900" fill="#FFFFFF" textAnchor="middle">F. Baylosis</text>
    <text x="50" y="69" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="800" fill="#D4AF37" textAnchor="middle" letterSpacing="1.5">CATERING &amp; SERVICES</text>
    <text x="50" y="80" fontFamily="system-ui, sans-serif" fontSize="5.5" fontWeight="700" fill="#FFFFFF" opacity="0.9" textAnchor="middle" letterSpacing="1">BATANGAS</text>
  </svg>
);

const EonSkincareLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#2E0854" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
    <g transform="translate(50, 40)" stroke="#D4AF37" strokeWidth="1.8" fill="none" strokeLinecap="round">
      <path d="M0 -15 Q 8 -2 0 15 Q -8 -2 0 -15" fill="#F472B6" fillOpacity="0.2" />
      <path d="M0 -5 C 15 -18, 18 -2, 0 10" />
      <path d="M0 -5 C -15 -18, -18 -2, 0 10" />
      <circle cx="0" cy="15" r="1.5" fill="#D4AF37" />
    </g>
    <text x="50" y="74" fontFamily="Georgia, serif" fontSize="13" fontWeight="900" fill="#FFFFFF" textAnchor="middle" letterSpacing="2">E O N</text>
    <text x="50" y="84" fontFamily="system-ui, sans-serif" fontSize="4.5" fontWeight="800" fill="#D4AF37" textAnchor="middle" letterSpacing="1.5">SKINCARE &amp; AESTHETIC</text>
  </svg>
);

const BusinessConceptLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#111827" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
    <path d="M32 32 H54 C 64 32, 64 44, 54 44 H32 Z" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 44 H54 C 64 44, 64 58, 54 58 H32" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="54" cy="44" r="3" fill="#10B981" />
    <text x="50" y="75" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="900" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">BUSINESS CONCEPT</text>
    <text x="50" y="85" fontFamily="system-ui, sans-serif" fontSize="5" fontWeight="700" fill="#F59E0B" textAnchor="middle" letterSpacing="2">PHILIPPINES</text>
  </svg>
);

/* -----------------------------------------------------------------------------
 * Logo data mapping (14 brand logos surrounding the center title card)
 * -------------------------------------------------------------------------- */

type Logo = {
  name: string;
  brandLight: string;
  brandDark?: string;
  height?: number;
  pixelColors: string[];
  row: number;
  col: number;
  Svg?: React.ComponentType;
  imgSrc?: string;
};

const LOGOS: Logo[] = [
  // Row 1
  {
    name: "Greenwich",
    brandLight: "#00472F",
    pixelColors: ["#00472F", "#FFC72C", "#E11D48", "#16A34A"],
    row: 1,
    col: 1,
    imgSrc: "/trustedclient/Greenwich.webp",
  },
  {
    name: "Jollibee",
    brandLight: "#D11919",
    pixelColors: ["#D11919", "#FFC72C", "#F97316", "#E11D48"],
    row: 1,
    col: 2,
    imgSrc: "/trustedclient/Jollibee.webp",
  },
  {
    name: "Chowking",
    brandLight: "#94000D",
    pixelColors: ["#94000D", "#FBBF24", "#FF6B00", "#D97706"],
    row: 1,
    col: 3,
    imgSrc: "/trustedclient/Chowking.webp",
  },
  {
    name: "Max's Restaurant",
    brandLight: "#BF0A1B",
    pixelColors: ["#BF0A1B", "#FBBF24", "#DC2626", "#F59E0B"],
    row: 1,
    col: 4,
    imgSrc: "/trustedclient/Maxs_Restaurant.webp",
  },
  {
    name: "Shell",
    brandLight: "#DD1D21",
    pixelColors: ["#DD1D21", "#FFD500", "#F97316", "#DC2626"],
    row: 1,
    col: 5,
    Svg: ShellLogo,
  },

  // Row 2 & 3 Side Slots (Middle cols 2-4 rows 2-3 filled by center card)
  {
    name: "Batangas City Government",
    brandLight: "#15803D",
    pixelColors: ["#15803D", "#F59E0B", "#166534", "#EAB308"],
    row: 2,
    col: 1,
    imgSrc: "/trustedclient/Batangas_City_Seal.webp",
  },
  {
    name: "AG&P Global",
    brandLight: "#0284C7",
    pixelColors: ["#0284C7", "#0369A1", "#38BDF8", "#0EA5E9"],
    row: 3,
    col: 1,
    imgSrc: "/trustedclient/AGP.webp",
  },
  {
    name: "Bureau of Fire Protection",
    brandLight: "#B91C1C",
    pixelColors: ["#B91C1C", "#F59E0B", "#EA580C", "#7F1D1D"],
    row: 2,
    col: 5,
    imgSrc: "/trustedclient/Bureau_of_Fire_Protection.webp",
  },
  {
    name: "Philippine National Police",
    brandLight: "#1E3A8A",
    pixelColors: ["#1E3A8A", "#DC2626", "#F59E0B", "#1D4ED8"],
    row: 3,
    col: 5,
    imgSrc: "/trustedclient/Philippine_National_Police.webp",
  },

  // Row 4
  {
    name: "DepEd",
    brandLight: "#1D4ED8",
    pixelColors: ["#1D4ED8", "#DC2626", "#F59E0B", "#2563EB"],
    row: 4,
    col: 1,
    imgSrc: "/trustedclient/DepEd.webp",
  },
  {
    name: "Geros Group",
    brandLight: "#0A1E36",
    pixelColors: ["#0A1E36", "#D4AF37", "#1E3A8A", "#F59E0B"],
    row: 4,
    col: 2,
    imgSrc: "/trustedclient/Geros_Group.webp",
  },
  {
    name: "F. Baylosis Catering",
    brandLight: "#0A361D",
    pixelColors: ["#0A361D", "#D4AF37", "#15803D", "#EAB308"],
    row: 4,
    col: 3,
    Svg: FBaylosisLogo,
  },
  {
    name: "EON Skincare",
    brandLight: "#2E0854",
    pixelColors: ["#2E0854", "#D4AF37", "#EC4899", "#A855F7"],
    row: 4,
    col: 4,
    Svg: EonSkincareLogo,
  },
  {
    name: "Business Concept",
    brandLight: "#111827",
    pixelColors: ["#111827", "#F59E0B", "#EF4444", "#10B981"],
    row: 4,
    col: 5,
    Svg: BusinessConceptLogo,
  },
];

/* -----------------------------------------------------------------------------
 * Logo card component
 * -------------------------------------------------------------------------- */

function LogoCard({ logo }: { logo: Logo }) {
  const { Svg, imgSrc, name, brandLight, pixelColors, row, col } = logo;

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center p-3 overflow-hidden bg-white cursor-pointer select-none isolate h-full w-full",
        "transition-all duration-300 hover:z-20",
        "[--brand:var(--brand-light)]",
        "hover:shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--brand)_25%,transparent),0_0_0_1px_color-mix(in_srgb,var(--brand)_40%,transparent)]"
      )}
      style={
        {
          "--brand-light": brandLight,
          gridRow: row,
          gridColumn: col,
        } as React.CSSProperties
      }
    >
      <PixelCanvas colors={pixelColors} gap={5} speed={30} />
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={name}
          className="relative z-10 max-w-[78%] max-h-[62px] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      ) : Svg ? (
        <div className="relative z-10 w-full max-w-[70%] max-h-[50px] aspect-square flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <Svg />
        </div>
      ) : (
        <span className="relative z-10 font-extrabold text-xs text-slate-800 tracking-tight text-center">
          {name}
        </span>
      )}
    </div>
  );
}

function LogoCardMobile({ logo }: { logo: Logo }) {
  const { Svg, imgSrc, name, brandLight, pixelColors } = logo;

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center p-3.5 min-h-[90px] overflow-hidden bg-white cursor-pointer select-none isolate",
        "transition-all duration-300 hover:z-20",
        "[--brand:var(--brand-light)]",
        "hover:shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--brand)_25%,transparent),0_0_0_1px_color-mix(in_srgb,var(--brand)_40%,transparent)]"
      )}
      style={
        {
          "--brand-light": brandLight,
        } as React.CSSProperties
      }
    >
      <PixelCanvas colors={pixelColors} gap={5} speed={30} />
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={name}
          className="relative z-10 max-w-[75%] max-h-[50px] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      ) : Svg ? (
        <div className="relative z-10 w-full max-w-[65%] max-h-[44px] aspect-square flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <Svg />
        </div>
      ) : (
        <span className="relative z-10 font-bold text-xs text-slate-800 tracking-tight text-center">
          {name}
        </span>
      )}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Component export
 * -------------------------------------------------------------------------- */

interface SkewCardsProps {
  setCurrentPage?: (page: string) => void;
}

export default function SkewCards({ setCurrentPage }: SkewCardsProps) {
  return (
    <section
      id="client-feedback-gradient-section"
      className="w-full bg-cover bg-center bg-no-repeat border-t border-b border-slate-200 py-16 px-4 sm:px-6 md:px-8 lg:px-10"
      style={{ backgroundImage: "url('/InkBackground_3_2K.webp')" }}
    >
      {/* Desktop Grid Layout (14 Cards surrounding center text block) */}
      <div
        className="hidden lg:grid grid-cols-5 max-w-7xl mx-auto gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
        style={{ gridTemplateRows: "repeat(4, 115px)" }}
      >
        {/* Center Text Block */}
        <div
          className="flex flex-col items-center justify-center gap-3 bg-white p-6 text-center select-none"
          style={{ gridColumn: "2 / span 3", gridRow: "2 / span 2" }}
        >
          <h2 className="text-2xl lg:text-3xl font-extrabold text-[#12941F] tracking-tight font-display max-w-[500px] leading-snug">
            Trusted by Industry Leaders Across Batangas
          </h2>
          <p className="text-sm sm:text-base text-[#454545] opacity-90 font-sans max-w-[480px] leading-relaxed">
            Delivering high-precision printing, large format banners, apparel &amp; merchandise for top franchises, corporate brands &amp; government institutions.
          </p>
        </div>

        {LOGOS.map((logo) => (
          <LogoCard key={logo.name} logo={logo} />
        ))}
      </div>

      {/* Mobile & Tablet Responsive Layout */}
      <div className="lg:hidden flex flex-col gap-6 max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
          <h2 className="text-2xl font-extrabold text-[#12941F] tracking-tight font-display leading-snug">
            Trusted by Industry Leaders Across Batangas
          </h2>
          <p className="text-sm sm:text-base text-[#454545] opacity-90 font-sans leading-relaxed">
            Delivering high-precision printing, large format banners, apparel &amp; merchandise for top franchises, corporate brands &amp; government institutions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {LOGOS.map((logo) => (
            <LogoCardMobile key={logo.name} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
