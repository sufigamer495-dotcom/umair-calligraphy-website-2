import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCountUp(
  target: number,
  duration: number = 1.5
) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      setDisplay(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obj = { value: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          value: target,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplay(Math.round(obj.value));
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [target, duration]);

  return { ref, display };
}
