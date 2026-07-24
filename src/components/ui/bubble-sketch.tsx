"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import type p5 from "p5";

declare global {
  interface Window {
    p5: unknown;
  }
}

const colors = ["#3A86FF", "#FF006E", "#8338EC", "#FB5607", "#00AFB9", "#3DB9CC"];

function easeOutQuint(x: number): number {
  return 1 - Math.pow(1 - x, 5);
}

class Bubble {
  x: number;
  y: number;
  d: number;
  cage: Wisp[];
  dst: number;
  clr: string;
  hue: number;

  constructor(p5Inst: p5, x: number, y: number, d: number) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.cage = [];
    this.dst = this.d / 2;
    this.clr = p5Inst.random(colors) as string;
    this.hue = p5Inst.random(360);
  }

  show(p5Inst: p5): void {
    p5Inst.push();
    p5Inst.translate(this.x, this.y);

    p5Inst.colorMode(p5Inst.HSB, 360, 100, 100, 100);
    p5Inst.noStroke();

    const c = p5Inst.color(this.hue, 70, 90, 90);
    p5Inst.fill(c);
    p5Inst.circle(0, 0, this.d);

    for (const c of this.cage) {
      c.run(p5Inst);
    }

    for (const c of this.cage) {
      aetherLink(p5Inst, c.x, c.y, c.d, 0, 0, this.d, this.dst);
    }

    for (let i = this.cage.length - 1; i >= 0; i--) {
      if (this.cage[i].isDead) {
        this.cage.splice(i, 1);
      }
    }

    if (p5Inst.random() < 0.02) {
      this.addWisp(p5Inst);
    }
    p5Inst.pop();
  }

  addWisp(p5Inst: p5): void {
    this.cage.push(
      new Wisp(
        p5Inst,
        0,
        0,
        this.d * p5Inst.random(0.25, 0.75),
        this.d * p5Inst.random(0.75, 1.25),
        this.hue
      )
    );
  }

  run(p5Inst: p5): void {
    this.show(p5Inst);
  }
}

class Wisp {
  x: number;
  y: number;
  d: number;
  timer: number;
  endTime: number;
  ang: number;
  r: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  originD: number;
  isDead: boolean;
  hue: number;

  constructor(p5Inst: p5, x: number, y: number, d: number, r: number, hue: number) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.timer = 0;
    this.endTime = Math.floor(p5Inst.random(60, 200));
    this.ang = p5Inst.random(p5Inst.TAU);
    this.r = r;
    this.originX = this.x;
    this.originY = this.y;
    this.targetX = this.x + this.r * p5Inst.cos(this.ang);
    this.targetY = this.y + this.r * p5Inst.sin(this.ang);
    this.originD = d;
    this.isDead = false;
    this.hue = hue;
  }

  show(p5Inst: p5): void {
    if (this.isDead === false) {
      p5Inst.colorMode(p5Inst.HSB, 360, 100, 100, 100);
      const c = p5Inst.color(this.hue, 40, 95, 70);
      p5Inst.noStroke();
      p5Inst.fill(c);
      p5Inst.circle(this.x, this.y, this.d);
    }
  }

  move(p5Inst: p5): void {
    this.timer++;
    if (0 < this.timer && this.timer < this.endTime) {
      const n = p5Inst.norm(this.timer, 0, this.endTime);
      this.x = p5Inst.lerp(this.originX, this.targetX, easeOutQuint(n));
      this.y = p5Inst.lerp(this.originY, this.targetY, easeOutQuint(n));
      this.d = p5Inst.lerp(this.originD, 0, n);
    }
    if (this.timer > this.endTime) {
      this.isDead = true;
    }
  }

  run(p5Inst: p5): void {
    this.show(p5Inst);
    this.move(p5Inst);
  }
}

