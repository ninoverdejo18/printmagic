import { useEffect, useRef } from "react";

interface LiquidEffectAnimationProps {
  imageSrc?: string;
  className?: string;
  metalness?: number;
  roughness?: number;
  displacementScale?: number;
}

export function LiquidEffectAnimation({
  imageSrc = "/profile pic/albert.webp",
  className = "",
  metalness = 0.75,
  roughness = 0.25,
  displacementScale = 5,
}: LiquidEffectAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasId = "liquid-canvas-" + Math.random().toString(36).substring(2, 9);
    canvas.id = canvasId;

    const fullImageSrc = imageSrc.startsWith("http")
      ? imageSrc
      : new URL(imageSrc, window.location.origin).href;

    const script = document.createElement("script");
    script.type = "module";
    const appKey = `__liquidApp_${canvasId}`;

    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';
      
      const canvas = document.getElementById('${canvasId}');
      if (canvas) {
        try {
          const app = LiquidBackground(canvas);
          app.loadImage('${fullImageSrc}');
          if (app.liquidPlane && app.liquidPlane.material) {
            app.liquidPlane.material.metalness = ${metalness};
            app.liquidPlane.material.roughness = ${roughness};
            if (app.liquidPlane.uniforms && app.liquidPlane.uniforms.displacementScale) {
              app.liquidPlane.uniforms.displacementScale.value = ${displacementScale};
            }
          }
          app.setRain(false);
          window['${appKey}'] = app;
        } catch (e) {
          console.error("LiquidBackground init error:", e);
        }
      }
    `;

    document.body.appendChild(script);

    return () => {
      if (window[appKey as any] && typeof window[appKey as any].dispose === "function") {
        try {
          window[appKey as any].dispose();
        } catch (err) {
          // ignore cleanup error
        }
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [imageSrc, metalness, roughness, displacementScale]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

declare global {
  interface Window {
    [key: string]: any;
  }
}
