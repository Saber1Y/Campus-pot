"use client";

import { useEffect, useState } from "react";

interface Particle {
  left: number;
  size: number;
  delay: number;
  duration: number;
  shape: "circle" | "diamond" | "ring";
}

export default function HeroParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const shapes: Particle["shape"][] = ["circle", "diamond", "ring"];
    const items: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      left: ((i * 37 + 13) % 100),
      size: 3 + (i % 5) * 2,
      delay: (i * 0.7) % 12,
      duration: 10 + (i % 6) * 3,
      shape: shapes[i % shapes.length],
    }));
    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => {
        const common: React.CSSProperties = {
          position: "absolute",
          left: `${p.left}%`,
          bottom: "-10%",
          width: p.size,
          height: p.size,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        };

        if (p.shape === "circle") {
          return (
            <div
              key={i}
              style={{
                ...common,
                borderRadius: "9999px",
                background: "rgba(217, 119, 6, 0.15)",
                animationName: "float-particle",
              }}
            />
          );
        }
        if (p.shape === "diamond") {
          return (
            <div
              key={i}
              style={{
                ...common,
                borderRadius: "2px",
                background: "rgba(146, 64, 14, 0.12)",
                transform: "rotate(45deg)",
                animationName: "float-coin",
              }}
            />
          );
        }
        return (
          <div
            key={i}
            style={{
              ...common,
              borderRadius: "9999px",
              border: "1px solid rgba(217, 119, 6, 0.08)",
              background: "transparent",
              animationName: "drift-arc",
            }}
          />
        );
      })}
    </div>
  );
}
