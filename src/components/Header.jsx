import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-50 pointer-events-none mix-blend-difference text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="pointer-events-auto">
        <span className="text-sm font-bold tracking-tight uppercase">
          Zenith®
        </span>
      </div>
      <nav className="pointer-events-auto flex flex-col gap-1 text-right text-sm font-medium tracking-wide uppercase">
        <a href="#work" className="hover:opacity-50 transition-opacity">
          Index
        </a>
        <a href="#about" className="hover:opacity-50 transition-opacity">
          Info
        </a>
        <a
          href="mailto:hello@zenith.com"
          className="hover:opacity-50 transition-opacity"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
