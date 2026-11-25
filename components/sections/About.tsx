"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, X, Scan } from "lucide-react";
import ParticleBackground from "../ParticleBackground";

const About: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const posterCardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!posterCardRef.current) return;
    const rect = posterCardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 18;
    const rotateX = (0.5 - py) * 18;

    setTilt({
      x: rotateX,
      y: rotateY,
      glowX: px * 100,
      glowY: py * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  };

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 overflow-hidden bg-[#030308] text-white flex items-center"
    >
      {/* Deep Cyber Radial Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#1d0642_0%,_#08091f_55%,_#030308_100%)]" />

      {/* Existing Particle Background */}
      <ParticleBackground density={60} color="#ff00ff" />

      {/* Ambient Neon Glow Orbs */}
      <div className="pointer-events-none absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-32 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-[130px]" />

      {/* Floating Geometric HUD Rings */}
      <motion.div
        className="pointer-events-none absolute top-16 right-16 w-36 h-36 border border-dashed border-cyan-400/20 rounded-full hidden lg:block"
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-16 left-16 w-28 h-28 border border-fuchsia-500/20 rounded-full hidden lg:block"
        animate={{ rotate: -360, y: [-10, 10, -10] }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Main Content Container */}
      <div ref={ref} className="relative z-10 container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-2xl md:text-5xl font-black tracking-tight orbitron bg-gradient-to-r from-white via-cyan-200 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,245,255,0.35)] mb-4">
            BLITZ 2K26
          </h2>

          {/* Glowing Subheading */}
          <motion.h3
            className="text-lg md:text-2xl font-bold orbitron tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 12px rgba(0, 245, 255, 0.7)",
                  "0 0 24px rgba(255, 0, 255, 0.8)",
                  "0 0 12px rgba(0, 245, 255, 0.7)",
                ],
                color: ["#67e8f9", "#e879f9", "#67e8f9"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              FRESHERS PARTY
            </motion.span>
          </motion.h3>

          {/* Animated Gradient Divider */}
          <motion.div
            className="h-1 pt-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 180, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* 2-Column Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-stretch mt-2">
          {/* Left Card: Ultra-Next-Level 3D Holographic Poster Deck (Top Shifted) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group rounded-3xl p-[1.5px] bg-gradient-to-br from-cyan-400 via-fuchsia-500/50 to-amber-400/70 shadow-[0_0_55px_rgba(0,245,255,0.2)] hover:shadow-[0_0_80px_rgba(255,0,255,0.38)] transition-shadow duration-500"
            style={{ perspective: 1200 }}
          >
            <div
              ref={posterCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative h-full w-full rounded-3xl bg-[#070614]/95 backdrop-blur-2xl px-5 pt-4 pb-7 md:px-6 md:pt-5 md:pb-8 flex flex-col items-center justify-start overflow-hidden"
            >
              {/* Subtle Cyber Grid Backdrop */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(34,211,238,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(217,70,239,0.14) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Dynamic Mouse-Tracking Neon Spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(0, 245, 255, 0.22), rgba(255, 0, 255, 0.12) 35%, transparent 70%)`,
                }}
              />

              {/* Top Shifted HUD Header Bar */}
              

              {/* Top-Aligned 3D Interactive Poster Stage */}
              <div className="relative w-full flex-1 flex items-start justify-center">
                {/* Pulsing Neon Core Aura Behind Poster */}
                <motion.div
                  className="pointer-events-none absolute -top-3 w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-amber-300 blur-2xl"
                  animate={{
                    rotate: 360,
                    opacity: [0.22, 0.42, 0.22],
                    scale: [0.96, 1.05, 0.96],
                  }}
                  transition={{
                    rotate: { duration: 16, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                />

                {/* Orbital Radar Ring */}
                <motion.div
                  className="pointer-events-none absolute top-6 w-64 h-64 md:w-72 md:h-72 rounded-full border border-dashed border-cyan-300/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                />

                {/* 3D Tilt Poster Frame */}
                <motion.div
                  onClick={() => setIsLightboxOpen(true)}
                  animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative z-10 w-full cursor-pointer rounded-2xl overflow-hidden border border-cyan-300/35 bg-gradient-to-b from-cyan-400/10 via-[#0d0b24]/90 to-fuchsia-500/10 p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(0,245,255,0.2)] group-hover:border-fuchsia-400/60 transition-colors duration-300"
                >
                  {/* Sci-Fi Corner Brackets */}
                  <span className="pointer-events-none absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20" />
                  <span className="pointer-events-none absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-fuchsia-400 z-20" />
                  <span className="pointer-events-none absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-fuchsia-400 z-20" />
                  <span className="pointer-events-none absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20" />

                  {/* Animated Laser Scanline */}
                  <motion.div
                    className="pointer-events-none absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.9)] z-20 opacity-60"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                  />

                  <img
                    src="/blitzbro.jpeg"
                    alt="VISIONX AI Logo"
                    className="w-full max-h-[420px] object-contain rounded-xl relative z-10 select-none"
                  />

                  {/* Bottom Hover Caption Strip */}
                 
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Event Details */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="relative group rounded-3xl p-[1.5px] bg-gradient-to-bl from-fuchsia-500/40 via-white/10 to-cyan-500/40 shadow-[0_0_40px_rgba(255,0,255,0.12)] hover:shadow-[0_0_50px_rgba(0,245,255,0.25)] transition-all duration-500"
          >
            <div className="relative h-full w-full rounded-3xl bg-[#090818]/90 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* Card Header */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.25)]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold orbitron bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                    Event Details
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                 Join us for the most anticipated cultural celebration of 2026! Experience an exciting celebration filled with captivating performances, unforgettable moments, vibrant energy, and a spirit of togetherness.
                </p>
              </div>

              {/* Bottom Neon Motto Banner */}
              <motion.div
                className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-white/10 text-center"
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(0, 245, 255, 0.15)",
                    "0 0 25px rgba(255, 0, 255, 0.25)",
                    "0 0 15px rgba(0, 245, 255, 0.15)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-xs sm:text-sm md:text-base font-bold orbitron tracking-[0.18em] bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                  WHERE VIBES TURN INTO MEMORIES.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Poster Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-3xl p-[1.5px] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 shadow-[0_0_70px_rgba(0,245,255,0.35)]"
            >
              <div className="relative rounded-3xl bg-[#080717] p-4">
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/70 border border-white/20 text-white hover:text-cyan-300 hover:border-cyan-400 transition cursor-pointer"
                  aria-label="Close Poster"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src="/BROCHURE.jpeg"
                  alt="VISIONX AI Logo Full View"
                  className="w-full max-h-[80vh] object-contain rounded-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
