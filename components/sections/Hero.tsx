"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Brain,
  Cpu,
  Network,
  Sparkles,
  Flame,
  Music,
  Zap,
  Gamepad2,
  PartyPopper,
  Disc3,
} from "lucide-react";

// ✅ Custom hook to track viewport
const useViewportSize = () => {
  const [size, setSize] = useState({ isMobile: false, isTablet: false });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

// ✅ Interactive 3D Neon Particle Background
const ThreeDBubbleBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { isMobile, isTablet } = useViewportSize();

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const particleCount = isMobile ? 600 : isTablet ? 1200 : 2200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    // Create soft glowing circle texture procedurally (no external URL dependency)
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.6)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const circleTexture = new THREE.CanvasTexture(canvas);

    // Geometry with per-particle neon colors
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];

    const palette = [
      new THREE.Color("#00f5ff"), // Cyan
      new THREE.Color("#ff00ff"), // Magenta
      new THREE.Color("#8b5cf6"), // Electric Violet
      new THREE.Color("#ffffff"), // Bright Star White
    ];

    for (let i = 0; i < particleCount; i++) {
      vertices.push(
        (Math.random() - 0.5) * 1800,
        (Math.random() - 0.5) * 1800,
        (Math.random() - 0.5) * 1800
      );

      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      colors.push(chosenColor.r, chosenColor.g, chosenColor.b);
      sizes.push(Math.random() * 22 + 4);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: circleTexture },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (280.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform sampler2D pointTexture;
        void main() {
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          gl_FragColor = vec4(vColor, texColor.a * 0.85);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particles.rotation.x += 0.0015 + (mouseY - particles.rotation.x) * 0.02;
      particles.rotation.y += 0.002 + (mouseX - particles.rotation.y) * 0.02;
      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      circleTexture.dispose();
      renderer.dispose();
    };
  }, [isMobile, isTablet]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

// ✅ Festival Pillars Configuration
const PILLARS = [
 
  
  {
    label: "Music",
    icon: Music,
    textColor: "text-violet-300",
    iconColor: "text-violet-400",
    borderColor: "hover:border-violet-400/50",
    glow: "hover:shadow-[0_0_20px_rgba(167,139,250,0.25)]",
  },
  {
    label: "Dance",
    icon: Disc3,
    textColor: "text-pink-300",
    iconColor: "text-pink-400",
    borderColor: "hover:border-pink-400/50",
    glow: "hover:shadow-[0_0_20px_rgba(244,114,182,0.25)]",
  },
  {
    label: "Celebration",
    icon: PartyPopper,
    textColor: "text-orange-300",
    iconColor: "text-orange-400",
    borderColor: "hover:border-orange-400/50",
    glow: "hover:shadow-[0_0_20px_rgba(251,146,60,0.25)]",
  },
];

// ✅ Main Hero Section
const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#030308] min-h-screen text-white selection:bg-fuchsia-500 selection:text-white">
      <section
        id="home"
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      >
        {/* Deep Cyber Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e0747_0%,_#090a24_50%,_#030308_100%)]" />

        {/* Interactive Cursor Aura Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 245, 255, 0.12), rgba(255, 0, 255, 0.06) 40%, transparent 80%)`,
          }}
        />

        {/* Ambient Glowing Orbs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[120px] animate-pulse" />

        {/* 3D Interactive Particles */}
        <ThreeDBubbleBackground />

        {/* Perspective Holographic Floor Grid */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 245, 255, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 0, 255, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 80%)",
              animation: "grid-move 20s linear infinite",
            }}
          />
        </div>

        {/* Floating Neon Glass Icons */}
        <motion.div
          className="pointer-events-none absolute top-24 left-16 text-cyan-400/40 hidden lg:flex p-4 rounded-2xl bg-white/[0.03] border border-cyan-400/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,245,255,0.15)]"
          animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain size={44} />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute top-32 right-20 text-fuchsia-400/40 hidden lg:flex p-4 rounded-2xl bg-white/[0.03] border border-fuchsia-400/20 backdrop-blur-md shadow-[0_0_30px_rgba(255,0,255,0.15)]"
          animate={{ y: [0, 18, 0], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cpu size={40} />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-32 left-24 text-purple-400/40 hidden lg:flex p-4 rounded-2xl bg-white/[0.03] border border-purple-400/20 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.15)]"
          animate={{ y: [-12, 12, -12], scale: [1, 1.08, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Network size={42} />
        </motion.div>

        {/* Main Center Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
          {/* Top Event Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-cyan-400/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,245,255,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-cyan-200 uppercase">
              The Ultimate Campus Festival
            </span>
          </motion.div>

          {/* Hero Title: BLITZ + 2K26 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none select-none bg-gradient-to-b from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,245,255,0.45)]">
              BLITZ
            </h1>

            {/* Glowing Year Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="-mt-2 md:-mt-4 inline-block"
            >
              <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.2em] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,0,255,0.6)]">
                2K26
              </span>
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 text-xl sm:text-2xl md:text-4xl font-extrabold tracking-wide text-white"
          >
            LET THE{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
              VIBE
            </span>{" "}
            OWN THE STAGE
          </motion.h2>

          {/* Glassmorphic Pillar Chips: Talent • Culture • Energy • Play • Music • Dance • Celebration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:gap-3.5 max-w-3xl"
          >
            {PILLARS.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.65 + idx * 0.06 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-sm md:text-base font-medium transition-all duration-300 ${pillar.textColor} ${pillar.borderColor} ${pillar.glow}`}
                >
                  <IconComponent className={`w-4 h-4 ${pillar.iconColor}`} />
                  <span>{pillar.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-6 text-base md:text-lg text-gray-300/90 tracking-wide max-w-2xl mx-auto font-normal"
          >
            Experience the energy, showcase your talent, play to win, dance to the beat, and celebrate memories that last forever.
          </motion.p>

          {/* CTA Button with Animated Shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-9"
          >
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToAbout}
              className="group relative inline-flex items-center gap-3 px-10 py-4 text-lg md:text-xl font-extrabold tracking-wider text-white rounded-full overflow-hidden cursor-pointer transition-all"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #00f5ff, #c026d3, #00f5ff)",
                backgroundSize: "200% auto",
                animation: "button-glow 4s linear infinite",
              }}
            >
              {/* Glossy inner highlight */}
              <span className="absolute inset-[2px] rounded-full bg-[#090818]/80 group-hover:bg-transparent transition-colors duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                ENTER THE VIBE
                <Sparkles className="w-5 h-5 text-cyan-300 group-hover:rotate-12 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.8 }}
          onClick={scrollToAbout}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="p-2 rounded-full bg-white/[0.04] border border-cyan-400/40 group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.5)] transition-all"
          >
            <ChevronDown className="text-cyan-400 w-5 h-5" />
          </motion.div>
        </motion.div>

        <style jsx>{`
          @keyframes button-glow {
            0% {
              background-position: 0% center;
              box-shadow: 0 0 20px rgba(0, 245, 255, 0.45),
                0 0 40px rgba(192, 38, 211, 0.35);
            }
            50% {
              background-position: 100% center;
              box-shadow: 0 0 30px rgba(192, 38, 211, 0.65),
                0 0 60px rgba(0, 245, 255, 0.45);
            }
            100% {
              background-position: 0% center;
              box-shadow: 0 0 20px rgba(0, 245, 255, 0.45),
                0 0 40px rgba(192, 38, 211, 0.35);
            }
          }
          @keyframes grid-move {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 60px 60px;
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default App;