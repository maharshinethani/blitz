'use client';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import React from 'react';

const speakers = [
  {
    id: 3,
    name: 'Dr. k CHIRANJEEVI',
    title: 'Chairman',
    image: 'data:image/webp;base64,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',
  },
 


];

const chiefGuest = {
  id: 1,
  name: 'RAJASEKHAR ALLADA',
  title: 'President',
  company: 'Techsimplified.com, Texas',
  image: '/CHIEFGUEST.jpg',
  description: "A visionary leader in the software industry with over 30 years of expertise , serving 25+ pension funds. Honored nationally for his early scientific research and globally recognized for his contributions, his mission is to transform education and empower over one million students.."
};

// Interactive Magnifier
const InteractiveMagnifier = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, visible: false });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y, visible: true });
    }
  };

  const handleMouseLeave = () => {
    setPosition(prev => ({ ...prev, visible: false }));
  };

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 rounded-full w-full h-full cursor-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          left: position.x,
          top: position.y,
          opacity: position.visible ? 1 : 0,
          boxShadow: '0 0 15px #22d3ee, 0 0 25px #a855f7, inset 0 0 10px rgba(168,85,247,0.5)',
          background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(168,85,247,0) 70%)',
          pointerEvents: 'none',
        }}
        animate={{
          scale: position.visible ? [1, 1.2, 1] : 0,
          opacity: position.visible ? 1 : 0,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-12 h-12 rounded-full -translate-x-1/2 -translate-y-1/2"
      />
    </motion.div>
  );
};

// Main Speaker Card
const MainSpeakerCard = ({ speaker }: { speaker: any }) => {
  return (
    <motion.div
      key={speaker.id}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="glassmorphism p-8 rounded-2xl cinematic-border-glow cinematic-transition flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8"
    >
      <motion.div
        className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        {/* Neon Glow Aura */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 20px rgba(255, 0, 128, 0.4)",
              "0 0 40px rgba(168, 85, 247, 0.7)",
              "0 0 60px rgba(34, 211, 238, 0.6)"
            ],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Coin Roll Effect with Front & Back Faces */}
        <motion.div
          className="absolute w-full h-full rounded-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, 180, 360], y: [0, -10, 0] }}
          transition={{
            rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          }}
        >
          {/* Front */}
          <img
            src={speaker.image}
            alt={speaker.name}
            className="absolute w-full h-full object-cover rounded-full border-4 border-fuchsia-400/50"
            style={{ backfaceVisibility: "hidden" }}
          />
          {/* Back (mirrored) */}
          <img
            src={speaker.image}
            alt={speaker.name}
            className="absolute w-full h-full object-cover rounded-full border-4 border-fuchsia-400/50"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          />
        </motion.div>

        <InteractiveMagnifier />
      </motion.div>

      <div className="space-y-4 text-center md:text-left flex-grow">
        <h3 className="text-3xl font-bold text-white orbitron gradient-text-holographic">
          {speaker.name}
        </h3>
        <p className="text-lg text-fuchsia-300 font-medium">{speaker.title}</p>
        <p className="text-gray-400 text-sm italic">{speaker.company}</p>
      </div>
    </motion.div>
  );
};

// Chief Guest Card
const ChiefGuestCard = ({ guest }: { guest: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.5 }}
      className="glassmorphism p-12 rounded-3xl neon-border-pulse-chief cinematic-transition 
                 flex flex-col items-center text-center max-w-3xl mx-auto my-20 relative overflow-hidden"
    >
      <h2 className="text-5xl md:text-6xl font-bold orbitron bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 
                     bg-clip-text text-transparent drop-shadow-lg mb-10">
        CHIEF GUEST
      </h2>

      <motion.div className="relative w-72 h-72 md:w-80 md:h-80 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: '0 0 40px #22d3ee, 0 0 80px #a855f7, 0 0 120px #6366f1',
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.img
          src={guest.image}
          alt={guest.name}
          className="w-full h-full object-cover rounded-full border-4 border-cyan-400/60"
          style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.9)' }}
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.05, 1], y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </motion.div>

      <div className="space-y-3 px-4">
        <h3 className="text-4xl font-extrabold text-cyan-300 orbitron tracking-wide">
          {guest.name}
        </h3>
        <p className="text-xl text-fuchsia-400 font-semibold">{guest.title}</p>
        <p className="text-lg text-indigo-300 italic">{guest.company}</p>
        <p className="mt-4 text-gray-300 text-md leading-relaxed max-w-2xl mx-auto">
          {guest.description}
        </p>
      </div>
    </motion.div>
  );
};

// Speaker List Item
const SpeakerListItem = ({ speaker, onClick, isActive, delay }: { speaker: any; onClick: (id: number) => void; isActive: boolean; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, x: 10 }}
      className={`glassmorphism p-4 rounded-xl cursor-pointer cinematic-transition mb-4 ${
        isActive ? 'neon-border-pulse border-fuchsia-400' : 'neon-border-static'
      }`}
      onClick={() => onClick(speaker.id)}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12">
          <img
            src={speaker.image}
            alt={speaker.name}
            className="w-full h-full object-cover rounded-full border border-fuchsia-400/50"
          />
        </div>
        <div>
          <h4 className={`text-md font-bold ${isActive ? 'text-cyan-400' : 'text-white'}`}>
            {speaker.name}
          </h4>
          <p className="text-sm text-gray-400">{speaker.title}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Speakers Section
const Speakers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(speakers[0].id);
  const selectedSpeaker = speakers.find(s => s.id === selectedSpeakerId);
  const totalSpeakers = speakers.length;

  useEffect(() => {
    if (!isInView) return;
    const intervalId = setInterval(() => {
      setSelectedSpeakerId(prevId => {
        const currentIndex = speakers.findIndex(s => s.id === prevId);
        const nextIndex = (currentIndex + 1) % totalSpeakers;
        return speakers[nextIndex].id;
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isInView, totalSpeakers]);

  return (
    <section id="speakers" className="relative min-h-screen py-20 overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-blue-950" />

      <div ref={ref} className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold orbitron holographic-text mb-6">
            OUR VISIONARIES
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the visionaries and experts who will share their insights on this
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <MainSpeakerCard key={selectedSpeaker?.id} speaker={selectedSpeaker} />
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            {speakers.map((speaker, index) => (
              <SpeakerListItem
                key={speaker.id}
                speaker={speaker}
                onClick={setSelectedSpeakerId}
                isActive={selectedSpeakerId === speaker.id}
                delay={index}
              />
            ))}
          </div>
        </motion.div>

      
      </div>
    </section>
  );
};

export default Speakers;
