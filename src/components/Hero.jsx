import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

function GlitchText({ text, size = 'large' }) {
  return (
    <div className="relative group cursor-none">
      <h1
        className={`${
          size === 'large' ? 'text-[15vw] leading-[0.8]' : 'text-4xl'
        } font-display font-bold uppercase text-white mix-blend-exclusion relative z-10 duration-200 group-hover:opacity-0`}
      >
        {text}
      </h1>

      {/* Red Channel (Glitch) */}
      <h1
        className={`${
          size === 'large' ? 'text-[15vw] leading-[0.8]' : 'text-4xl'
        } font-display font-bold uppercase text-zenith-red absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:skew-x-12 transition-all duration-100`}
      >
        {text}
      </h1>

      {/* Cyan Channel (Glitch) */}
      <h1
        className={`${
          size === 'large' ? 'text-[15vw] leading-[0.8]' : 'text-4xl'
        } font-display font-bold uppercase text-zenith-cyan absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 group-hover:-skew-x-12 transition-all duration-100`}
      >
        {text}
      </h1>

      {/* Fast Flicker Overlay */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 group-hover:animate-pulse pointer-events-none mix-blend-overlay" />
    </div>
  );
}

export default function Hero() {
  const container = useRef(null);

  return (
    <div
      ref={container}
      className="h-screen w-full flex flex-col justify-center items-center bg-black relative overflow-hidden scanlines"
    >
      {/* Background Noise/Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 2, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, bounce: 0.5, type: 'spring' }}
        >
          <GlitchText text="ZERO" />
        </motion.div>

        <motion.div
          initial={{ scale: 2, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            bounce: 0.5,
            type: 'spring',
          }}
        >
          <GlitchText text="GRAVITY" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 flex items-center gap-4 text-zenith-cyan font-mono tracking-widest text-sm uppercase"
        >
          <span className="w-2 h-2 bg-zenith-red rounded-full animate-ping" />
          <span>System Online // V4.0</span>
          <span className="w-2 h-2 bg-zenith-red rounded-full animate-ping" />
        </motion.div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_40%,#000_100%)]" />
    </div>
  );
}
