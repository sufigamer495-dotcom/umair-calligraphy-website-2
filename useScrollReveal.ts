import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const {
      y = 24,
      x = 0,
      duration = 0.6,
      stagger = 0,
      start = 'top 85%',
      once = true,
    } = options;

    const children = el.children.length > 1 && stagger > 0
      ? Array.from(el.children)
      : [el];

    gsap.set(children, { opacity: 0, y, x });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          stagger,
          ease: 'power2.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return ref;
}
