
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

/* =========================================================
   ORIGINAL NEON BACKDROP — BACKGROUND NOT CHANGED
========================================================= */

const NeonBackdrop = ({
  particles,
}: {
  particles: Particle[];
}) => (
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

/* =========================================================
   PRELOADER
========================================================= */

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [screen, setScreen] = useState<Screen>("preloader");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  /* -------------------------------------------------------
     PRE-LOAD VOICES
  ------------------------------------------------------- */

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  /* -------------------------------------------------------
     GENERATE PARTICLES
  ------------------------------------------------------- */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const count = window.innerWidth < 640 ? 40 : 100;

    const generatedParticles: Particle[] = Array.from({
      length: count,
    }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 3,

      // Only cyan / white — no dark text or black elements
      color:
        Math.random() > 0.35
          ? "#00f5ff"
          : "#ffffff",
    }));

    setParticles(generatedParticles);
  }, []);

  /* -------------------------------------------------------
     AUTOMATIC PRELOADER PROGRESS
  ------------------------------------------------------- */

  useEffect(() => {
    if (screen !== "preloader") return;

    let transitionTimeout:
      | ReturnType<typeof setTimeout>
      | undefined;

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

      if (transitionTimeout) {
        clearTimeout(transitionTimeout);
      }
    };
  }, [screen]);

  /* -------------------------------------------------------
     WELCOME VOICE
  ------------------------------------------------------- */

  const speakWelcome = () => {
    if (!name.trim() || !gender) return;

    const cleanName = name.trim();
    const title = gender === "male" ? "Mr." : "Ms.";

    const message = `Welcome to Blitz, ${title} ${cleanName}.`;

    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        message
      );

      utterance.lang = "en-US";
      utterance.rate = 0.88;
      utterance.pitch =
        gender === "female" ? 1.05 : 0.95;
      utterance.volume = 1;

      const voices =
        window.speechSynthesis.getVoices();

      const preferredVoice =
        voices.find(
          (voice) =>
            voice.lang
              .toLowerCase()
              .startsWith("en-us") &&
            /google|microsoft|natural/i.test(
              voice.name
            )
        ) ||
        voices.find((voice) =>
          voice.lang
            .toLowerCase()
            .startsWith("en-us")
        ) ||
        voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    }

    onComplete();
  };

  const handleContinue = () => {
    if (!name.trim() || !gender) return;

    speakWelcome();
  };

  const isFormValid = Boolean(
    name.trim() && gender
  );

  return (
    <AnimatePresence mode="wait">

      {/* =====================================================
          SCENE 1 — PREMIUM VAGDEVI INTRO
          ORIGINAL BACKGROUND PRESERVED
      ===================================================== */}

      {screen === "preloader" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-black to-purple-950/60 px-4"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 1,
          }}
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

          {/* =================================================
              PREMIUM CENTRAL CONTENT
          ================================================= */}

          <motion.div
            className="relative flex flex-col items-center justify-center text-center"
            initial={{
              scale: 0.88,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* ===============================================
                TOP LABEL
            =============================================== */}

            <motion.div
              className="mb-4 flex items-center gap-3 sm:mb-5"
              initial={{
                opacity: 0,
                y: -12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.7,
              }}
            >
              <span className="h-px w-7 bg-gradient-to-r from-transparent to-cyan-300/70 sm:w-12" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.5em] text-cyan-200/80 sm:text-[11px]">
                Presents
              </span>

              <span className="h-px w-7 bg-gradient-to-l from-transparent to-cyan-300/70 sm:w-12" />
            </motion.div>

            {/* ===============================================
                MAIN VAGDEVI
            =============================================== */}

            <div className="relative">

              {/* Ambient glow */}
              <motion.div
                className="pointer-events-none absolute -inset-20 rounded-full sm:-inset-28"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,245,255,0.25) 0%, rgba(168,85,247,0.14) 42%, transparent 72%)",
                  filter: "blur(45px)",
                }}
                animate={{
                  opacity: [0.45, 0.85, 0.45],
                  scale: [0.94, 1.08, 0.94],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.h1
                className="relative bg-gradient-to-r from-cyan-200 via-white to-purple-300 bg-clip-text text-5xl font-black leading-none tracking-[0.13em] text-transparent sm:text-7xl md:text-8xl"
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  textShadow:
                    "0 0 22px rgba(0,245,255,0.35), 0 0 50px rgba(168,85,247,0.3)",
                }}
              >
                VAGDEVI
              </motion.h1>

              {/* Cinematic light sweep */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 -left-[35%] w-[12%] skew-x-[-20deg]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                  filter: "blur(4px)",
                }}
                animate={{
                  left: [
                    "-35%",
                    "130%",
                  ],
                }}
                transition={{
                  delay: 1.5,
                  duration: 1.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              />
            </div>

            {/* ===============================================
                FRESHERS PARTY
            =============================================== */}

            <motion.p
              className={`${caveat.className} mt-3 bg-gradient-to-r from-purple-300 via-cyan-200 to-purple-300 bg-clip-text text-3xl font-bold tracking-wider text-transparent sm:mt-4 sm:text-5xl`}
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.95,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Freshers Party
            </motion.p>

            {/* ===============================================
                EVENT YEAR
            =============================================== */}

            <motion.div
              className="mt-4 flex items-center gap-3 sm:mt-5"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.2,
                duration: 0.7,
              }}
            >
              <span className="h-px w-6 bg-cyan-300/30 sm:w-10" />

             <span className="text-[8px] font-semibold uppercase tracking-[0.48em] text-white sm:text-[10px]">
  BLITZ • 2k26
