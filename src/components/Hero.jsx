import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 145;

const parallaxImages = [
  { src: '/scissors-removebg-preview.png', className: 'hero-parallax-img hp-1' },
  { src: '/comb-removebg-preview.png', className: 'hero-parallax-img hp-2' },
  { src: '/brush-removebg-preview.png', className: 'hero-parallax-img hp-3' },
  { src: '/spray-removebg-preview.png', className: 'hero-parallax-img hp-4' },
  { src: '/tri-removebg-preview.png', className: 'hero-parallax-img hp-5' },
];

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const parallaxRefs = useRef([]);
  const [loaded, setLoaded] = useState(false);

  // Animation state
  const frameRef = useRef({
    current: 72,
    target: 72,
  });
  
  const reqRef = useRef(null);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    // Prioritize center frame (72) for initial load, then the rest
    const loadOrder = [72];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (i !== 72) loadOrder.push(i);
    }

    loadOrder.forEach((i) => {
      const img = new Image();
      const paddedIndex = i.toString().padStart(6, '0');
      img.src = `/hero frames/frame_${paddedIndex}.webp`;
      img.onload = () => {
        images[i] = img;
        loadedCount++;
        if (loadedCount === 1) { // When first (center) image loads
          setLoaded(true);
        }
      };
    });

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // Canvas render loop
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { current, target } = frameRef.current;

    // Easing for smooth frame transition
    frameRef.current.current += (target - current) * 0.15;
    
    const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameRef.current.current)));
    const img = imagesRef.current[frameIndex];

    if (img && img.complete) {
      // Set canvas size to image size to prevent stretching logic in JS
      if (canvas.width !== img.width || canvas.height !== img.height) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    reqRef.current = requestAnimationFrame(renderFrame);
  }, []);

  useEffect(() => {
    if (loaded) {
      reqRef.current = requestAnimationFrame(renderFrame);
    }
    return () => cancelAnimationFrame(reqRef.current);
  }, [loaded, renderFrame]);

  // GSAP Intro
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Background and initial reveal
    tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' })
      .fromTo(visualRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }, "-=0.5")
      .fromTo(textRef.current.children, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }, "-=1"
      )
      .fromTo(parallaxRefs.current, 
        { y: 100, opacity: 0, scale: 0.8 }, 
        { y: 0, opacity: 0.8, scale: 1, duration: 1.5, stagger: 0.1, ease: 'power3.out' }, 
        "-=1.5"
      );

    // Scroll parallax for background images
    parallaxRefs.current.forEach((el, index) => {
      if (!el) return;
      const speed = (index % 2 === 0 ? 1 : -0.5) * (index + 1) * 40;
      gsap.to(el, {
        y: speed,
        rotation: speed / 3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    });
  }, []);

  // Mouse tracking
  const handleMouseMove = (e) => {
    if (!heroRef.current || !visualRef.current) return;
    
    // Ignore on touch devices
    if (window.innerWidth <= 992) return;

    const rect = heroRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    
    // Map to frame index (0 to 144)
    frameRef.current.target = x * (TOTAL_FRAMES - 1);

    // Subtle Parallax
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = ((e.clientX - rect.left) - centerX) / centerX;
    const moveY = ((e.clientY - rect.top) - centerY) / centerY;

    gsap.to(visualRef.current, {
      x: moveX * -15,
      y: moveY * -8,
      duration: 1,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    // Return to center
    frameRef.current.target = 72;
    if (visualRef.current) {
      gsap.to(visualRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }
  };

  return (
    <section 
      className="hero" 
      ref={heroRef} 
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-parallax-bg">
        {parallaxImages.map((img, index) => (
          <img 
            key={index}
            src={img.src} 
            alt="Parallax element" 
            className={img.className}
            ref={el => parallaxRefs.current[index] = el}
          />
        ))}
      </div>

      <div className="hero-inner container">
        <div className="hero-content" ref={textRef}>
          <h2 className="text-gold subtitle">Precision, style, and confidence in every detail.</h2>
          <h1 className="hero-title">THE ART<br/>OF<br/>GROOMING</h1>
          <p className="hero-desc">
            Experience the ultimate in men's grooming. Where traditional barbering meets modern luxury and precision.
          </p>
          <div className="hero-actions">
            <button className="btn-primary filled">Book Appointment</button>
            <a href="#services" className="link-explore">Explore Services</a>
          </div>
        </div>

        <div className="hero-visual" ref={visualRef}>
          <div className="spotlight"></div>
          <div className="sequence-container">
            <canvas 
              ref={canvasRef} 
              className={`sequence-canvas ${loaded ? 'visible' : ''}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
