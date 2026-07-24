import React, { createRef, useRef, type ReactNode } from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface ImageMouseTrailProps {
  items: string[];
  children?: ReactNode;
  className?: string;
  imgClass?: string;
  distance?: number;
  maxNumberOfImages?: number;
  fadeAnimation?: boolean;
}

export function ImageCursorTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = "w-36 h-48 sm:w-44 sm:h-56",
  distance = 25,
  fadeAnimation = true,
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef(items.map(() => createRef<HTMLImageElement>()));
  const currentZIndexRef = useRef(1);

  const globalIndexRef = useRef(0);
  const lastRef = useRef({ x: 0, y: 0 });

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;

    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1;
    }
    image.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current++;

    image.dataset.status = "active";
    if (fadeAnimation) {
      setTimeout(() => {
        image.dataset.status = "inactive";
      }, 1500);
    }
    lastRef.current = { x, y };
  };

  const distanceFromLast = (x: number, y: number) =>
    Math.hypot(x - lastRef.current.x, y - lastRef.current.y);

  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = "inactive";
  };

  const handleOnMove = (x: number, y: number) => {
    if (distanceFromLast(x, y) > window.innerWidth / distance) {
      const idx = globalIndexRef.current;
      const lead = refs.current[idx % refs.current.length]?.current;
      const tail =
        refs.current[(idx - maxNumberOfImages) % refs.current.length]?.current;
      if (lead) activate(lead, x, y);
      if (tail) deactivate(tail);
      globalIndexRef.current++;
    }
  };

  return (
    <section
      onMouseMove={(e) => handleOnMove(e.clientX, e.clientY)}
      onTouchMove={(e) => e.touches[0] && handleOnMove(e.touches[0].clientX, e.touches[0].clientY)}
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden",
        className
      )}
    >
      {items.map((item, index) => (
        <img
          key={index}
          className={cn(
            "opacity-0 absolute -translate-x-[50%] -translate-y-[50%] scale-0 rounded-2xl object-cover shadow-2xl border border-white/20 transition-transform duration-300 data-[status='active']:scale-100 data-[status='active']:opacity-100 data-[status='active']:duration-500 pointer-events-none",
            imgClass
          )}
          data-index={index}
          data-status="inactive"
          src={item}
          alt={`trail-image-${index}`}
          ref={refs.current[index]}
        />
      ))}
      {children}
    </section>
  );
}

export default ImageCursorTrail;
