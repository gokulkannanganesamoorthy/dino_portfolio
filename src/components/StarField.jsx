import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const StarField = () => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    // Generate Clouds
    // Increased count for better density
    const newClouds = Array.from({ length: 8 }).map((_, i) => {
      const duration = 20 + Math.random() * 20; // Faster 20-40s range
      return {
        id: `cloud-${i}`,
        top: 2 + Math.random() * 30, // 2% to 32% top
        scale: 0.5 + Math.random() * 0.8,
        duration: duration,
        // Start anywhere within the cycle (0% to 100% complete)
        // Negative delay = start mid-animation
        delay: -Math.random() * duration,
      };
    });
    setClouds(newClouds);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* CLOUDS */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute opacity-80 text-[#d4d4d4]"
          style={{
            top: `${cloud.top}%`,
            left: '100%', // Start off-screen right
            scale: cloud.scale,
          }}
          animate={{
            x: ['0vw', '-120vw'], // Move to off-screen left
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: cloud.delay,
          }}
        >
          {/* Pixel Art Cloud */}
          <div className="relative w-24 h-8 text-current">
            {/* Main Body */}
            <div className="absolute bottom-0 left-4 w-16 h-4 bg-current" />
            {/* Left Bump */}
            <div className="absolute bottom-4 left-4 w-6 h-4 bg-current" />
            {/* Right Bump */}
            <div className="absolute bottom-4 left-10 w-8 h-8 bg-current" />
            {/* Filling gaps */}
            <div className="absolute bottom-4 left-8 w-4 h-4 bg-current" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
