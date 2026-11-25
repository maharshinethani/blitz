"use client";

import { useEffect, useState } from "react";
import { Caveat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

type Gender = "male" | "female" | null;
type Screen = "preloader" | "details";

interface Particle {
  left: number;
  top: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
}

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const NeonBackdrop = ({ particles }: { particles: Particle[] }) => (
  <>
    {/* Background Waves */}
    <div className="pointer-events-none absolute inset-0">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            filter: "blur(100px)",
          }}
        />
      ))}
    </div>

    {/* Floating Particles */}
    <div className="pointer-events-none absolute inset-0">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            backgroundColor: particle.color,
            boxShadow: `0 0 8px ${particle.color}`,
          }}
          animate={{
            y: [0, particle.y, 0],
            x: [0, particle.x, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  </>
);

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [screen, setScreen] = useState<Screen>("preloader");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Pre-load voices early so they are ready on button click
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Generate particles once on mount based on viewport width
  useEffect(() => {
    if (typeof window === "undefined") return;

    const count = window.innerWidth < 640 ? 40 : 100;

    const generatedParticles: Particle[] = Array.from({ length: count }).map(
      () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 3,
        color: Math.random() > 0.5 ? "#00f5ff" : "#ff00ff",
      })
    );

    setParticles(generatedParticles);
  }, []);

  // Automatic preloader progress
  useEffect(() => {
    if (screen !== "preloader") return;

    let transitionTimeout: ReturnType<typeof setTimeout> | undefined;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }

        const next = prev + 1;
        if (next === 100) {
          clearInterval(timer);
          transitionTimeout = setTimeout(() => {
            setScreen("details");
          }, 800);
        }

        return next;
      });
    }, 40);

    return () => {
      clearInterval(timer);
      if (transitionTimeout) clearTimeout(transitionTimeout);
    };
  }, [screen]);

  const speakWelcome = () => {
    if (!name.trim() || !gender) return;

    const cleanName = name.trim();
    const title = gender === "male" ? "Mr." : "Ms.";
    const message = `Welcome to Blitz, ${title} ${cleanName}.`;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(message);

      utterance.lang = "en-US";
      utterance.rate = 0.88;
      utterance.pitch = gender === "female" ? 1.05 : 0.95;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();

      const preferredVoice =
        voices.find(
          (voice) =>
            voice.lang.toLowerCase().startsWith("en-us") &&
            /google|microsoft|natural/i.test(voice.name)
        ) ||
        voices.find((voice) =>
          voice.lang.toLowerCase().startsWith("en-us")
        ) ||
        voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      // Speak directly inside the click event handler so browsers allow audio
      window.speechSynthesis.speak(utterance);
    }

    // Move to next page right away while voice plays in background
    onComplete();
  };

  const handleContinue = () => {
    if (!name.trim() || !gender) return;

    speakWelcome();
  };

  const isFormValid = Boolean(name.trim() && gender);

  return (
    <AnimatePresence mode="wait">
      {/* SCREEN 1 — MESMERIZING TEXT PRELOADER */}
      {screen === "preloader" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-black to-purple-950/60 px-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(10px)",
            transition: {
              duration: 0.9,
              ease: "easeInOut",
            },
          }}
        >
          <NeonBackdrop particles={particles} />

          {/* Center Mesmerizing Typography & Rings */}
          <motion.div
            className="relative flex flex-col items-center justify-center text-center"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Ambient Neon Glow Aura */}
            <motion.div
              className="pointer-events-none absolute -inset-24 rounded-full sm:-inset-36"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,245,255,0.28) 0%, rgba(168,85,247,0.18) 45%, transparent 75%)",
                filter: "blur(45px)",
              }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.1, 0.95] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Main Event Title */}
            <motion.h1
              className="relative bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-5xl font-black tracking-[0.15em] text-transparent drop-shadow-[0_0_25px_rgba(0,245,255,0.6)] sm:text-7xl"
              animate={{
                y: [0, -5, 0],
                textShadow: [
                  "0 0 20px rgba(0,245,255,0.4)",
                  "0 0 40px rgba(168,85,247,0.7)",
                  "0 0 20px rgba(0,245,255,0.4)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              VAGDEVI
            </motion.h1>

            {/* Subtitle: Freshers Party */}
            <motion.p
              className={`${caveat.className} mt-2 bg-gradient-to-r from-purple-300 via-cyan-200 to-purple-300 bg-clip-text text-3xl font-bold tracking-wider text-transparent sm:text-5xl`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Freshers Party
            </motion.p>

            <motion.span
              className="mb-3 text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300/80 sm:text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Loading The Vibe
            </motion.span>

            {/* Progress Percentage & Bar */}
            <div className="mt-10 flex flex-col items-center">
              <motion.p
                className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-lg font-bold tracking-[0.25em] text-transparent sm:text-xl"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {progress}%
              </motion.p>

              <div className="mt-3 h-1.5 w-64 overflow-hidden rounded-full bg-white/10 p-[1px] backdrop-blur-sm sm:w-80">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 shadow-[0_0_15px_#00f5ff]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* SCREEN 2 — NAME + GENDER DETAILS */}
      {screen === "details" && (
        <motion.div
          key="details"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.8 } }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <NeonBackdrop particles={particles} />

          <motion.div
            className="relative z-10 w-full max-w-lg px-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1
              className={`${caveat.className} text-center text-[36px] font-bold leading-[1.15] text-white sm:text-[44px]`}
            >
              Before the vibe begins, tell us who you are?
            </h1>

            {/* NAME */}
            <div className="mt-8">
              <label
                htmlFor="freshers-name"
                className="mb-2 block text-left text-xs font-semibold tracking-[0.2em] text-cyan-300"
              >
                ENTER YOUR NAME
              </label>

              <input
                id="freshers-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isFormValid) {
                    handleContinue();
                  }
                }}
                placeholder=""
                maxLength={30}
                autoComplete="name"
                className="w-full rounded-2xl border border-cyan-400/30 bg-black/50 px-5 py-4 text-center text-lg font-semibold tracking-wider text-white outline-none backdrop-blur-xl transition-all placeholder:text-gray-600 focus:border-cyan-400 focus:shadow-[0_0_30px_rgba(0,245,255,0.2)]"
              />
            </div>

            {/* GENDER */}
            <div className="mt-6">
              <p className="mb-3 text-left text-xs font-semibold tracking-[0.2em] text-gray-400">
                SELECT YOUR GENDER
              </p>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  aria-pressed={gender === "male"}
                  onClick={() => setGender("male")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-2xl border px-5 py-4 font-bold tracking-widest transition-all ${
                    gender === "male"
                      ? "border-cyan-300 bg-cyan-400/15 text-cyan-300 shadow-[0_0_30px_rgba(0,245,255,0.2)]"
                      : "border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/40 hover:text-cyan-300"
                  }`}
                >
                  ♂ MALE
                </motion.button>

                <motion.button
                  type="button"
                  aria-pressed={gender === "female"}
                  onClick={() => setGender("female")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-2xl border px-5 py-4 font-bold tracking-widest transition-all ${
                    gender === "female"
                      ? "border-purple-300 bg-purple-400/15 text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                      : "border-white/10 bg-white/5 text-gray-400 hover:border-purple-400/40 hover:text-purple-300"
                  }`}
                >
                  ♀ FEMALE
                </motion.button>
              </div>
            </div>

            {/* CONTINUE */}
            <motion.button
              type="button"
              disabled={!isFormValid}
              onClick={handleContinue}
              whileHover={isFormValid ? { scale: 1.03 } : undefined}
              whileTap={isFormValid ? { scale: 0.97 } : undefined}
              className={`mt-6 w-full rounded-2xl px-6 py-4 font-extrabold tracking-[0.2em] transition-all ${
                isFormValid
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-gray-600"
                  : "cursor-not-allowed bg-white/10 text-gray-600"
              }`}
            >
              Enter the vibe
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
