import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="py-32 px-4 md:px-20 bg-zenith-bg border-t border-black/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
        <div className="md:col-span-4">
          <span className="block text-xs font-mono uppercase tracking-widest mb-10">
            ( The Profile )
          </span>
          <div className="w-full aspect-[3/4] bg-gray-200 grayscale relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
              alt="Portrait"
            />
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col justify-between py-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif leading-[1.1] mb-12"
            >
              "Be Pro. Be Beyond." <br />
              <span className="text-gray-400 italic">The Motto.</span>
            </motion.h2>

            <div className="columns-1 md:columns-2 gap-10 text-sm md:text-base leading-relaxed text-gray-800 font-sans">
              <p className="mb-6">
                Gokul Kannan Ganesamoorthy is a{' '}
                <span className="font-semibold">Front-End Developer</span>,{' '}
                <span className="font-semibold">Full Stack Engineer</span>, and{' '}
                <span className="font-semibold">Cybersecurity Enthusiast</span>{' '}
                from Coimbatore, India. He holds a B.Tech in IT from PSG College
                of Technology.
              </p>
              <p>
                His approach blends technical precision with a hunger for the
                cutting edge. It is not enough to just build; one must architect
                solutions that stand the test of time and security.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <span className="block text-xs font-mono uppercase tracking-widest mb-6 border-b border-black pb-2">
              The Pit Crew
            </span>
            <div className="flex flex-wrap gap-x-10 gap-y-2 text-xl font-serif italic">
              {[
                'React',
                'Node.js',
                'Python',
                'Burp Suite',
                'Cybersecurity',
              ].map((skill) => (
                <span key={skill} className="block">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
