import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (triggerRef, targetRef, options = {}) => {
  useEffect(() => {
    if (!triggerRef.current || !targetRef.current) return;

    const el = triggerRef.current;
    
    // Target can be an array of refs, a single ref with children, or just the element itself
    let targets = targetRef.current;
    if (Array.isArray(targets)) {
      targets = targets.filter(Boolean);
    } else if (targets.children && targets.children.length > 0) {
      targets = targets.children;
    }

    if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

    const animation = gsap.fromTo(targets,
      { y: options.y || 50, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: options.duration || 0.8, 
        stagger: options.stagger !== undefined ? options.stagger : 0.2, 
        ease: options.ease || 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top 75%',
          toggleActions: options.toggleActions || 'play reverse play reverse'
        }
      }
    );

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, []);
};