</span>

              <span className="h-px w-6 bg-cyan-300/30 sm:w-10" />
            </motion.div>

            {/* ===============================================
                LOADING SECTION
            =============================================== */}

            <motion.div
              className="mt-11 flex w-[270px] flex-col items-center sm:mt-14 sm:w-[350px]"
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.35,
                duration: 0.8,
              }}
            >

              {/* Loading heading */}
              <div className="mb-3 flex w-full items-center justify-between">

                <motion.span
                  className="text-[8px] font-semibold uppercase tracking-[0.32em] text-cyan-200/70 sm:text-[10px]"
                  animate={{
                    opacity: [
                      0.45,
                      1,
                      0.45,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Loading The Vibe
                </motion.span>

                <motion.span
                  className="text-xs font-bold tracking-[0.18em] text-white sm:text-sm"
                  animate={{
                    opacity: [
                      0.7,
                      1,
                      0.7,
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  {progress}%
                </motion.span>

              </div>

              {/* Premium progress track */}
              <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">

                {/* Progress */}
                <motion.div
                  className="relative h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500"
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.1,
                    ease: "linear",
                  }}
                  style={{
                    boxShadow:
                      "0 0 12px rgba(0,245,255,0.8), 0 0 25px rgba(168,85,247,0.45)",
                  }}
                >

                  {/* Moving bright point */}
                  <motion.span
                    className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white"
                    style={{
                      boxShadow:
                        "0 0 7px #ffffff, 0 0 15px #00f5ff",
                    }}
                    animate={{
                      opacity: [
                        0.5,
                        1,
                        0.5,
                      ],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </div>

              {/* Bottom label */}
              <motion.span
                className="mt-4 text-[8px] uppercase tracking-[0.42em] text-white/35 sm:text-[9px]"
                animate={{
                  opacity: [
                    0.25,
                    0.55,
                    0.25,
                  ],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                }}
              >
                Experience Begins Here
              </motion.span>

            </motion.div>

          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            className="absolute bottom-7 left-1/2 h-px w-14 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"
            animate={{
              opacity: [
                0.2,
                0.8,
                0.2,
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
          />

        </motion.div>
      )}

      {/* =====================================================
          SCENE 2 — NAME + GENDER DETAILS
          KEPT FUNCTIONALLY SAME
      ===================================================== */}

      {screen === "details" && (
        <motion.div
          key="details"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950"
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
            transition: {
              duration: 0.8,
            },
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
        >

          <NeonBackdrop particles={particles} />

          <motion.div
            className="relative z-10 w-full max-w-lg px-6 text-center"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.8,
            }}
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
                onChange={(e) =>
                  setName(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    isFormValid
                  ) {
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

                {/* MALE */}
                <motion.button
                  type="button"
                  aria-pressed={
                    gender === "male"
                  }
                  onClick={() =>
                    setGender("male")
                  }
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className={`rounded-2xl border px-5 py-4 font-bold tracking-widest transition-all ${
                    gender === "male"
                      ? "border-cyan-300 bg-cyan-400/15 text-cyan-300 shadow-[0_0_30px_rgba(0,245,255,0.2)]"
                      : "border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/40 hover:text-cyan-300"
                  }`}
                >
                  ♂ MALE
                </motion.button>

                {/* FEMALE */}
                <motion.button
                  type="button"
                  aria-pressed={
                    gender === "female"
                  }
                  onClick={() =>
                    setGender("female")
                  }
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
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
              whileHover={
                isFormValid
                  ? {
                      scale: 1.03,
                    }
                  : undefined
              }
              whileTap={
                isFormValid
                  ? {
                      scale: 0.97,
                    }
                  : undefined
              }
              className={`mt-6 w-full rounded-2xl px-6 py-4 font-extrabold tracking-[0.2em] transition-all ${
                isFormValid
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-[0_0_30px_rgba(0,245,255,0.18)]"
                  : "cursor-not-allowed bg-white/10 text-gray-500"
              }`}
            >
              ENTER THE VIBE
            </motion.button>

          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  );
};

export default Preloader;
