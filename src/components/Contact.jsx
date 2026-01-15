import { useState, useEffect } from 'react';

export default function Contact() {
  const [text, setText] = useState('');
  const target = 'INITIATE_UPLINK';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(target.slice(0, i) + (Math.random() > 0.5 ? '█' : '_'));
      i++;
      if (i > target.length) {
        setText(target);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-[80vh] bg-black flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-red-900/10 animate-pulse" />

      <div className="relative z-10 text-center border border-zenith-red p-10 md:p-20 bg-black/80 backdrop-blur-sm">
        <p className="text-zenith-red font-mono text-xs tracking-[0.5em] mb-10 animate-pulse">
          WARNING: SYSTEM OVERRIDE
        </p>

        <a href="mailto:gokulkannan.dev@gmail.com" className="block group">
          <h2 className="text-6xl md:text-9xl font-display font-bold text-white mix-blend-difference group-hover:text-zenith-red transition-colors duration-200">
            {text}
          </h2>
          <p className="mt-4 text-zinc-500 font-mono text-sm group-hover:text-white">
            &lt; gokulkannan.dev@gmail.com /&gt;
          </p>
        </a>

        <div className="mt-20 flex justify-between w-full text-[10px] font-mono text-zinc-600 uppercase">
          <span>Secured by Zenith</span>
          <span>V4.1.0 (Stable)</span>
        </div>
      </div>
    </section>
  );
}
