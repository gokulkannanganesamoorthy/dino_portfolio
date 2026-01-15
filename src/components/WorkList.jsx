import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: 'AESOP',
    id: '01',
    type: 'COMMERCE',
    img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2670&auto=format&fit=crop',
  },
  {
    title: 'RIMOWA',
    id: '02',
    type: 'IDENTITY',
    img: 'https://images.unsplash.com/photo-1565538962078-4db815fb103c?q=80&w=2670&auto=format&fit=crop',
  },
  {
    title: 'LEICA',
    id: '03',
    type: 'DIGITAL',
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2670&auto=format&fit=crop',
  },
  {
    title: 'BRAUN',
    id: '04',
    type: 'ARCHIVE',
    img: 'https://images.unsplash.com/photo-1595166661605-ba0175b22b62?q=80&w=2626&auto=format&fit=crop',
  },
];

function HolographicCard({ project }) {
  return (
    <div className="group relative w-full md:w-[45%] aspect-[3/4] my-10 perspective-1000">
      {/* RGB Border Gradient */}
      <div className="absolute -inset-1 bg-gradient-to-r from-zenith-red via-transparent to-zenith-cyan opacity-50 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

      <div className="relative h-full bg-black border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
        {/* Image with Scanline/CRT Effect */}
        <div className="relative w-full h-[70%] overflow-hidden mb-4">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[size:100%_2px,3px_100%] pointer-events-none" />
          <img
            src={project.img}
            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-end border-b border-white/20 pb-2 mb-2">
            <span className="text-zinc-500 font-mono text-xs tracking-widest">
              SYS.ID_{project.id}
            </span>
            <span className="text-zenith-cyan font-mono text-xs tracking-widest animate-pulse">
              ONLINE
            </span>
          </div>
          <h3 className="text-5xl font-display font-bold uppercase text-white group-hover:text-transparent group-hover:stroke-text transition-all r-split">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            // {project.type} Protocol
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WorkList() {
  return (
    <section className="min-h-screen bg-black py-20 px-4 md:px-10 overflow-hidden relative">
      {/* Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-20 flex items-center gap-4">
          <div className="w-20 h-[1px] bg-zenith-red" />
          <h2 className="text-sm font-mono text-white tracking-[0.5em] uppercase">
            Databank_Access
          </h2>
        </div>

        <div className="flex flex-wrap justify-between">
          {projects.map((p) => (
            <HolographicCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
