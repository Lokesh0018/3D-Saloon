import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.to(bgRef.current, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, []);

  return (
    <section className="experience" ref={sectionRef}>
      <div className="experience-bg" ref={bgRef} style={{
        background: `url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover no-repeat`
      }}></div>
      <div className="experience-overlay"></div>
      
      <div className="experience-content container">
        <h4 className="subtitle text-gold">The Atmosphere</h4>
        <h2>A Gentleman's Retreat</h2>
        <p>Step into an environment designed for ultimate relaxation, sharp styling, and traditional grooming.</p>
        <button className="btn-primary filled" style={{ marginTop: '2rem' }}>Book Your Visit</button>
      </div>
    </section>
  );
};

export default Experience;
