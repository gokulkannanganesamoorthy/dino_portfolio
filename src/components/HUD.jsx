import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValue, useTransform } from 'framer-motion';

export default function HUD() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      {/* Top Left: Bio-Data */}
      <div className="fixed top-6 left-6 z-50 flex flex-col gap-1 mix-blend-difference pointer-events-none">
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-50">
          Identity
        </span>
        <span className="text-xs font-bold tracking-tight">
          GOKUL.KANNAN_V3
        </span>
      </div>

      {/* Top Right: Time-space */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-1 mix-blend-difference pointer-events-none">
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-50">
          Local.Time
        </span>
        <span className="text-xs font-mono">{time.toLocaleTimeString()}</span>
      </div>

      {/* Bottom Left: Coordinates */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-1 mix-blend-difference pointer-events-none">
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-50">
          Sector
        </span>
        <span className="text-xs font-mono">11.0168° N / 76.9558° E</span>
      </div>

      {/* Right Edge: Scroll Line */}
      <div className="fixed top-0 right-0 w-[2px] h-full bg-white/5 z-40">
        <motion.div
          style={{ height }}
          className="w-full bg-white shadow-[0_0_20px_white]"
        />
      </div>
    </>
  );
}
