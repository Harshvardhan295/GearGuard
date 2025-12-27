// src/hooks/use-in-view.ts
import { useState, useEffect, useRef, RefObject } from 'react';

export function useInView(options = {}): [RefObject<HTMLDivElement>, boolean] {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Once it's seen, we can keep it visible or toggle
      if (entry.isIntersecting) {
        setIntersecting(true);
        // Optional: stop observing once revealed for performance
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isIntersecting];
}