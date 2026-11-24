'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, Brain, Cpu, Network, CheckCircle2, AlertCircle } from 'lucide-react';

interface EventType {
  id: number;
  title: string;
  description: string;
  participants: string;
  icon: React.ElementType;
  date: string;
  link: string;
}

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Inter:wght@400;500;700&display=swap');
  .orbitron { font-family: 'Orbitron', sans-serif; }
  .inter { font-family: 'Inter', sans-serif; }
  .glassmorphism { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
  .neon-border { position: relative; }
  .neon-border::before { content: ''; position: absolute; inset: -2px; border-radius: 18px; background: linear-gradient(45deg,#00ffff,#8000ff,#ff00ff); background-size: 200% 200%; opacity: 0; transition: opacity 0.3s; z-index: -1; }
  .neon-border:hover::before { opacity: 0.5; }
  .pulse-glow { animation: pulse-glow 2s infinite ease-in-out; }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 5px rgba(0,255,255,0.5), 0 0 15px rgba(0,255,255,0.2); }
    50% { box-shadow: 0 0 10px rgba(0,255,255,0.8), 0 0 30px rgba(0,255,255,0.3); }
  }
  .gradient-text { background: linear-gradient(45deg,#00ffff,#8000ff); -webkit-background-clip: text; color: transparent; }
`;

const EventCard = ({ event }: { event: EventType }) => {
  const Icon = event.icon;
  return (
    <motion.div
      className="glassmorphism rounded-2xl p-6 neon-border group hover:scale-[1.02] transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden"
      whileHover={{ y: -5 }}
      layout
    >
      <div className="text-center space-y-4">
        <motion.div
          className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <Icon className="w-8 h-8 text-cyan-400" />
        </motion.div>
        <h3 className="text-2xl font-bold orbitron gradient-text group-hover:text-cyan-400 transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed inter">{event.description}</p>
      </div>

      <div className="flex justify-center gap-6 text-center pt-4 border-t border-gray-700 mt-auto">
        <div className="space-y-1">
          <Calendar className="w-5 h-5 text-cyan-400 mx-auto" />
          <div className="text-cyan-400 font-semibold text-sm">{event.participants}</div>
          <div className="text-gray-400 text-xs">Date</div>
        </div>
        <div className="space-y-1">
          <Clock className="w-5 h-5 text-purple-400 mx-auto" />
          <div className="text-purple-400 font-semibold text-sm">{event.date}</div>
          <div className="text-gray-400 text-xs">Time</div>
        </div>
      </div>

      <Link href={event.link} passHref legacyBehavior>
        <motion.a
          className="mt-4 block py-3 px-4 rounded-lg font-semibold text-sm text-center transition-all duration-300 bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-400 border border-green-500/30 hover:from-green-500/30 hover:to-cyan-500/30 pulse-glow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          JOIN NOW
        </motion.a>
      </Link>
    </motion.div>
  );
};

export default function App() {
  return (
    <>
      <style>{customStyles}</style>
      <section
        id="events"
        className="relative py-10 overflow-hidden text-white inter"
        style={{ backgroundColor: '#161946' }}
      />
    </>
  );
}