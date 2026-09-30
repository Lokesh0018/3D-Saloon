import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);



const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(textRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        }
      }
    );

    // Image scale animation
    gsap.fromTo(imageRef.current,
      { scale: 1.1 },
      {
        scale: 1, duration: 1.5, ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        }
      }
    );

    // Paint swipe overlay animation
    gsap.fromTo(overlayRef.current,
      { scaleY: 1, transformOrigin: 'top' },
      {
        scaleY: 0,
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section id="about" className="section about" ref={sectionRef}>
      <div className="container about-grid">
        <div className="about-image-wrapper">
          <svg className="gold-brush-svg" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="brushTexture" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.05 0.015" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c5a059" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#e8c77b" stopOpacity="1" />
                <stop offset="100%" stopColor="#96773a" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="goldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e8c77b" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#c5a059" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            
            <g filter="url(#brushTexture)">
              <path className="brush-stroke stroke-1" d="M 0,250 L 350,50 L 100,400 L 450,200 L 200,550 L 550,350" fill="none" stroke="url(#goldGrad)" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>

          <div className="paint-overlay" ref={overlayRef}></div>
          <div className="about-image" ref={imageRef} style={{
            background: `url('/barber.png') top center/cover no-repeat`,
            transform: `scale(1.1) translateY(6%)`,
            transformOrigin: 'bottom center'
          }}>
          </div>

        </div>
        <div className="about-content" ref={textRef}>
          <h4 className="subtitle text-gold">Mastering the Craft</h4>
          <h2>The Foundation of Confidence</h2>
          <p>
            At The Gentleman's Cut, we believe that a great haircut is more than just a routine—it's the foundation of a man's confidence. Our master barbers combine time-honored techniques with modern styles.
          </p>
          <p>
            Step into a sanctuary of masculinity and luxury. From hot towel shaves to precision fading, every detail is executed with absolute perfection to ensure you leave looking and feeling your absolute best.
          </p>
          <button className="btn-primary" style={{ marginTop: '2rem' }}>Discover Our Heritage</button>
        </div>
      </div>
    </section>
  );
};

export default About;
