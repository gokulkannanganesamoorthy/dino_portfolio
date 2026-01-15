import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

const items = [
  { id: 'hero', label: 'VOID' },
  { id: 'work', label: 'DECK' },
  { id: 'about', label: 'DATA' },
  { id: 'contact', label: 'LINK' },
];

function DockItem({ id, label }) {
  const ref = useRef(null);
  // Real implementation would need mouse position context or ref passing,
  // simplified for "IsAlive" feel with hover scale

  return (
    <motion.a
      href={`#${id}`}
      ref={ref}
      className="relative flex items-center justify-center w-12 h-12 rounded-full glass-panel hover:bg-white hover:text-black transition-colors cursor-none"
      whileHover={{ scale: 1.5, y: -10 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="text-[8px] font-bold tracking-widest uppercase">
        {label}
      </span>
    </motion.a>
  );
}

export default function Dock() {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="flex items-end gap-4 px-4 py-3 rounded-2xl glass-panel">
        {items.map((item) => (
          <DockItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
