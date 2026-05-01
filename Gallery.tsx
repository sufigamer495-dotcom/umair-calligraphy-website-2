import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbox } from '@/components/Lightbox';

gsap.registerPlugin(ScrollTrigger);

const filterTabs = ['All', 'Islamic', 'Modern', 'Custom Names', 'Corporate'];

const galleryImages = [
  { src: '/images/archive-1.jpg', category: 'Islamic', alt: 'Islamic calligraphy on leather' },
  { src: '/images/archive-2.jpg', category: 'Modern', alt: 'Modern 3D calligraphy piece' },
  { src: '/images/archive-3.jpg', category: 'Islamic', alt: 'Islamic calligraphy on leather book' },
  { src: '/images/archive-4.jpg', category: 'Modern', alt: 'Modern framed calligraphy' },
  { src: '/images/selected-1.jpg', category: 'Islamic', alt: 'Thuluth composition' },
  { src: '/images/selected-2.jpg', category: 'Modern', alt: 'Modern minimal circular calligraphy' },
  { src: '/images/selected-4.jpg', category: 'Islamic', alt: 'Abstract flow medallion' },
  { src: '/images/selected-5.jpg', category: 'Islamic', alt: 'Spiritual harmony diagonal script' },
  { src: '/images/selected-3.jpg', category: 'Custom Names', alt: 'Classic Kufic framed' },
  { src: '/images/selected-6.jpg', category: 'Custom Names', alt: 'Golden details minimal' },
  { src: '/images/archive-5.jpg', category: 'Corporate', alt: 'Corporate diagonal calligraphy' },
  { src: '/images/archive-6.jpg', category: 'Custom Names', alt: 'Custom monogram' },
  { src: '/images/archive-7.jpg', category: 'Islamic', alt: 'Vertical Islamic composition' },
  { src: '/images/archive-8.jpg', category: 'Islamic', alt: 'Circular ornate medallion' },
];

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredImages = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

  useEffect(() => {
    if (!gridRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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
  }, [activeFilter]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const goNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const goPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="min-h-screen pt-[120px] pb-20 bg-white">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="font-display text-page-heading text-[#1A1A1A] mb-4">Gallery</h1>
          <p className="text-body font-body font-light text-[#666666]">
            An archive of original works and past commissions.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`nav-link bg-transparent border-none cursor-pointer pb-1 transition-colors duration-200 ${
                activeFilter === tab
                  ? 'text-[#1A1A1A] border-b border-gold'
                  : 'text-[#999999] hover:text-[#666666]'
              }`}
              style={activeFilter === tab ? { borderBottom: '1px solid #B8956A' } : {}}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredImages.map((img, i) => (
            <div
              key={`${activeFilter}-${i}`}
              className="aspect-[3/4] overflow-hidden bg-[#FAFAFA] cursor-pointer group"
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={filteredImages.map((img) => ({ src: img.src, alt: img.alt }))}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </div>
  );
}