function aetherLink(
  p5Inst: p5,
  x1: number,
  y1: number,
  d1: number,
  x2: number,
  y2: number,
  d2: number,
  dst: number
): void {
  const r = dst / 2;

  const r1 = d1 / 2;
  const r2 = d2 / 2;
  const R1 = r1 + r;
  const R2 = r2 + r;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const d = p5Inst.sqrt(dx * dx + dy * dy);

  if (d > R1 + R2 || d === 0) {
    return;
  }

  const dirX = dx / d;
  const dirY = dy / d;

  const a = (R1 * R1 - R2 * R2 + d * d) / (2 * d);
  const underRoot = R1 * R1 - a * a;
  if (underRoot < 0) return;
  const h = p5Inst.sqrt(underRoot);

  const midX = x1 + dirX * a;
  const midY = y1 + dirY * a;

  const perpX = -dirY * h;
  const perpY = dirX * h;

  const cx1 = midX + perpX;
  const cy1 = midY + perpY;

  const cx2 = midX - perpX;
  const cy2 = midY - perpY;

  if (p5Inst.dist(cx1, cy1, cx2, cy2) < r * 2) {
    return;
  }

  const ang1 = p5Inst.atan2(y1 - cy1, x1 - cx1);
  let ang2 = p5Inst.atan2(y2 - cy1, x2 - cx1);
  const ang3 = p5Inst.atan2(y2 - cy2, x2 - cx2);
  let ang4 = p5Inst.atan2(y1 - cy2, x1 - cx2);

  if (ang2 < ang1) {
    ang2 += p5Inst.TAU;
  }

  p5Inst.colorMode(p5Inst.RGB, 255, 255, 255, 100);
  p5Inst.noFill();
  p5Inst.stroke(180, 200, 240, 40);
  p5Inst.strokeWeight(0.8);
  p5Inst.beginShape();
  for (let i = ang1; i < ang2; i += p5Inst.TAU / 180) {
    p5Inst.vertex(cx1 + r * p5Inst.cos(i), cy1 + r * p5Inst.sin(i));
  }

  if (ang4 < ang3) {
    ang4 += p5Inst.TAU;
  }
  for (let i = ang3; i < ang4; i += p5Inst.TAU / 180) {
    p5Inst.vertex(cx2 + r * p5Inst.cos(i), cy2 + r * p5Inst.sin(i));
  }
  p5Inst.endShape();
}

interface BubbleSketchProps {
  className?: string;
  width?: number;
  height?: number;
  backgroundColor?: string | number;
}

export function BubbleSketch({
  className = "",
  width,
  height,
  backgroundColor = "#0B1F18",
}: BubbleSketchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5 | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    let isSubscribed = true;

    const loadP5AndCreateSketch = async () => {
      try {
        if (sketchRef.current) {
          sketchRef.current.remove();
          sketchRef.current = null;
        }

        const P5Module = (await import("p5")).default;
        if (!isSubscribed || !containerRef.current) return;

        sketchRef.current = new P5Module((p: p5) => {
          const bubbles: Bubble[] = [];

          const getDimensions = () => {
            const w = width || containerRef.current?.clientWidth || window.innerWidth;
            const h = height || containerRef.current?.clientHeight || window.innerHeight;
            return { w, h };
          };

          p.setup = () => {
            const { w, h } = getDimensions();
            p.createCanvas(w, h).parent(containerRef.current!);
            p.rectMode(p.CENTER);
            p.colorMode(p.HSB, 360, 100, 100, 100);

            const area = Math.min(w, h) * 0.85;
            const cellCount = 8;
            const cellSize = area / cellCount;

            for (let i = 0; i < cellCount; i++) {
              for (let j = 0; j < cellCount; j++) {
                const x = cellSize * i + cellSize / 2 + (w - area) / 2;
                const y = cellSize * j + cellSize / 2 + (h - area) / 2;
                bubbles.push(new Bubble(p, x, y + cellSize * 0.2, cellSize * 0.4));
              }
            }
          };

          p.draw = () => {
            if (typeof backgroundColor === "string") {
              p.background(backgroundColor);
            } else {
              p.background(backgroundColor);
            }

            for (const b of bubbles) {
              b.run(p);
            }
          };

          p.windowResized = () => {
            if (!width || !height) {
              const { w, h } = getDimensions();
              p.resizeCanvas(w, h);
            }
          };
        });
      } catch (err) {
        if (isSubscribed) {
          setError(`Error loading sketch: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
    };

    loadP5AndCreateSketch();

    return () => {
      isSubscribed = false;
      if (sketchRef.current) {
        sketchRef.current.remove();
        sketchRef.current = null;
      }
    };
  }, [isMounted, width, height, backgroundColor]);

  return (
    <div className={`w-full h-full ${className}`}>
      <div
        ref={containerRef}
        className="relative overflow-hidden w-full h-full min-h-screen flex items-center justify-center"
      >
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default BubbleSketch;
