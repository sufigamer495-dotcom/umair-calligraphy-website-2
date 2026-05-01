import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '@/components/SectionHeading';
import { useCountUp } from '@/hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  {
    title: 'ISLAMIC CALLIGRAPHY',
    description: 'Traditional scripts including Thuluth, Diwani, and Naskh, executed with classical rules and sacred proportions.',
  },
  {
    title: 'MODERN CALLIGRAPHY',
    description: 'Contemporary interpretations of Arabic letterforms, creating abstract compositions that speak to modern aesthetics.',
  },
  {
    title: 'CUSTOM NAME DESIGNS',
    description: 'Bespoke monograms and personalized name art, thoughtfully intertwined for a unique visual identity.',
  },
  {
    title: 'DECORATIVE LETTERING',
    description: 'Large-scale pieces and murals designed to integrate seamlessly into interior architecture.',
  },
];

function StatItem({ value, label }: { value: number; label: string }) {
  const { ref, display } = useCountUp(value);

  return (
    <div className="text-center">
      <span ref={ref} className="font-display text-[40px] text-[#1A1A1A]">
        {display}+
      </span>
      <p className="label-uppercase text-[#999999] mt-2">{label}</p>
    </div>
  );
}

export function About() {
  const bioRef = useRef<HTMLDivElement>(null);
  const disciplinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const triggers: ScrollTrigger[] = [];

    // Bio section slide-in
    if (bioRef.current) {
      const leftCol = bioRef.current.querySelector('.bio-left');
      const rightCol = bioRef.current.querySelector('.bio-right');
      if (leftCol) gsap.set(leftCol, { opacity: 0, x: -30 });
      if (rightCol) gsap.set(rightCol, { opacity: 0, x: 30 });

      triggers.push(ScrollTrigger.create({
        trigger: bioRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          if (leftCol) gsap.to(leftCol, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' });
          if (rightCol) gsap.to(rightCol, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 });
        },
      }));
    }

    // Disciplines stagger
    if (disciplinesRef.current) {
      const items = disciplinesRef.current.children;
      gsap.set(items, { opacity: 0, y: 24 });

      triggers.push(ScrollTrigger.create({
        trigger: disciplinesRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
        },
      }));
    }

    return () => { triggers.forEach((t) => t.kill()); };
  }, []);

  return (
    <div className="min-h-screen pt-[120px] pb-20 bg-white">
      {/* Hero */}
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20 text-center pb-20">
        <SectionHeading eyebrow="THE ARTIST" title="About Umair" />
      </div>

      {/* Bio */}
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20 pb-20" ref={bioRef}>
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-16">
          <div className="bio-left aspect-[3/4] overflow-hidden bg-[#FAFAFA]">
            <img
              src="/images/artist-portrait.jpg"
              alt="Umair, calligraphy artist"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="bio-right">
            <span className="label-uppercase text-gold block mb-4">A NOTE FROM THE ARTIST</span>
            <p className="font-display text-2xl italic text-[#1A1A1A] leading-relaxed mb-8">
              "I do not write letters. I listen for them, and then I let them appear."
            </p>
            <div className="space-y-5 text-body font-body font-light text-[#666666] leading-relaxed">
              <p>
                Umair is a contemporary calligraphy artist working at the intersection of classical Arabic tradition and modern visual language. Born into a family that revered the written word, he spent his early years copying verses by hand under his grandfather's quiet correction — an apprenticeship that became a vocation.
              </p>
              <p>
                He went on to formal training under master calligraphers in Istanbul and Cairo, where he earned the ijazah — the traditional license to teach — in both Thuluth and Diwani. Fifteen years later, his hand moves with the same patience: every composition begins with silence, a single sheet of paper, and a reed pen cut that morning.
              </p>
              <p>
                Today, Umair's work hangs in private homes, embassies, and design-forward offices across four continents. His commissions range from sacred Qur'anic verses on archival paper to sweeping modernist wall pieces for hotels and collectors. Each work is signed, numbered, and accompanied by a written note explaining the verse, the script, and the choices that shaped it.
              </p>
              <p>
                He works alone, by appointment, from a small studio bathed in north light. He answers every commission inquiry himself.
              </p>
            </div>
            <p className="mt-6 font-display italic text-[#666666]">— Umair</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-[800px] mx-auto px-6 md:px-10 lg:px-20 py-12 border-t border-b border-[#E5E5E5]">
        <div className="grid grid-cols-3 gap-8">
          <StatItem value={15} label="YEARS OF PRACTICE" />
          <StatItem value={400} label="COMMISSIONS DELIVERED" />
          <StatItem value={32} label="COUNTRIES SHIPPED TO" />
        </div>
      </div>

      {/* Disciplines */}
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20 py-20">
        <h2 className="font-display text-section-heading text-center mb-12">Disciplines</h2>
        <div ref={disciplinesRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[800px] mx-auto">
          {disciplines.map((d, i) => (
            <div key={i}>
              <h3 className="label-uppercase text-[#1A1A1A] mb-3">{d.title}</h3>
              <p className="text-body font-body font-light text-[#666666] leading-relaxed">
                {d.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
