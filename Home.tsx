import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '@/components/SectionHeading';
import { ArtworkCard } from '@/components/ArtworkCard';
import { TestimonialCard } from '@/components/TestimonialCard';

gsap.registerPlugin(ScrollTrigger);

const selectedWorks = [
  { image: '/images/selected-1.jpg', caption: 'Thuluth Composition', alt: 'Thuluth Composition - gold calligraphy on black canvas' },
  { image: '/images/selected-2.jpg', caption: 'Modern Minimal', alt: 'Modern Minimal - circular gold Arabic calligraphy' },
  { image: '/images/selected-3.jpg', caption: 'Classic Kufic', alt: 'Classic Kufic - gold calligraphy in white frame' },
  { image: '/images/selected-4.jpg', caption: 'Abstract Flow', alt: 'Abstract Flow - ornate gold medallion calligraphy' },
  { image: '/images/selected-5.jpg', caption: 'Spiritual Harmony', alt: 'Spiritual Harmony - diagonal flowing gold script' },
  { image: '/images/selected-6.jpg', caption: 'Golden Details', alt: 'Golden Details - minimal gold lettering in frame' },
];

const archiveImages = [
  '/images/archive-1.jpg',
  '/images/archive-2.jpg',
  '/images/archive-3.jpg',
  '/images/archive-4.jpg',
  '/images/archive-5.jpg',
  '/images/archive-6.jpg',
  '/images/archive-7.jpg',
  '/images/archive-8.jpg',
];

const testimonials = [
  {
    quote: "Umair's piece for our entrance hall completely transformed the space. His ability to blend classical proportions with a distinctly modern sensibility is unmatched.",
    name: 'Layla Rahman',
    role: 'Private Collector, London',
  },
  {
    quote: 'We commissioned a bespoke corporate artwork and the entire process was deeply collaborative. The final piece speaks volumes about our company\'s heritage while feeling entirely forward-looking.',
    name: 'Daniel Hartwell',
    role: 'Creative Director, Dubai',
  },
  {
    quote: 'For my clients who desire something truly unique, Umair is always my first call. His custom name calligraphies are heirloom-quality works of art that anchor a room.',
    name: 'Aisha Khoury',
    role: 'Interior Designer, New York',
  },
  {
    quote: 'The personalized monogram Umair designed for our wedding was beyond elegant. We have it framed in our home, a daily reminder of a patient, considered artistry.',
    name: 'Marco Esposito',
    role: 'Private Commission, Milan',
  },
];

function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const content = contentRef.current;
    if (!content) return;

    const elements = content.querySelectorAll('.hero-animate');
    gsap.set(elements, { opacity: 0, y: 24 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Arabic calligraphy artwork in gold on dark background"
          className="w-full h-full object-cover"
          style={{ animation: 'ken-burns 20s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <span className="hero-animate label-uppercase text-gold block mb-6">
          BESPOKE ARABIC CALLIGRAPHY
        </span>
        <h1 className="hero-animate font-display text-hero text-white mb-2">
          Umair
        </h1>
        <h1 className="hero-animate font-display text-hero italic text-gold mb-6">
          Calligraphy
        </h1>
        <p className="hero-animate text-lg font-body font-light text-white/90 mb-3">
          Professional Calligraphy Artist — Islamic, Modern & Custom Art
        </p>
        <p className="hero-animate text-body font-body font-light text-white/70 max-w-xl mx-auto mb-10">
          Every mark is a meditation. I craft bespoke pieces that honor classical Arabic scripts while finding their place in contemporary spaces.
        </p>
        <div className="hero-animate flex flex-wrap justify-center gap-4">
          <Link to="/gallery" className="btn btn-light no-underline">View Gallery</Link>
          <Link to="/order" className="btn btn-outline-light no-underline">Order Custom Design</Link>
          <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light no-underline">
            WhatsApp Contact
          </a>
        </div>
      </div>

      {/* Scroll chevron */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        style={{ animation: 'chevron-bounce 2s ease-in-out infinite' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}

function SelectedWorksSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const items = gridRef.current.children;
    gsap.set(items, { opacity: 0, y: 24 });

    const trigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section className="py-30 bg-white">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20">
        <SectionHeading title="Selected Works" />
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {selectedWorks.map((work, i) => (
            <ArtworkCard key={i} image={work.image} caption={work.caption} alt={work.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtistIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = sectionRef.current;
    if (!el) return;

    const leftCol = el.querySelector('.artist-left');
    const rightCol = el.querySelector('.artist-right');

    if (leftCol) gsap.set(leftCol, { opacity: 0, x: -30 });
    if (rightCol) gsap.set(rightCol, { opacity: 0, x: 30 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        if (leftCol) gsap.to(leftCol, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' });
        if (rightCol) gsap.to(rightCol, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section className="py-30 bg-white" ref={sectionRef}>
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="artist-left aspect-[4/5] overflow-hidden bg-[#FAFAFA]">
            <img
              src="/images/artist-portrait.jpg"
              alt="Umair, calligraphy artist, at his desk"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="artist-right">
            <span className="label-uppercase text-gold block mb-4">THE ARTIST</span>
            <h2 className="font-display text-section-heading mb-6">
              A Patient Hand, A Considered Line
            </h2>
            <div className="space-y-5 text-body font-body font-light text-[#666666] leading-relaxed">
              <p>
                My practice is rooted in the belief that calligraphy is more than beautiful writing — it is the architecture of the soul made visible.
              </p>
              <p>
                Trained formally in the rigorous disciplines of Thuluth, Diwani, Naskh, and Nasta'liq, I approach each custom commission with classical respect and contemporary vision. Whether it's a sacred verse or a personal monogram, the goal is always to create an heirloom that transcends its moment.
              </p>
              <p>
                Every composition begins with silence. A single sheet of paper. A reed pen cut that morning.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/about" className="btn btn-primary no-underline inline-block">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchiveSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const items = gridRef.current.children;
    gsap.set(items, { opacity: 0, y: 24 });

    const trigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section className="py-30 bg-[#FAFAFA]">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20">
        <SectionHeading title="From the Archive" />
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {archiveImages.map((img, i) => (
            <ArtworkCard key={i} image={img} alt={`Archive artwork ${i + 1}`} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/gallery" className="btn btn-secondary no-underline inline-block">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const items = gridRef.current.children;
    gsap.set(items, { opacity: 0, y: 24 });

    const trigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
        });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section className="py-30 bg-white">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20">
        <SectionHeading title="In Their Words" />
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mt-16">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} quote={t.quote} name={t.name} role={t.role} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !ref.current) return;

    gsap.set(ref.current, { opacity: 0, y: 24 });

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section className="py-30 bg-white border-t border-[#E5E5E5]">
      <div ref={ref} className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-section-heading mb-4">
          Let's Create Your Custom Calligraphy
        </h2>
        <p className="text-body font-body font-light text-[#666666] mb-10">
          Reach out to discuss a bespoke piece tailored to your space and story.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/order" className="btn btn-dark no-underline">Order Now</Link>
          <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="btn btn-secondary no-underline">
            WhatsApp Contact
          </a>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <HeroSection />
      <SelectedWorksSection />
      <ArtistIntroSection />
      <ArchiveSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
