'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Phone, MapPin, Globe, Send, Users, Calendar, Award } from 'lucide-react';
import ParticleBackground from '../ParticleBackground';

const contactCards = [
  {
    id: 1,
    title: 'Instagram',
    value: '@blitz.2k26', // Replace with your actual Instagram handle
    subtitle: 'Updates, Reels & Highlights',
    icon: Instagram,
    color: 'cyan',
    hoverColor: 'from-cyan-500/30 to-blue-500/30',
    borderColor: 'border-cyan-400/30',
    glowColor: 'shadow-cyan-400/30',
    type: 'instagram',
    href: 'https://www.instagram.com/blitz.2k26' // Replace with your actual Instagram URL
  },
  {
    id: 2,
    title: 'Call Us',
    values: [
      '+91 9700716787',
      '+91 9063435324'
    ],
    subtitle: 'Event Coordination & Support',
    icon: Phone,
    color: 'purple',
    hoverColor: 'from-purple-500/30 to-pink-500/30',
    borderColor: 'border-purple-400/30',
    glowColor: 'shadow-purple-400/30',
    type: 'phone'
  },
  {
    id: 3,
    title: 'Visit Us',
    value: 'Vagdevi Commerce College',
    subtitle: 'Andhra Pradesh, Visakhapatnam, India',
    icon: MapPin,
    color: 'green',
    hoverColor: 'from-green-500/30 to-emerald-500/30',
    borderColor: 'border-green-400/30',
    glowColor: 'shadow-green-400/30',
    type: 'map',
    href: 'https://www.google.com/maps/dir/?api=1&destination=Aditya+Degree+College+Gajuwaka'
  },
  {
    id: 4,
    title: 'Website',
    value: 'www.Blitz.in',
    subtitle: 'Event Portal & Resources',
    icon: Globe,
    color: 'orange',
    hoverColor: 'from-orange-500/30 to-red-500/30',
    borderColor: 'border-orange-400/30',
    glowColor: 'shadow-orange-400/30',
    type: 'website',
    href: 'https://blitz.netlify.app' // Added https:// so external link works properly
  },
];

const ContactCard = ({ card }: { card: typeof contactCards[0] }) => {
  const Icon = card.icon;

  // Function to determine the correct wrapper for the link
  const renderValue = (value: string | string[]) => {
    if (card.type === 'website' || card.type === 'instagram' || card.type === 'map') {
      return (
        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-semibold text-lg hover:underline transition-transform duration-300"
        >
          {value}
        </a>
      );
    } else if (card.type === 'phone' && Array.isArray(value)) {
      return (
        <div className="flex flex-col items-center gap-1">
          {value.map((phone, idx) => (
            <a
              key={idx}
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="text-white font-semibold text-lg hover:underline transition-transform duration-300"
            >
              {phone}
            </a>
          ))}
        </div>
      );
    }
    return (
      <p className="text-white font-semibold text-lg">
        {value}
      </p>
    );
  };

  return (
    <motion.div
      className={`glassmorphism rounded-2xl p-6 neon-border group hover:scale-105 transition-all duration-500 relative overflow-hidden ${card.borderColor}`} whileHover={{ y: -10, boxShadow: `0 20px 40px ${card.glowColor.replace('shadow-', 'rgba').replace('/30', ', 0.3)')}`
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${card.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        initial={{ scale: 0, rotate: 0 }}
        whileHover={{ scale: 1.2, rotate: 45 }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative z-10 space-y-4">
        {/* Icon with Rotating Border */}
        <div className="relative">
          <motion.div
            className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center border-2"
            style={{ borderColor: `var(--${card.color}-400)` }} animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} > <Icon className={`w-8 h-8 text-${card.color}-400`} />
          </motion.div>
          
          {/* Pulsing Glow Effect */}
          <motion.div
            className={`absolute inset-0 w-16 h-16 mx-auto rounded-full bg-${card.color}-400/20 blur-xl`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Content */}
        <div className="text-center space-y-2">
          <h3 className={`text-xl font-bold orbitron text-${card.color}-400 group-hover:text-white transition-colors duration-300`}>
            {card.title}
          </h3>

          {/* Handle single value or multiple values with clickable links */}
          {card.values ? (
            renderValue(card.values)
          ) : (
            renderValue(card.value!)
          )}

          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
            {card.subtitle}
          </p>
        </div>

        {/* Scanning Line Effect */}
        <motion.div
          className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${card.color}-400 to-transparent opacity-0 group-hover:opacity-100`}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative min-h-screen py-20 overflow-hidden">
      {/* Multi-layered Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-900/30 to-purple-900/50" />
      <ParticleBackground density={80} color="#4f46e5" />

      {/* Animated Wave Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)
            `,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Moving Spotlight */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full blur-3xl"
        animate={{
          x: ['10%', '80%', '10%'],
          y: ['20%', '70%', '20%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div ref={ref} className="relative z-10 container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold orbitron holographic-text mb-6"
            animate={isInView ? {
              textShadow: [
                '0 0 20px rgba(79, 70, 229, 0.5)',
                '0 0 40px rgba(147, 51, 234, 0.8)',
                '0 0 20px rgba(79, 70, 229, 0.5)',
              ],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Contact Us
          </motion.h2>
          
          {/* Animated Underline */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))',
            }}
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Get in touch with us for event registration, partnership opportunities, 
            or any questions about BLITZ 2K26
          </motion.p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {contactCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <ContactCard card={card} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8 }}
          className="text-center"
        >
          <div className="glassmorphism rounded-3xl p-12 max-w-4xl mx-auto neon-border relative overflow-hidden">
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, rgba(79, 70, 229, 0.3) 25%, transparent 25%),
                  linear-gradient(-45deg, rgba(147, 51, 234, 0.3) 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, rgba(79, 70, 229, 0.3) 75%),
                  linear-gradient(-45deg, transparent 75%, rgba(147, 51, 234, 0.3) 75%)
                `,
                backgroundSize: '20px 20px',
              }}
              animate={{ x: [0, 20], y: [0, 20] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10 space-y-6">
             <p className="text-center text-gray-400">
  <span className="gradient-text font-semibold">BLITZ 2K26</span>
  <br />
  November 29, 2026 <br /> Vagdevi Commerce College
</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-32 right-16 w-32 h-32 border border-indigo-400/20 rounded-full"
        animate={{ 
          rotate: 360, 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity },
          opacity: { duration: 3, repeat: Infinity }
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-16 w-24 h-24 border border-purple-400/20 rounded-full"
        animate={{ 
          rotate: -360, 
          y: [-10, 10, -10],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity },
          opacity: { duration: 2, repeat: Infinity }
        }}
      />
    </section>
  );
};

export default Contact;
