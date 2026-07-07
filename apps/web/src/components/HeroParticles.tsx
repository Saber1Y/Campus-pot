"use client";

import { useEffect, useState } from "react";

interface Coin {
  left: number;
  delay: number;
  duration: number;
  size: number;
  startRot: number;
  endRot: number;
}

interface Ripple {
  left: number;
  bottom: number;
  delay: number;
  size: number;
}

interface Glow {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

export default function HeroParticles() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [glows, setGlows] = useState<Glow[]>([]);

  useEffect(() => {
    setCoins(
      Array.from({ length: 14 }, (_, i) => ({
        left: (i * 7.7 + 2) % 100,
        delay: (i * 1.1) % 8,
        duration: 10 + (i % 4) * 3,
        size: 6 + (i % 4) * 3,
        startRot: (i * 73) % 360,
        endRot: (i * 73 + 720) % 1080,
      }))
    );
    setRipples(
      Array.from({ length: 4 }, (_, i) => ({
        left: 20 + i * 20,
        bottom: 8 + i * 6,
        delay: i * 2.5,
        size: 40 + i * 20,
      }))
    );
    setGlows(
      [
        { left: 15, top: 20, size: 500, delay: 0, duration: 14 },
        { left: 65, top: 40, size: 400, delay: 3, duration: 18 },
        { left: 40, top: 60, size: 350, delay: 7, duration: 12 },
      ]
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Glowing orbs - deep background */}
      {glows.map((g, i) => (
        <div
          key={`glow-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            width: g.size,
            height: g.size,
            background:
              "radial-gradient(circle, rgba(217,119,6,0.12) 0%, rgba(217,119,6,0.04) 50%, transparent 70%)",
            animation: `glow-orb ${g.duration}s ease-in-out infinite`,
            animationDelay: `${g.delay}s`,
          }}
        />
      ))}

      {/* Ripple rings - expanding from bottom */}
      {ripples.map((r, i) => (
        <div
          key={`ripple-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${r.left}%`,
            bottom: `${r.bottom}%`,
            width: r.size,
            height: r.size,
            border: "1px solid rgba(217,119,6,0.15)",
            animation: `ripple-expand 4s ease-out infinite`,
            animationDelay: `${r.delay}s`,
          }}
        />
      ))}
      {ripples.map((r, i) => (
        <div
          key={`ripple2-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${r.left}%`,
            bottom: `${r.bottom}%`,
            width: r.size * 0.6,
            height: r.size * 0.6,
            border: "1px solid rgba(217,119,6,0.08)",
            animation: `ripple-expand 4s ease-out infinite`,
            animationDelay: `${r.delay + 1.3}s`,
          }}
        />
      ))}

      {/* Coins falling */}
      {coins.map((c, i) => (
        <div
          key={`coin-${i}`}
          className="absolute"
          style={{
            left: `${c.left}%`,
            top: "-8%",
            width: c.size,
            height: c.size,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle at 35% 35%, rgba(245,158,11,0.25), rgba(217,119,6,0.08))",
            border: "1px solid rgba(217,119,6,0.15)",
            boxShadow: "0 0 6px rgba(217,119,6,0.06)",
            animation: `coin-fall ${c.duration}s linear infinite`,
            animationDelay: `${c.delay}s`,
            "--coin-start": `${c.startRot}deg`,
            "--coin-end": `${c.endRot}deg`,
          } as React.CSSProperties}
        >
          {/* Inner coin detail */}
          <div
            className="absolute rounded-full"
            style={{
              inset: "20%",
              border: "1px solid rgba(217,119,6,0.1)",
              borderRadius: "9999px",
            }}
          />
        </div>
      ))}

      {/* Sparkle dots */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute rounded-full bg-accent-light/30"
          style={{
            left: `${(i * 13 + 5) % 100}%`,
            top: `${20 + (i * 9) % 60}%`,
            width: 2,
            height: 2,
            animation: `sparkle ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}
