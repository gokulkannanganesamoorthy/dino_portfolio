import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed left-0 top-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-exclusion"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: '-50%',
          y: '-50%',
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>

      {/* Prismatic Halo */}
      <motion.div
        className="fixed left-0 top-0 w-20 h-20 pointer-events-none z-[9998] mix-blend-screen opacity-50 filter blur-md"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: '-50%',
          y: '-50%',
        }}
      >
        <div className="w-full h-full border-2 border-zenith-cyan rounded-full absolute top-[2px] left-[2px]" />
        <div className="w-full h-full border-2 border-zenith-red rounded-full absolute -top-[2px] -left-[2px]" />
      </motion.div>
    </>
  );
}
